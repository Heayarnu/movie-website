// api/webhook.ts
import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

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

    const { videoQuality, price, planName } = session.metadata;

    await db.userSubscription.create({
      data: {
        userId: session.metadata.userId,
        status: subscription.status,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
        videoQuality,
        planPrice: price,
        planName,
        cancelAtCurrentPeriodEnd: subscription.cancel_at_period_end,
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

    await db.userSubscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
        status: subscription.status,
        cancelAtCurrentPeriodEnd: subscription.cancel_at_period_end,
      },
    });
  } catch (error: any) {
    console.error('Error in handleInvoicePaymentSucceeded:', error);
    throw error;
  }
};

const handleSubscriptionUpdated = async (subscription: Stripe.Subscription) => {
  try {
    const { action, planPrice, planName, videoQuality } = subscription.metadata;

    // Update the database based on the action
    switch (action) {
      case 'upgrade':
        await db.userSubscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            planName: planName,
            planPrice: planPrice,
            videoQuality: videoQuality,
            stripePriceId: subscription.items.data[0].price.id,
            status: subscription.status,
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000,
            ),
            cancelAtCurrentPeriodEnd: subscription.cancel_at_period_end,
          },
        });
        break;

      case 'cancel':
      case 'resume':
        await db.userSubscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: subscription.status,
            cancelAtCurrentPeriodEnd: subscription.cancel_at_period_end,
          },
        });
        break;

      default:
        console.warn(`Unrecognized action: ${action}`);
        return NextResponse.json(
          { error: 'Unrecognized action' },
          { status: 400 },
        );
    }

    return NextResponse.json(
      { message: 'Subscription updated successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error in handleSubscriptionUpdated:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
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
      case 'customer.subscription.updated':
        handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
    }

    return new NextResponse(null, { status: 200 });
  } catch (error: any) {
    console.error('Webhook Error:', error.message);
    return new NextResponse(error.message, { status: 400 });
  }
}
