import CarouselBannerWrapper from '@/components/CarouselBannerWrapper';
import MoviesCarousel from '@/components/MoviesCarousel';
import { currentUser } from '@/lib/auth';
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '@/utils';

export default async function HomeScreen() {
  const upComingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  const user = await currentUser();

  return (
    <div>
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
