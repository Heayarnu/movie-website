'use client';

import { Movie } from '@/types';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { getImagePath } from '@/utils';
import Image from 'next/image';
import { Button } from './ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Favorites from './FavoritesButton';
import { InfoIcon } from 'lucide-react';

Autoplay.globalOptions = { delay: 8000 };

const Carouselbanner = ({ movies }: { movies: Movie[] }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 100 }, [
    Autoplay(),
  ]);

  return (
    <div className="overflow-hidden relative" ref={emblaRef}>
      <div className="flex">
        {movies.map((movie) => (
          <div key={movie.id} className="flex-[0_0_100%] min-w-0 relative">
            <Image
              src={getImagePath(movie.backdrop_path, true)}
              alt=""
              width={1920}
              height={1080}
              className="w-screen h-[60vh] md:h-[70vh] xl:h-screen"
            />

            <div className="absolute z-30 top-0 left-0 bg-transparent bg-gradient-to-r from-black/90 via-black/25 to-transparent text-white h-full w-full ">
              <div className="absolute bottom-10 p-4 md:p-10 space-y-3 md:space-y-5">
                <h2 className="text-xl md:text-3xl font-bold max-w-[70vw]">
                  {movie.title}
                </h2>

                <div>
                  <p className="max-w-[50vw] line-clamp-3 md:text-lg text-sm">
                    {movie.overview}
                  </p>
                </div>

                <div className="flex flex-row justify-start gap-2">
                  <Button className="bg-white hover:bg-gray-200 px-7 text-lg md:text-xl text-black hover:scale-110">
                    <FontAwesomeIcon icon={faPlay} className="mr-1" /> Play
                  </Button>

                  <Button className="bg-stone-500 text-white hover:scale-110 hover:bg-stone-600 pl-2 text-lg md:text-xl cursor-pointer">
                    <InfoIcon className="mr-1" /> More info
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carouselbanner;
