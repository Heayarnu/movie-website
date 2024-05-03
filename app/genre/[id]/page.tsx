import MoviesCarousel from '@/components/MoviesCarousel';
import { GenreProps } from '@/types';
import { getDiscoverMovies } from '@/utils';
import React from 'react';

async function GenrePage({
  params: { id },
  searchParams: { genre },
}: GenreProps) {
  const movies = await getDiscoverMovies(id);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mt-20">
        <h1 className="text-2xl md:text-5xl xl:text:7xl font-semibold px-4 py-2 xl:px-10 font-mono border rounded-2xl w-fit ml-5 md:ml-10">
          {genre}
        </h1>

        <MoviesCarousel movies={movies} isVertical />
      </div>
    </div>
  );
}

export default GenrePage;
