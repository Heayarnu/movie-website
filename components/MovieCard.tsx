import { cn } from '@/lib/utils';
import { MovieCardProps } from '@/types/index';
import { getImagePath } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';

const MovieCard = ({ movie, isVertical }: MovieCardProps) => {
  return (
    <Link href={`/movie/${movie.id}?gmovie=${movie.title}`}>
      <div className="w-full">
        <div
          className={`transform cursor-pointer  transition duration-200 ease-out hover:scale-105 ${isVertical ? 'grid' : 'flex flex-col items-center justify-center '}`}
        >
          <div
            className={cn(
              'mx-1 md:mx-2',
              !isVertical
                ? 'w-[7.5rem] sm:w-32 md:w-44 lg:w-52 xl:w-96'
                : 'w-auto',
            )}
          >
            <Image
              src={getImagePath(movie.backdrop_path || movie.poster_path)}
              alt={movie.title}
              key={movie.id}
              width={1920}
              height={1080}
              className="h-44 rounded-sm border border-neutral-400 object-cover object-center dark:border-neutral-800 md:h-64 lg:h-80 xl:h-64 "
            />
            <p
              className={cn(
                !isVertical
                  ? 'mt-2 flex items-center justify-center overflow-auto text-center'
                  : 'mb-5 mt-1 w-full text-center sm:mt-2 ',
              )}
            >
              {movie.title}
            </p>{' '}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
