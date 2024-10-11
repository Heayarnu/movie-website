'use client';

// Global cache for all instances
const globalCache = new Map();

import { Movie } from '@/types/index';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Profile } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';

interface MyListProps {
  movie: Movie;
  selectedProfile: any;
}

const MyList = ({ movie, selectedProfile }: MyListProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const profileId = selectedProfile.id;

  const fetchLikedMovies = useCallback(async () => {
    const cacheKey = `${profileId}-${movie.id}`;

    // Check global cache
    if (globalCache.has(cacheKey)) {
      setIsLiked(globalCache.get(cacheKey));
      return;
    }

    try {
      const response = await fetch(
        `/api/mylist?profileId=${profileId}&movieId=${movie.id}`,
      );
      if (!response.ok) throw new Error('Failed to fetch liked status');

      const data = await response.json();
      globalCache.set(cacheKey, data.isLiked);
      setIsLiked(data.isLiked);
    } catch (error) {
      console.error('Error fetching liked status:', error);
    }
  }, [profileId, movie.id]);

  useEffect(() => {
    fetchLikedMovies();
  }, [fetchLikedMovies]);

  const router = useRouter();

  const toggleMyList = async () => {
    const cacheKey = `${profileId}-${movie.id}`;

    // Optimistically toggle the like state
    setIsLiked((prev) => !prev);

    try {
      const response = await fetch('/api/mylist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileId,
          movie,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        globalCache.set(cacheKey, !isLiked);
        router.refresh();
        // Update global cache with the new state
      } else {
        // Revert the optimistic update on error
        setIsLiked((prev) => !prev);
        console.error('Error:', data.error);
      }
    } catch (error) {
      setIsLiked((prev) => !prev); // Revert optimistic update on failure
      console.error('Error toggling movie:', error);
    }
  };

  const pathname = usePathname();
  const moviePath = pathname.startsWith('/movie');

  return (
    <div>
      <Button
        className={`${moviePath ? 'w-full border-none hover:scale-105 sm:w-28 xl:w-full' : 'sm:hover:scale-110'} z-10 cursor-pointer bg-stone-500 pl-2 text-lg text-white transition-all duration-100 hover:bg-stone-600 md:text-xl`}
        onClick={toggleMyList}
      >
        <FontAwesomeIcon
          icon={isLiked ? faCheck : faPlus}
          className="mx-2 text-xl"
        />
        My List
      </Button>
    </div>
  );
};

export default MyList;
