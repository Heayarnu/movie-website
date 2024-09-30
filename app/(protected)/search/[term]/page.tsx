import MoviesCarousel from '@/components/MoviesCarousel';
import { SearchProps } from '@/types/index';
import { getPopularMovies, getSearchMovies } from '@/utils';
import { notFound } from 'next/navigation';
import React from 'react';

async function SearchPage({ params: { term } }: SearchProps) {
  if (!term) notFound();

  const termToUse = decodeURI(term);

  const movies = await getSearchMovies(termToUse);
  const popularMovies = await getPopularMovies();

  return (
    <div className="lg:max-w-7xl lg:mx-auto relative pt-16">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="hidden md:block mt-10 text-xl md:text-3xl lg:texte-5xl xl:text:7xl px-6 xl:px-10">
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
