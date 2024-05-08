import MoviesCarousel from '@/components/MoviesCarousel';
import { SearchProps } from '@/types';
import { getPopularMovies, getSearchMovies } from '@/utils';
import { notFound } from 'next/navigation';
import React from 'react';

async function SearchPage({ params: { term } }: SearchProps) {
  if (!term) notFound();

  const termToUse = decodeURI(term);

  const movies = await getSearchMovies(termToUse);
  const popularMovies = await getPopularMovies();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mt-20">
        <div>
          <h1 className="text-3xl md:text-5xl xl:text:7xl px-6 xl:px-10">
            Search results for{' '}
            <span className="italic font-bold">{termToUse}</span>
          </h1>

          <MoviesCarousel movies={movies} isVertical />
        </div>

        <div>
          <h2 className="text-xl md:text-3xl xl:text:5xl font-bold px-6 xl:px-10">
            Others you might like
          </h2>

          <MoviesCarousel movies={popularMovies} />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
