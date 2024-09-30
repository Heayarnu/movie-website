import { cn } from '@/lib/utils';
import {} from '@/types';
import { Movie, MovieCarouselProps } from '@/types/index';
import MovieCard from './MovieCard';

const MoviesCarousel = ({ title, movies, isVertical }: MovieCarouselProps) => {
  return (
    <div className="w-screen">
      <h2 className="mt-1 px-4 text-xl font-bold sm:mt-3 md:px-10 lg:text-3xl">
        {title}
      </h2>

      <div
        className={cn(
          'flex overflow-scroll pt-1 scrollbar-hide lg:px-10',
          isVertical && 'flex flex-wrap justify-center',
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
