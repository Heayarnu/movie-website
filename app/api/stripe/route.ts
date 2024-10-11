import { email } from '@/auth';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';
import { NextResponse } from 'next/server';

const settingsUrl = absoluteUrl('/profiles');

const failureUrl = absoluteUrl('/SignUp/planform');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Create a new subscription
export async function POST(req: Request) {
  try {
    const { planName, price, videoQuality, price_id } = await req.json();
    const user = await currentUser();
    const userId = user?.id;

    if (!userId || !user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userSubscription = await db.userSubscription.findUnique({
      where: { userId },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });
      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: failureUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: email,
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      metadata: { userId, videoQuality, planName, price },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log('[STRIPE_ERROR]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
