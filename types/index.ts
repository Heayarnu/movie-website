// Props for the search page
export interface SearchProps {
  params: {
    term: string;
  };
}

// Props for the genre page
export interface GenreProps {
  params: {
    id: string;
  };
  searchParams: {
    genre: string;
  };
}

export interface NavBarProps {
  showBackground: boolean;
  isHome: boolean;
  profile: Profile;
  profiles: Profile[];
  setProfiles: React.Dispatch<React.SetStateAction<Profile[]>>;
  isLoading: boolean;
}

// Props for a movie carousel component
export interface MovieCarouselProps {
  title?: string;
  movies: Movie[];
  isVertical?: boolean;
}

// Props for individual movie card component
export interface MovieCardProps {
  movie: Movie;
  isVertical?: boolean;
}

// Props for rows displayed on the home screen
export interface HomeScreenRowsProps {
  h1: string;
  h2: string;
  imageSrc: string;
  isReversed?: boolean;
}

// Props for a disclosures component (e.g., FAQs)
export interface DisclosuresProps {
  title: string;
  children: string;
}

// Props for a login button component
export interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

// Props for handling form errors
export interface FormErrorProps {
  message?: string;
}

// Props for handling form success messages
export interface FormSuccessProps {
  message?: string;
}

// Props for a carousel banner
export interface CarouselBannerProps {
  id?: string;
  keywords?: string;
}

// Props for individual profile card component
export interface ProfileCardProps {
  name: string;
  imageSrc: string;
  onClick: () => void;
}

// Props for a specific movie page
export interface MoviePageProps {
  params: {
    id: string;
  };
}

// Interface for user profile information
export interface Profile {
  id: string;
  name: string;
  imageSrc: string;
  userId: string;
}

// Genre type
export interface Genre {
  id: number;
  name: string;
}

// Type for multiple genres
export interface Genres {
  genres: Genre[];
}

// Movie type definition
export interface Movie {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}
