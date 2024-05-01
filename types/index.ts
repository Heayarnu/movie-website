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

export interface CarouselBannerProps {
  id?: string;
  keywords?: string;
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
