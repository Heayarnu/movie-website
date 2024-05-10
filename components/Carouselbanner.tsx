'use client';

import { Movie } from '@/types';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { getImagePath } from '@/utils';
import Image from 'next/image';

Autoplay.globalOptions = { delay: 8000 };

const Carouselbanner = ({ movies }: { movies: Movie[] }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 100 }, [
    Autoplay(),
  ]);

  return (
    <div
      className="overflow-hidden mt-5 relative cursor-pointer md:h-2/4"
      ref={emblaRef}
    >
      <div className="flex relative">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-[0_0_100%] min-w-0 relative lg:-mt-40"
          >
            <Image
              src={getImagePath(movie.backdrop_path, true)}
              alt=""
              width={1920}
              height={1080}
            />

            {/* <div className="hidden md:inline mt-0 top-0 z-20 absolute pt-52 left-0 lg:mt-40 bg-transparent p-10 text-white h-full  object-cover w-full bg-gradient-to-r from-gray-900/70 via-transparent to-transparent">
              <h2 className="text-5xl font-bold max-w-xl z-50">
                {movie.title}
              </h2>

              <p className="max-w-xl line-clamp-3">{movie.overview}</p>
            </div> */}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 dark:bg-gradient-to-b from-gray-200/0 via-gray-900/25 to-gray-300 dark:to-black/35" />
    </div>
  );
};

export default Carouselbanner;
