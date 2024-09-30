import MoviesCarousel from '@/components/MoviesCarousel';
import { getLikedMovies } from '@/utils';
import { cookies } from 'next/headers';

export default async function MyListPage() {
  // Access cookies server-side
  const cookieStore = cookies();
  const selectedProfileId = cookieStore.get('selectedProfileId')?.value;

  // Fetch liked movies using the utility function
  const likedMovies = selectedProfileId
    ? await getLikedMovies(selectedProfileId)
    : [];

  return (
    <div className="relative mx-auto pt-20">
      <div className="flex flex-col">
        <h1 className="ml-5 px-4 font-mono text-2xl font-semibold md:ml-10 md:text-5xl xl:px-10 ">
          Favourite movies
        </h1>

        {/* Always display the MoviesCarousel, even if there are no liked movies */}
        <MoviesCarousel movies={likedMovies} isVertical />

        {/* Show message when no movies are in the list */}
        {likedMovies.length === 0 && (
          <p className="text-center text-lg text-gray-500">
            You haven&apos;t added any movies to your list yet.
          </p>
        )}
      </div>
    </div>
  );
}
