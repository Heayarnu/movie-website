import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const getStripeEvent = async (req: Request) => {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  try {
    return stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: any) {
    throw new Error(`Webhook Error: ${error.message}`);
  }
};

const handleCheckoutSessionCompleted = async (
  session: Stripe.Checkout.Session,
) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    if (!session?.metadata?.userId) {
      throw new Error('User ID is required');
    }

    // Store subscription data in the database
    await db.userSubscription.create({
      data: {
        userId: session.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    });

    // Mark user as active after subscription is created
    await db.user.update({
      where: { id: session.metadata.userId },
      data: { isActive: true },
    });
  } catch (error: any) {
    console.error('Error in handleCheckoutSessionCompleted:', error);
    throw error;
  }
};

const handleInvoicePaymentSucceeded = async (
  session: Stripe.Checkout.Session,
) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    // Update the subscription in the database
    await db.userSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    });

    // Reactivate the user if payment succeeds
    const user = await db.user.findFirst({
      where: {
        subscription: { stripeSubscriptionId: subscription.id },
      },
    });

    if (user) {
      await db.user.update({
        where: { id: user.id },
        data: { isActive: true },
      });
    }
  } catch (error: any) {
    console.error('Error in handleInvoicePaymentSucceeded:', error);
    throw error;
  }
};

const handleSubscriptionDeleted = async (subscription: Stripe.Subscription) => {
  try {
    // Find the user based on the subscription ID
    const user = await db.user.findFirst({
      where: {
        subscription: { stripeSubscriptionId: subscription.id },
      },
    });

    if (user) {
      // Mark the user as inactive if the subscription is deleted
      await db.user.update({
        where: { id: user.id },
        data: { isActive: false },
      });
    }
  } catch (error: any) {
    console.error('Error in handleSubscriptionDeleted:', error);
    throw error;
  }
};

export async function POST(req: Request) {
  try {
    const event = await getStripeEvent(req);
    const session = event.data.object as Stripe.Checkout.Session;

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(session);
        break;
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(session);
        break;
      case 'customer.subscription.deleted':
      case 'customer.subscription.updated': // Optional: Handle updates
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new NextResponse(null, { status: 200 });
  } catch (error: any) {
    console.error('Webhook Error:', error.message);
    return new NextResponse(error.message, { status: 400 });
  }
}
