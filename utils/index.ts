import { Genres, SearchResults } from '@/types';

// Utility function to fetch data from TMDB
async function fetchFromTMDB(url: URL, cacheTime?: number) {
  url.searchParams.set('include_adult', 'false');
  url.searchParams.set('language', 'en');
  url.searchParams.set('sort_by', 'popularity.desc');
  url.searchParams.set('include_video', 'false');
  url.searchParams.set('page', '1');

  const options = getFetchOptions(cacheTime);

  const response = await fetch(url.toString(), options);
  const data = (await response.json()) as SearchResults;

  return data;
}

// Utility function to get fetch options
function getFetchOptions(cacheTime?: number): RequestInit {
  return {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
    next: {
      revalidate: cacheTime || 60 * 60 * 24,
    },
  };
}

// Utility function to shuffle an array
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export async function fetchMovies() {
  const url = new URL(
    'https://api.themoviedb.org/3/genre/movie/list?language=en',
  );
  const options = getFetchOptions();

  const response = await fetch(url.toString(), options);
  const data = (await response.json()) as Genres;

  return data;
}

export async function getUpcomingMovies() {
  const url = new URL('https://api.themoviedb.org/3/movie/upcoming');
  const data = await fetchFromTMDB(url);
  shuffleArray(data.results);
  return data.results;
}

export async function getTopRatedMovies() {
  const url = new URL('https://api.themoviedb.org/3/movie/top_rated');
  const data = await fetchFromTMDB(url);
  shuffleArray(data.results);
  return data.results;
}

export async function getPopularMovies() {
  const url = new URL('https://api.themoviedb.org/3/movie/popular');
  const data = await fetchFromTMDB(url);
  shuffleArray(data.results);
  return data.results;
}

export async function getDiscoverMovies(id?: string, keywords?: string) {
  const url = new URL('https://api.themoviedb.org/3/discover/movie');
  keywords && url.searchParams.set('with_keywords', keywords);
  id && url.searchParams.set('with_genres', id);

  const data = await fetchFromTMDB(url);
  shuffleArray(data.results);
  return data.results;
}

export async function NowPlaying() {
  const url = new URL('https://api.themoviedb.org/3/movie/now_playing');
  const data = await fetchFromTMDB(url);
  shuffleArray(data.results);
  return data.results;
}

export async function getSearchMovies(term: string) {
  const url = new URL('https://api.themoviedb.org/3/search/movie');
  url.searchParams.set('query', term);

  const data = await fetchFromTMDB(url);
  return data.results;
}

export const getImagePath = (imagePath?: string, fullsize?: boolean) => {
  return imagePath
    ? `http://image.tmdb.org/t/p/${fullsize ? 'original' : 'w500'}${imagePath}`
    : 'https://links.papareact.com/o8z';
};


