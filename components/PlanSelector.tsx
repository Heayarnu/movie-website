// PlanSelector.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserSubscription } from '@prisma/client';
import axios from 'axios';
import { CheckCircle2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface PlanSelectorProps {
  activePlan?: UserSubscription;
  setIsChangingPlan?: (value: boolean) => void;
}

const PlanSelector = ({ activePlan, setIsChangingPlan }: PlanSelectorProps) => {
  const plansData = useMemo(
    () => [
      {
        value: 'Premium',
        title: 'Premium',
        subtitle: '4k + HDR',
        price_id: 'price_1Q6j8wRut6IgrdnFAQBvwgIg',
        details: [
          { title: 'Monthly prices', content: 22.99 },
          { title: 'Video and sound quality', content: 'Best' },
          { title: 'Resolution', content: '4k (Ultra HD) + HDR' },
          { title: 'Spatial audio (immersive sound)', content: 'Included' },
          {
            title: 'Supported devices',
            content: 'TV, computer, mobile phone, tablet',
          },
          {
            title: 'Devices your household can watch at the same time',
            content: '4',
          },
          { title: 'Download devices', content: '6' },
        ],
      },
      {
        value: 'Standard',
        title: 'Standard',
        subtitle: '1080p',
        price_id: 'price_1Q6jDKRut6IgrdnFUggeSUMT',
        details: [
          { title: 'Monthly prices', content: 15.49 },
          { title: 'Video and sound quality', content: 'Great' },
          { title: 'Resolution', content: '1080p (Full HD)' },
          { title: 'Spatial audio (immersive sound)', content: 'Not Included' },
          {
            title: 'Supported devices',
            content: 'TV, computer, mobile phone, tablet',
          },
          {
            title: 'Devices your household can watch at the same time',
            content: '2',
          },
          { title: 'Download devices', content: '2' },
        ],
      },
      {
        value: 'Basic',
        title: 'Basic',
        subtitle: '720p',
        price_id: 'price_1Q6jEhRut6IgrdnFGQck4Kh9',
        details: [
          { title: 'Monthly prices', content: 10.99 },
          { title: 'Video and sound quality', content: 'Good' },
          { title: 'Resolution', content: '720p (HD)' },
          { title: 'Spatial audio (immersive sound)', content: 'Not Included' },
          {
            title: 'Supported devices',
            content: 'TV, computer, mobile phone, tablet',
          },
          {
            title: 'Devices your household can watch at the same time',
            content: '1',
          },
          { title: 'Download devices', content: '1' },
        ],
      },
      {
        value: 'Mobile',
        title: 'Mobile',
        subtitle: '480p',
        price_id: 'price_1Q6jG2Rut6IgrdnFvobCipLr',
        details: [
          { title: 'Monthly prices', content: 6.99 },
          { title: 'Video and sound quality', content: 'Fair' },
          { title: 'Resolution', content: '480p' },
          { title: 'Spatial audio (immersive sound)', content: 'Not Included' },
          { title: 'Supported devices', content: 'Mobile phone, tablet' },
          {
            title: 'Devices your household can watch at the same time',
            content: '1',
          },
          { title: 'Download devices', content: '1' },
        ],
      },
    ],
    [],
  );

  const filteredPlansData = useMemo(() => {
    if (activePlan) {
      return plansData.filter((plan) => plan.value !== activePlan.planName);
    }
    return plansData;
  }, [activePlan, plansData]);

  const [clickedCard, setClickedCard] = useState('');
  const [selectedPlan, setSelectedPlan] = useState({
    value: '',
    monthlyPrice: 0,
    videoQuality: '',
    price_id: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (filteredPlansData.length > 0) {
      const firstPlan = filteredPlansData[0];
      setClickedCard(firstPlan.value);

      const monthlyPriceDetail = firstPlan.details.find(
        (detail) => detail.title === 'Monthly prices',
      );

      if (monthlyPriceDetail) {
        setSelectedPlan({
          value: firstPlan.value,
          monthlyPrice: Number(monthlyPriceDetail.content),
          videoQuality: firstPlan.subtitle,
          price_id: firstPlan.price_id,
        });
      }
    }
  }, [filteredPlansData]);

  useEffect(() => {
    const selectedPlanData = filteredPlansData.find(
      (plan) => plan.value === clickedCard,
    );
    if (!selectedPlanData) return;

    const monthlyPriceDetail = selectedPlanData.details.find(
      (detail) => detail.title === 'Monthly prices',
    );
    if (!monthlyPriceDetail) return;

    setSelectedPlan({
      value: selectedPlanData.value,
      monthlyPrice: Number(monthlyPriceDetail.content),
      videoQuality: selectedPlanData.subtitle,
      price_id: selectedPlan.price_id,
    });
  }, [clickedCard, filteredPlansData, selectedPlan]);

  const onSubscribe = async () => {
    setLoading(true);
    try {
      const requestData = {
        planName: selectedPlan.value,
        price: selectedPlan.monthlyPrice,
        videoQuality: selectedPlan.videoQuality,
        price_id: selectedPlan.price_id,
      };

      const stripeResponse = await axios.post('/api/stripe', requestData);

      // Redirect to the Stripe Checkout URL
      window.location.href = stripeResponse.data.url;
    } catch (error) {
      console.error('STRIPE_CLIENT_ERROR', error);
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  const onUpgrade = async () => {
    setLoading(true);
    try {
      const requestData = {
        planName: selectedPlan.value,
        planPrice: selectedPlan.monthlyPrice,
        videoQuality: selectedPlan.videoQuality,
        price_id: selectedPlan.price_id,
        action: 'upgrade',
        stripeSubscriptionId: activePlan?.stripeSubscriptionId,
      };

      await axios.post('/api/subscription', requestData);
      router.refresh();
    } catch (error) {
      console.error('STRIPE_CLIENT_ERROR', error);
    } finally {
      setLoading(false);
    }
  };

  const pathname = usePathname();
  const accountPath = pathname === '/MyAccount';

  return (
    <div>
      <div className="flex h-auto flex-col items-center justify-center ">
        {!accountPath && (
          <div className="relative my-4 w-[95vw] items-start justify-center px-4 py-4 text-left sm:w-[80vw] md:px-1 lg:w-[60vw] xl:w-[90vw] xl:px-10">
            <p className="text-sm">
              STEP <span className="font-bold">2</span> OF{' '}
              <span className="font-bold">3</span>
            </p>
            <h1 className="text-2xl font-medium text-zinc-800 sm:text-4xl">
              Choose the plan that&apos;s right for you
            </h1>
          </div>
        )}

        <Tabs
          defaultValue="Premium"
          className="flex w-[95vw] flex-col items-start justify-center sm:w-[80vw] lg:w-[60vw] xl:hidden"
        >
          <TabsList className="grid h-auto w-full grid-cols-4 gap-2 bg-inherit text-white md:gap-4">
            {filteredPlansData.map((plan) => (
              <TabsTrigger
                key={plan.value}
                onClick={() => setClickedCard(plan.value)}
                value={plan.value}
                className="flex h-32 max-w-36 items-start justify-start rounded-xl border border-stone-300 from-blue-900 via-indigo-700 via-30% to-red-800 px-1 py-3  text-black data-[state=active]:bg-gradient-to-br data-[state=active]:text-white dark:text-white md:p-4 "
              >
                <p className="relative h-full w-full text-left text-sm font-medium md:text-base ">
                  {plan.title} <br />
                  <span className="text-[12px] font-medium">
                    {plan.subtitle}
                  </span>
                  <CheckCircle2
                    className={`absolute bottom-0 right-0 ${
                      clickedCard === plan.value ? 'block' : 'hidden'
                    }`}
                  />
                </p>
              </TabsTrigger>
            ))}
          </TabsList>

          {filteredPlansData.map((plan) => (
            <TabsContent key={plan.value} value={plan.value}>
              <Card className="sm mt-5 h-full w-[95vw] rounded-none border-none sm:w-[80vw] lg:w-[60vw]">
                <CardContent className="gap-2 px-1 sm:p-0">
                  {plan.details.map((detail, index) => (
                    <div
                      key={index}
                      className={`flex justify-between text-stone-600 dark:text-white ${
                        index !== plan.details.length - 1 &&
                        'border-b border-stone-400'
                      } py-3`}
                    >
                      <p className="h-auto max-w-[45%]">{detail.title}</p>
                      <p className="max-w-[45%] text-end font-bold">
                        {detail.title === 'Monthly prices'
                          ? `$${detail.content}`
                          : detail.content}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mb-10 hidden max-w-[90vw] flex-grow flex-row items-center justify-center xl:flex">
          {filteredPlansData.map((plan) => (
            <Card
              key={plan.value}
              className={`mx-2 mt-4 flex h-auto flex-col items-center justify-center rounded-2xl bg-white p-2 ${
                clickedCard === plan.value ? 'shadow-lg shadow-primary' : ''
              }`}
              onClick={() => setClickedCard(plan.value)}
            >
              <CardHeader className="relative flex h-24 w-full rounded-xl border border-stone-300 bg-gradient-to-br from-blue-900  via-indigo-700 via-30% to-red-800 px-4 py-2 text-white">
                <CardTitle className="relative flex h-full items-start justify-start">
                  <p className="relative h-full w-full text-left text-2xl font-medium">
                    {plan.title} <br />
                    <span className="text-base font-medium">
                      {plan.subtitle}
                    </span>
                    <CheckCircle2
                      className={`absolute bottom-0 right-0 ${
                        clickedCard === plan.value ? 'block' : 'hidden'
                      }`}
                    />
                  </p>
                </CardTitle>
              </CardHeader>

              <CardContent className="h-[600px}] gap-2 p-4">
                {plan.details.map((detail, index) => (
                  <div
                    key={index}
                    className={`flex flex-col text-stone-600 ${
                      index !== plan.details.length - 1 &&
                      'border-b border-stone-400'
                    } py-3`}
                  >
                    <p className="text-left">{detail.title}</p>
                    <p className="text-left font-bold">
                      {detail.title === 'Monthly prices'
                        ? `$${detail.content}`
                        : detail.content}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="relative my-5 w-[95vw] px-4 text-left sm:w-[80vw] md:px-1 lg:w-[60vw] xl:w-[90vw] xl:px-10">
          {!accountPath && (
            <p>
              HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability
              subject to your internet service and device capabilities. Not all
              content is available in all resolutions. See our Terms of Use for
              more details. Only people who live with you may use your account.
              Watch on 4 different devices at the same time with Premium, 2 with
              Standard, and 1 with Basic and Mobile.
            </p>
          )}

          <div className="mb-2 flex items-center justify-center">
            <Button
              onClick={() => {
                setIsChangingPlan && setIsChangingPlan(false);
                activePlan ? onUpgrade() : onSubscribe();
              }}
              disabled={loading}
              className="mt-2 h-14 w-full rounded-none bg-[#CC0000] text-lg font-bold text-white hover:bg-[#990000] md:w-[80%] xl:w-[40%]"
            >
              {accountPath ? 'Change Plan' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSelector;
