import React from 'react';

export interface SearchProps {
  params: {
    term: string;
  };
}

export interface GenreProps {
  params: {
    id: string;
  };

  searchParams: {
    genre: string;
  };
}

export interface MovieCarouselProps {
  title?: string;
  movies: Movie[];
  isVertical?: boolean;
}

export interface MovieCardProps {
  movie: Movie;
  isVertical?: boolean;
}

export interface HomeScreenRowsProps {
  h1: string;
  h2: string;
  imageSrc: string;
  isReversed?: boolean;
}

export interface DisclosuresProps {
  title: string;
  children: string;
}

export interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export interface FormErrorProps {
  message?: any;
}

export interface FormSuccessProps {
  message?: any;
}

export interface CarouselBannerProps {
  id?: string;
  keywords?: string;
}

export interface ProfileCardProps {
  name: string;
  imageSrc: string;
  onClick: () => void;
}

export interface Profile {
  id: number;
  name: string;
  imageSrc: string;
  userId: string;
}


export type Genre = {
  id: number;
  name: string;
};

export type Genres = {
  genres: Genre[];
};

export type Movie = {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type SearchResults = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
