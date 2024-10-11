import { currentUser } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const {
      action,
      planPrice,
      stripeSubscriptionId,
      planName,
      videoQuality,
      price_id,
    } = await req.json();
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const subscription =
      await stripe.subscriptions.retrieve(stripeSubscriptionId);
    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 },
      );
    }

    switch (action) {
      case 'upgrade':
        const updatedSubscription = await stripe.subscriptions.update(
          stripeSubscriptionId,
          {
            items: [{ id: subscription.items.data[0].id, price: price_id }],

            metadata: {
              action,
              planPrice,
              planName,
              videoQuality,
            },
            proration_behavior: 'always_invoice',
            cancel_at_period_end: false,
          },
        );
        return NextResponse.json(updatedSubscription, { status: 200 });

      case 'cancel':
        await stripe.subscriptions.update(stripeSubscriptionId, {
          cancel_at_period_end: true,
          metadata: {
            action,
          },
        });
        return NextResponse.json(
          {
            message:
              'Subscription will be canceled at the end of the current period',
          },
          { status: 200 },
        );

      case 'resume':
        await stripe.subscriptions.update(stripeSubscriptionId, {
          cancel_at_period_end: false,
          metadata: {
            action,
          },
        });
        return NextResponse.json(
          { message: 'Subscription has been resumed' },
          { status: 200 },
        );

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('[STRIPE_ERROR]', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
