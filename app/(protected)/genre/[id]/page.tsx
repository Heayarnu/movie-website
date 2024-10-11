'use client';

import MoviesCarousel from '@/components/MoviesCarousel';
import PaginationSection from '@/components/Pagination';
import { GenreProps, Movie } from '@/types/index';
import { getDiscoverGenre } from '@/utils';
import { useEffect, useState } from 'react';

const GenrePage = ({ params: { id }, searchParams: { genre } }: GenreProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const savedPage = sessionStorage.getItem(`currentPage-${id}`);
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  useEffect(() => {
    sessionStorage.setItem(`currentPage-${id}`, currentPage.toString());
  }, [currentPage, id]);

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await getDiscoverGenre(id, '', currentPage);

      setMovies(fetchedMovies);
    };

    fetchMovies();
  }, [id, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20 sm:pt-24 md:pt-32 lg:pt-28">
      <div className="flex flex-col">
        <h1 className="w-full px-4 text-left font-mono text-2xl font-semibold sm:text-3xl md:text-5xl">
          {genre}
        </h1>

        <MoviesCarousel movies={movies} isVertical />

        <PaginationSection
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default GenrePage;
