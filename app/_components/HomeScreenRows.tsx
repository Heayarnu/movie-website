import { HomeScreenRowsProps } from '@/types';
import Image from 'next/image';

import React from 'react';

const HomeScreenRows = ({
  h1,
  h2,
  imageSrc,
  isReversed,
}: HomeScreenRowsProps) => {
  return (
    <div className="bg-black flex flex-col lg:flex-row justify-between lg:justify-start items-center border-t-8 border-stone-800 md:py-16 lg:px-10">
      <div
        className={`flex flex-col justify-center items-center lg:justify-start xl:ml-14 lg:items-start p-5 lg:w-1/2 ${
          isReversed ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <h1 className="lg:mt-7 md:mt-0 mt-5 font-bold text-[32px] text-center px-2 lg:px-0 lg:text-5xl text-white lg:text-left 2xl:text-6xl">
          {h1}
        </h1>
        <h2 className="my-4 text-lg font-semibold md:p-3 text-center px-2 lg:px-0 lg:text-left 2xl:text-2xl text-white">
          {h2}
        </h2>
      </div>

      <Image
        src={imageSrc}
        alt="row image"
        width={500}
        height={200}
        className={`mx-auto md:w-4/5 lg:w-2/5 ${
          isReversed ? 'lg:order-1' : 'lg:order-2'
        }`}
      />
    </div>
  );
};

export default HomeScreenRows;
