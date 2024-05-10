import { MovieCarouselProps } from '@/types';
import MovieCard from './MovieCard';
import { cn } from '@/lib/utils';

const MoviesCarousel = ({ title, movies, isVertical }: MovieCarouselProps) => {
  return (
    <div className="z-40 w-screen">
      <h2 className="mt-1 md:mt-3 text-xl lg:text-3xl font-bold px-4 md:px-10">
        {title}
      </h2>

      <div
        className={cn(
          'flex overflow-scroll scrollbar-hide lg:px-10 py-5',
          isVertical && 'flex flex-wrap justify-center',
        )}
      >
        {movies?.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} isVertical={isVertical} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesCarousel;
