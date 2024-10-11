'use client';

import MoviesCarousel from '@/components/MoviesCarousel';
import PaginationSection from '@/components/Pagination';
import { Movie, SearchProps } from '@/types/index';
import { getPopularMovies, getSearchMovies } from '@/utils';
import { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';

const SearchPage = ({ params: { term } }: SearchProps) => {
  const termToUse = decodeURI(term);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const savedPage = sessionStorage.getItem(`currentPage-${termToUse}`);
      return savedPage ? parseInt(savedPage, 10) : 1;
    }
    return 1;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        `currentPage-${termToUse}`,
        currentPage.toString(),
      );
    }
  }, [currentPage, termToUse]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const { fetchedMovies, totalPages } = await getSearchMovies(termToUse);

      setTotalPages(totalPages);
      setMovies(
        (fetchedMovies[currentPage - 1] || []).filter(
          (movie: Movie) => movie !== null,
        ) as Movie[],
      );
      setLoading(false);
    };

    fetchMovies();
  }, [termToUse, currentPage]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const movies = await getPopularMovies();
      setPopularMovies(movies);
    };

    fetchPopularMovies();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="mb-20 flex items-center justify-center pt-20 sm:pt-24 md:pt-32 lg:pt-28">
        <FadeLoader color="#d51b1b" height={25} />
      </div>
    );
  }

  return (
    <div className="mx-auto pt-20 sm:pt-24 md:pt-32 lg:pt-28">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="w-full px-4 text-left text-2xl sm:text-3xl md:text-5xl">
            Search results for{' '}
            <span className="font-bold italic">{termToUse}</span>
          </h1>

          <MoviesCarousel movies={movies} isVertical />

          {totalPages > 1 && (
            <PaginationSection
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
          )}
        </div>

        {movies.length === 0 && (
          <div>
            <h2 className="xl:text:5xl px-6 text-xl font-bold md:text-3xl xl:px-10">
              Others you might like
            </h2>

            <MoviesCarousel movies={popularMovies} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
