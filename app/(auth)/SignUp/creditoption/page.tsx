'use client';

import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  return (
    <div className="bg-white">
      <div className="flex h-auto flex-col items-center justify-center ">
        <div className="relative my-4 w-[95vw] items-start justify-center px-4 py-4 text-left sm:w-[80vw] md:px-1 lg:w-[60vw] xl:w-[90vw] xl:px-10">
          <p className="text-sm">
            STEP <span className="font-bold">2</span> OF{' '}
            <span className="font-bold">3</span>
          </p>
          <h1 className="text-2xl font-medium text-zinc-800 sm:text-4xl">
            Choose the plan that&apos;s right for you
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Page;
