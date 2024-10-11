'use client';

import { manageRenewal } from '@/actions/subscription';
import { UserSubscription } from '@prisma/client';
import { ArrowLeftIcon, ChevronRight } from 'lucide-react';
import { SessionProvider } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ChangePasswordEmail from './ChangePasswordEmail';
import PlanSelector from './PlanSelector';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface ManageAccountProps {
  user: any;
  plan: UserSubscription;
  cardDetails: any;
}

const ManageAccount = ({ user, plan, cardDetails }: ManageAccountProps) => {
  const getDisplayQuality = (planName: string) => {
    switch (planName) {
      case 'Premium':
        return (
          <p>
            ULTRA <span className="font-semibold"> HD</span>
          </p>
        );
      case 'Standard':
        return (
          <p>
            FULL <span className="font-semibold"> HD</span>{' '}
          </p>
        );
      case 'Basic':
        return <p className="font-semibold">HD</p>;
      case 'Mobile':
        return <p className="font-semibold">SD</p>;
      default:
        return <p>{planName}</p>;
    }
  };

  const brandLogos = {
    visa: '/visa-logo-800x450.jpg',
    mastercard: '/Mastercard_new_logo-1200x865.webp',
    'american express': '/public/American-Express-logo.png',
    discover: '/Discover-Card-logo-01.png',
    interac: '/1708016070_aaVYk.webp',
    verve: '/verve.jfif',
  };

  const planCancelled = plan.cancelAtCurrentPeriodEnd === true;

  const subscriptionId = plan.stripeSubscriptionId;
  const renewalStatus = plan.cancelAtCurrentPeriodEnd;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isChangingPlan, setIsChangingPlan] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleSubscriptionAction = async (action: 'cancel' | 'resume') => {
    if (subscriptionId) {
      setLoading(true);
      await manageRenewal(action, subscriptionId);
      router.refresh();
      setLoading(false);
    } else {
      console.log('Subscription ID is missing.');
    }
  };

  const handleCancelSubscription = () => handleSubscriptionAction('cancel');
  const handleResumeSubscription = () => handleSubscriptionAction('resume');

  const brandLogoUrl =
    brandLogos[cardDetails?.brand?.toLowerCase() as keyof typeof brandLogos];

  if (isChangingPlan) {
    return (
      <div className="flex flex-col items-center justify-center bg-transparent pt-20 sm:pt-28">
        <div className="flex w-full pl-2 sm:pl-16">
          <Button
            onClick={() => {
              setIsChangingPlan(false);
            }}
            className="my-5  flex h-10 w-10 justify-center rounded-full p-0"
          >
            <ArrowLeftIcon />
          </Button>
        </div>

        <PlanSelector activePlan={plan} setIsChangingPlan={setIsChangingPlan} />
      </div>
    );
  }

  if (isChangingEmail || isChangingPassword) {
    return (
      <SessionProvider>
        <div className="flex items-center justify-center bg-transparent pt-24 sm:pt-36">
          <ChangePasswordEmail
            user={user}
            isChangingEmail={isChangingEmail}
            isChangingPassword={isChangingPassword}
            setIsChangingEmail={setIsChangingEmail}
            setIsChangingPassword={setIsChangingPassword}
          />
        </div>
      </SessionProvider>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center pt-16 sm:pt-20 md:pt-24">
      <p className="my-5 w-full pl-6 text-left text-2xl font-medium sm:mb-7 sm:text-3xl md:pl-12 md:text-4xl xl:mb-10 xl:pl-40">
        Account
      </p>
      <Card className="mb-5 flex w-[95vw] flex-col items-start justify-center border border-neutral-500 dark:border-neutral-300 sm:w-[90vw] xl:w-[75vw]">
        <CardContent className="w-full text-lg">
          <h1 className="pb-3 pt-5 font-semibold text-neutral-600 dark:text-neutral-400">
            MEMBERSHIP & BILLING
          </h1>
          <p className="pb-2 font-bold">{user?.email}</p>
          <p className="border-b border-neutral-400 pb-3 text-neutral-600 dark:text-neutral-400">
            Password: *********
          </p>

          <button
            className="flex w-full items-center justify-between border-b border-neutral-400 py-3 "
            onClick={() => setIsChangingEmail(true)}
          >
            <span>Change account email</span>
            <ChevronRight />
          </button>

          <button
            className="flex w-full items-center justify-between border-b border-neutral-400 py-3"
            onClick={() => setIsChangingPassword(true)}
          >
            <span>Change password</span>
            <ChevronRight />
          </button>

          <div className=" pb-5 pt-3">
            <h1 className="pb-4 font-semibold text-neutral-600 dark:text-neutral-400">
              PLAN DETAILS
            </h1>

            <div className="flex flex-col justify-start sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-row items-center justify-between sm:justify-start">
                <div className="flex flex-row justify-start">
                  <p>{plan.planName} </p>
                  <div className="mx-2 rounded-md border-2 border-black px-1 py-0 dark:border-white">
                    {getDisplayQuality(plan.planName)}
                  </div>
                </div>

                <p>
                  {' '}
                  @ <span className="font-bold italic">${plan.planPrice}</span>
                </p>
              </div>

              <Button
                className="mt-4 w-full text-lg sm:mt-0 sm:w-auto"
                onClick={() => {
                  setIsChangingPlan(true);
                }}
              >
                Change Plan
              </Button>
            </div>
          </div>

          <div className="border-t border-neutral-400 pb-5 pt-3">
            <h1 className="font-medium text-neutral-700 dark:text-neutral-400">
              Billing Details
            </h1>

            <div className="flex flex-col justify-between sm:flex-row">
              <div className="flex flex-col">
                <div className="flex flex-row items-center justify-start py-2 font-medium">
                  <Image
                    src={brandLogoUrl}
                    alt={cardDetails?.brand}
                    width={100}
                    height={100}
                    className="mr-2 h-9 w-16 rounded-md border border-neutral-400 dark:border-neutral-300"
                  />
                  <span className="-mt-0.5 mr-2 text-xl sm:-mt-1 lg:-mt-2 xl:-mt-1">
                    •••• •••• ••••
                  </span>
                  {cardDetails?.last4}
                </div>

                {planCancelled ? (
                  <p>
                    Your plan is set to be cancelled on{' '}
                    {plan.stripeCurrentPeriodEnd?.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                    .
                  </p>
                ) : (
                  <p>
                    Your next billing date is{' '}
                    {plan.stripeCurrentPeriodEnd?.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                    .
                  </p>
                )}
              </div>

              <div>
                {!renewalStatus ? (
                  <Button
                    variant="destructive"
                    className="my-5 w-full text-lg sm:my-0 sm:w-auto"
                    disabled={loading}
                    onClick={handleCancelSubscription}
                  >
                    Cancel Membership
                  </Button>
                ) : (
                  <Button
                    className="my-5 w-full bg-green-600 text-lg hover:bg-green-500 sm:my-0 sm:w-auto"
                    disabled={loading}
                    onClick={handleResumeSubscription}
                  >
                    Resume Membership
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageAccount;
