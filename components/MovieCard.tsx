import { cn } from '@/lib/utils';
import { MovieCardProps } from '@/types';
import { getImagePath } from '@/utils';
import Image from 'next/image';

const MovieCard = ({ movie, isVertical }: MovieCardProps) => {
  return (
    <div className="flex flex-col mx-1 my-2 cursor-pointer transform hover:scale-105 transition duration-200 ease-out">
      <Image
        src={getImagePath(movie.backdrop_path || movie.poster_path)}
        alt={movie.title}
        key={movie.id}
        width={1920}
        height={1080}
        className={cn(
          !isVertical
            ? 'w-36 md:w-[300px] lg:w-[350px] sm:px-1 object-cover object-center rounded-sm h-24 md:h-48 lg:h-56'
            : 'w-32 h-48 p-2 md:w-56 md:h-80 lg:w-72 lg:h-96 xl:w-52 xl:h-64 object-cover object-center rounded-sm ',
        )}
      />
      <p
        className={cn(
          !isVertical
            ? 'flex text-center items-center justify-center mt-2 sm:mt-4 overflow-auto w-36 md:w-[300px] lg:w-[350px]'
            : 'w-32 md:w-56 lg:w-72 xl:w-52 text-center mt-1 sm:mt-2 ',
        )}
      >
        {movie.title}
      </p>{' '}
    </div>
  );
};

export default MovieCard;
