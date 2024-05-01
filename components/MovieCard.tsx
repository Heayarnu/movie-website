import { cn } from '@/lib/utils';
import { MovieCardProps } from '@/types';
import { getImagePath } from '@/utils';
import Image from 'next/image';

const MovieCard = ({ movie, isVertical }: MovieCardProps) => {
  return (
    <div className="relative flex-shrink-0 cursor-pointer transform hover:scale-105 transition duration-200 ease-out">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/10 to-gray-300 dark:to-[#1A1C29] z-10" />

      {!isVertical && (
        <p className="absolute z-20 bottom-4 left-5">{movie.title}</p>
      )}

      <Image
        src={getImagePath(movie.backdrop_path || movie.poster_path)}
        alt={movie.title}
        key={movie.id}
        width={1920}
        height={1080}
        className={cn({
          'w-fit lg:min-w-[400px] h-56 object-cover object-center shadow-md shadow-gray-900 drop-shadow-xl rounded-sm':
            isVertical,
          'w-[200px] md:w-[300px] lg:min-w-[400px] h-36 md:h-48 lg:h-56':
            !isVertical,
        })}
      />
    </div>
  );
};

export default MovieCard;
