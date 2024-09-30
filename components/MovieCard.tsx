import { cn } from '@/lib/utils';
import { MovieCardProps } from '@/types/index';
import { getImagePath } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';

const MovieCard = ({ movie, isVertical }: MovieCardProps) => {
  return (
    <Link href={`/movie/${movie.id}?gmovie=${movie.title}`}>
      <div className="mx-1 flex transform cursor-pointer flex-col transition duration-200 ease-out hover:scale-105">
        <Image
          src={getImagePath(movie.backdrop_path || movie.poster_path)}
          alt={movie.title}
          key={movie.id}
          width={1920}
          height={1080}
          className={cn(
            !isVertical
              ? 'h-24 w-36 rounded-sm object-cover object-center sm:px-1 md:h-48 md:w-[300px] lg:h-56 lg:w-[350px]'
              : 'h-48 w-32 rounded-sm object-cover object-center p-2 md:h-80 md:w-56 lg:h-96 lg:w-72 xl:h-64 xl:w-52 ',
          )}
        />
        <p
          className={cn(
            !isVertical
              ? 'mt-2 flex w-36 items-center justify-center overflow-auto text-center sm:mt-4 md:w-[300px] lg:w-[350px]'
              : 'mt-1 w-32 text-center sm:mt-2 md:w-56 lg:w-72 xl:w-52 ',
          )}
        >
          {movie.title}
        </p>{' '}
      </div>
    </Link>
  );
};

export default MovieCard;
