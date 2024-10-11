// action/subscription.ts
import { stripe } from '@/lib/stripe';

export async function getPaymentMethodDetails(customerId: string) {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    if (paymentMethods.data.length > 0) {
      const { card } = paymentMethods.data[0];
      return {
        brand: card?.brand ?? 'Unknown',
        last4: card?.last4 ?? 'Unknown',
        exp_month: card?.exp_month ?? 0,
        exp_year: card?.exp_year ?? 0,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('[STRIPE_ERROR]', error);
    throw new Error('Unable to retrieve payment method details');
  }
}

export async function manageRenewal(
  action: string,
  stripeSubscriptionId: string,
) {
  try {
    const response = await fetch('/api/subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action,
        stripeSubscriptionId,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('[HANDLE_ACTION_ERROR]', error);
    throw new Error('Unable to handle action');
  }
}
