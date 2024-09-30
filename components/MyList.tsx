'use client';

import { Movie } from '@/types/index';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface MyListProps {
  movie: Movie;
  selectedProfile: any; // Specify the expected type for selectedProfile
}

const MyList = ({ movie, selectedProfile }: MyListProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false); // State to track if the movie is liked
  const profileId = selectedProfile.id;

  // Effect to check if the movie is already liked when the component mounts
  useEffect(() => {
    const fetchLikedMovies = async () => {
      try {
        const response = await fetch(
          `/api/mylist?profileId=${profileId}&movieId=${movie.id}`,
        );

        if (!response.ok) throw new Error('Failed to fetch liked status');

        const data = await response.json();
        setIsLiked(data.isLiked); // Set the liked status based on response
      } catch (error) {
        console.error('Error fetching liked status:', error);
      }
    };

    fetchLikedMovies();
  }, [profileId, movie.id]);

  const toggleMyList = async () => {
    try {
      const response = await fetch('/api/mylist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileId,
          movie, // Full movie object
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Toggle the liked state
        setIsLiked((prev) => !prev);
        console.log(`Movie ${isLiked ? 'removed from' : 'added to'} My List.`);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
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
