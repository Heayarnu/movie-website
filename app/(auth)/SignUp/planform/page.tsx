'use client';

import SignUpNav from '@/app/_components/SignUpNav';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const plansData = [
    {
      value: 'Premium',
      title: 'Premium',
      subtitle: '4k + HDR',
      details: [
        { title: 'Monthly prices', content: '5,000' },
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
      details: [
        { title: 'Monthly prices', content: '4,000' },
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
      details: [
        { title: 'Monthly prices', content: '2,900' },
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
      details: [
        { title: 'Monthly prices', content: '1,600' },
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
  ];

  const [clickedCard, setClickedCard] = useState('');

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center h-auto ">
        <div className="my-4 px-4 md:px-1 text-left relative xl:px-10 py-4 justify-center items-start w-[95vw] sm:w-[80vw] lg:w-[60vw] xl:w-[90vw]">
          <p className="text-sm">
            STEP <span className="font-bold">2</span> OF{' '}
            <span className="font-bold">3</span>
          </p>
          <h1 className="text-2xl sm:text-4xl font-medium text-zinc-800">
            Choose the plan that&apos;s right for you
          </h1>
        </div>

        <Tabs
          defaultValue="Premium"
          className="flex flex-col justify-center items-start w-[95vw] sm:w-[80vw] lg:w-[60vw] xl:hidden"
        >
          <TabsList className="h-auto grid w-full grid-cols-4 gap-2 md:gap-4 bg-white">
            {plansData.map((plan) => (
              <TabsTrigger
                key={plan.value}
                onClick={() => setClickedCard(plan.value)}
                value={plan.value}
                className="text-black border rounded-xl h-32 max-w-36 border-stone-300 flex items-start justify-start px-1 py-3 md:p-4 data-[state=active]:bg-gradient-to-br from-blue-900 via-30% via-indigo-700 to-red-800 data-[state=active]:text-white"
              >
                <p className="font-medium text-sm md:text-base text-left relative w-full h-full">
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

          {plansData.map((plan) => (
            <TabsContent key={plan.value} value={plan.value}>
              <Card className="w-[95vw] sm:w-[80vw] lg:w-[60vw] sm border-none rounded-none mt-5 h-full">
                <CardContent className="gap-2 px-1 sm:p-0">
                  {plan.details.map((detail, index) => (
                    <div
                      key={index}
                      className={`flex justify-between text-stone-600 ${
                        index !== plan.details.length - 1 &&
                        'border-b border-stone-400'
                      } py-3`}
                    >
                      <p className="max-w-[45%] h-auto">{detail.title}</p>
                      <p className="font-bold max-w-[45%] text-end">
                        {detail.content}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="hidden xl:flex flex-row flex-grow justify-center items-center max-w-[90vw] mb-10">
          {plansData.map((plan) => (
            <Card
              key={plan.value}
              className={`mx-2 h-auto mt-4 p-2 flex flex-col justify-center items-center rounded-2xl ${
                clickedCard === plan.value ? 'shadow-xl shadow-primary' : ''
              }`}
              onClick={() => setClickedCard(plan.value)}
            >
              <CardHeader className="border rounded-xl h-24 w-full border-stone-300 flex relative px-4 py-2  bg-gradient-to-br from-blue-900 via-30% via-indigo-700 to-red-800 text-white">
                <CardTitle className="flex relative items-start justify-start h-full">
                  <p className="font-medium text-2xl text-left relative w-full h-full">
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

              <CardContent className="gap-2 p-4 h-[600px]">
                {plan.details.map((detail, index) => (
                  <div
                    key={index}
                    className={`flex flex-col text-stone-600 ${
                      index !== plan.details.length - 1 &&
                      'border-b border-stone-400'
                    } py-3`}
                  >
                    <p className="text-left">{detail.title}</p>
                    <p className="font-bold text-left">{detail.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="px-4 md:px-1 text-left relative xl:px-10 my-5 w-[95vw] sm:w-[80vw] lg:w-[60vw] xl:w-[90vw]">
          <p>
            HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability
            subject to your internet service and device capabilities. Not all
            content is available in all resolutions. See our Terms of Use for
            more details. Only people who live with you may use your account.
            Watch on 4 different devices at the same time with Premium, 2 with
            Standard, and 1 with Basic and Mobile.
          </p>

          <div className="flex items-center justify-center my-5">
            <Button
              onClick={() => {
                router.push('/SignUp/creditoption');
              }}
              className="bg-[#CC0000] hover:bg-[#990000] text-white h-14 rounded-none w-full md:w-[80%] xl:w-[40%] mt-2 text-lg font-bold"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
