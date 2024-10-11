'use client';

import Loader from '@/components/Loader';
import PlanSelector from '@/components/PlanSelector';
import { Suspense } from 'react';
const Page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <PlanSelector />
    </Suspense>
  );
};

export default Page;
