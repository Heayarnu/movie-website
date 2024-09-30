import CarouselBannerWrapper from '@/components/CarouselBannerWrapper';
import MoviesCarousel from '@/components/MoviesCarousel';
import { db } from '@/lib/db';
import {
  getLikedMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '@/utils';
import { cookies } from 'next/headers';

export default async function HomeScreen() {
  // Fetch movies
  const upComingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();
  // Access cookies server-side
  const cookieStore = cookies();
  const selectedProfileId = cookieStore.get('selectedProfileId')?.value;

  // Fetch the selected profile from Prisma
  const selectedProfile = selectedProfileId
    ? await db.profile.findUnique({
        where: { id: selectedProfileId },
      })
    : null;

  // Fetch liked movies using the utility function
  const likedMovies = selectedProfileId
    ? await getLikedMovies(selectedProfileId)
    : [];

  return (
    <div>
      <CarouselBannerWrapper selectedProfile={selectedProfile} />

      <div className="flex flex-col space-y-2">
        <MoviesCarousel movies={upComingMovies} title="Upcoming" />
        <MoviesCarousel movies={topRatedMovies} title="Top Rated" />
        <MoviesCarousel movies={popularMovies} title="Popular" />

        {/* Display Liked Movies Carousel if there are liked movies */}
        {likedMovies.length > 0 && (
          <MoviesCarousel movies={likedMovies} title="My List" />
        )}
      </div>
    </div>
  );
}
