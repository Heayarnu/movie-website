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
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      },
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
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      },
    });
  } catch (error: any) {
    console.error('Error in handleInvoicePaymentSucceeded:', error);
    throw error;
  }
};

const handleSubscriptionDeleted = async (subscription: Stripe.Subscription) => {
  try {
    // Delete the subscription from the database
    await db.userSubscription.delete({
      where: {
        stripeSubscriptionId: subscription.id,
      },
    });
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
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription,
        );
        break;
    }

    return new NextResponse(null, { status: 200 });
  } catch (error: any) {
    console.error('Webhook Error:', error.message);
    return new NextResponse(error.message, { status: 400 });
  }
}
