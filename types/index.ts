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
