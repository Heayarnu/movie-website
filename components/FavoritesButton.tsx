import React, { useState } from 'react';
import { Button } from './ui/button';
import { PlusIcon, Check } from 'lucide-react';
import { addMovie, removeMovie } from '@/actions/movie';

const Favorites = ({ movie }: any) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleClick = async () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    if (newIsLiked) {
      try {
        await addMovie(movie.id, movie.title);
      } catch (error) {
        console.error('Error adding movie to favorites: ', error);
      }
    } else {
      try {
        await removeMovie(movie.id);
      } catch (error) {
        console.error('Error removing movie from favorites: ', error);
      }
    }
  };

  return (
    <div>
      <Button
        type="button"
        onClick={handleClick}
        className="bg-stone-500 text-black hover:scale-110 hover:bg-stone-600 pl-2 text-lg md:text-xl cursor-pointer"
      >
        {isLiked ? <Check className="mr-1" /> : <PlusIcon className="mr-1" />}{' '}
        My List
      </Button>
    </div>
  );
};

export default Favorites;
