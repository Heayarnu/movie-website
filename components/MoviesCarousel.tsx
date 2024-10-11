import { cn } from '@/lib/utils';
import {} from '@/types';
import { Movie, MovieCarouselProps } from '@/types/index';
import MovieCard from './MovieCard';

const MoviesCarousel = ({ title, movies, isVertical }: MovieCarouselProps) => {
  return (
    <div
      className={cn(
        isVertical ? 'w-full pl-2' : 'w-[96vw] pl-2 xl:w-[98vw] xl:pl-4',
      )}
    >
      <h2 className="mt-1 pl-4 text-xl font-bold sm:mt-3 md:pl-6 lg:mt-7 lg:text-3xl xl:mt-10">
        {title}
      </h2>

      <div
        className={cn(
          '',
          isVertical
            ? 'grid grid-cols-3 pt-4 sm:grid-cols-5 sm:pt-2 md:grid-cols-4 xl:grid-cols-6 xl:pt-0'
            : 'flex overflow-scroll pt-2 scrollbar-hide lg:pl-5 xl:pt-4 ',
        )}
      >
        {movies?.map((movie: Movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} isVertical={isVertical} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesCarousel;
