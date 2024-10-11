import MoviesCarousel from '@/components/MoviesCarousel';
import { getMyList, getPopularMovies } from '@/utils';
import { cookies } from 'next/headers';

export default async function MyListPage() {
  // Access cookies server-side
  const cookieStore = cookies();
  const selectedProfileId = cookieStore.get('selectedProfileId')?.value;

  // Fetch liked movies using the utility function
  const likedMovies = selectedProfileId
    ? await getMyList(selectedProfileId)
    : [];

  const popularMovies = await getPopularMovies();

  return (
    <div className="pt-20 sm:pt-24 md:pt-32 lg:pt-28">
      <div className="flex flex-col items-center justify-center">
        {likedMovies.length !== 0 && (
          <h1 className="w-full px-4 text-left font-mono text-2xl font-semibold sm:text-3xl md:text-5xl">
            Favourite movies
          </h1>
        )}

        <MoviesCarousel movies={likedMovies} isVertical />

        {likedMovies.length === 0 && (
          <div>
            <p className="-mt-5 w-full px-4 text-left text-lg text-gray-500 sm:text-xl xl:-mt-10">
              You haven&apos;t added any movie to your list yet.
            </p>

            <h2 className="xl:text:5xl mt-4 px-4 text-xl font-bold md:text-3xl">
              Recommended movies
            </h2>
            <MoviesCarousel movies={popularMovies} />
          </div>
        )}
      </div>
    </div>
  );
}
