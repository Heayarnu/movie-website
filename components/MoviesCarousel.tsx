import { MovieCarouselProps } from '@/types';
import MovieCard from './MovieCard';
import { cn } from '@/lib/utils';

const MoviesCarousel = ({ title, movies, isVertical }: MovieCarouselProps) => {
  return (
    <div className="z-40">
      <h2 className="mt-1 md:mt-3 text-xl font-bold px-4 md:px-10">{title}</h2>

      <div
        className={cn(
          'flex space-x-4 overflow-scroll scrollbar-hide px-5 lg:px-10 py-5',
          isVertical && 'flex-col space-x-0 space-y-6',
        )}
      >
        {isVertical
          ? movies?.map((movie) => (
              <div
                key={movie.id}
                className={cn(
                  isVertical &&
                    'flex flex-col space-y-4 mb-5 items-center lg:flex-row spa',
                )}
              >
                <MovieCard movie={movie} isVertical={isVertical} />

                <div className="max-w-2xl mx-6">
                  <p className="font-bold">
                    {movie.title} ({movie.release_date?.split('-')[0]})
                  </p>

                  <hr className="mb-3" />

                  <p className="line-clamp-3 hidden md:block">{movie.overview}</p>
                </div>
              </div>
            ))
          : movies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default MoviesCarousel;
