import CarouselBannerWrapper from '@/components/CarouselBannerWrapper';
import GenreDropdown from '@/components/GenreDropdown';
import MoviesCarousel from '@/components/MoviesCarousel';
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '@/utils';

export default async function HomeScreen() {
  const upComingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  return (
    <div>
      {/* GenreDropdown */}
      <div className="mt-20 mx-2 md:mx-4 lg:mx-10">
        <GenreDropdown />
      </div>

      {/* CarouselBannerWrapper */}
      <CarouselBannerWrapper />

      <div className="flex flex-col space-y-2">
        {/* upcoming movies */}
        <MoviesCarousel movies={upComingMovies} title="Upcoming" />

        {/* toprated movies */}
        <MoviesCarousel movies={topRatedMovies} title="Top Rated" />

        {/* popular movies */}
        <MoviesCarousel movies={popularMovies} title="Popular" />
      </div>
    </div>
  );
}
