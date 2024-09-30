import { HomeScreenRowsProps } from '@/types/index';
import Image from 'next/image';

const HomeScreenRows = ({
  h1,
  h2,
  imageSrc,
  isReversed,
}: HomeScreenRowsProps) => {
  return (
    <div className="flex flex-col items-center justify-between border-t-8 border-stone-800 bg-black md:py-16 lg:flex-row lg:justify-start lg:px-10">
      <div
        className={`flex flex-col items-center justify-center p-5 lg:w-1/2 lg:items-start lg:justify-start xl:ml-14 ${
          isReversed ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <h1 className="mt-5 px-2 text-center text-[32px] font-bold text-white md:mt-0 lg:mt-7 lg:px-0 lg:text-left lg:text-5xl 2xl:text-6xl">
          {h1}
        </h1>
        <h2 className="my-4 px-2 text-center text-lg font-semibold text-white md:p-3 lg:px-0 lg:text-left 2xl:text-2xl">
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
