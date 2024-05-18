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
    <div className="mx-auto relative pt-32">
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-5xl xl:text:7xl font-semibold px-4 xl:px-10 font-mono ml-5 md:ml-10">
          {genre}
        </h1>

        <MoviesCarousel movies={movies} isVertical />
      </div>
    </div>
  );
}

export default GenrePage;
