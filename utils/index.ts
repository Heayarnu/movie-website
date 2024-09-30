import { db } from '@/lib/db';
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

export async function getDiscoverGenre(id?: string, keywords?: string) {
  const url = new URL('https://api.themoviedb.org/3/discover/movie');
  keywords && url.searchParams.set('with_keywords', keywords);
  id && url.searchParams.set('with_genres', id);

  const data = await fetchFromTMDB(url);
  shuffleArray(data.results);
  return data.results;
}

export async function getMovieDetails(id: string) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}`);
  const data = await fetchFromTMDB(url);
  return data;
}

export async function getMovieCertification(id: string) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}/release_dates`);
  const response = await fetch(url.toString(), getFetchOptions());
  const data = await response.json();

  const usRelease = data.results.find(
    (release: { iso_3166_1: string }) => release.iso_3166_1 === 'US',
  );

  return usRelease?.release_dates[0]?.certification;
}

export async function getMovieVideos(id: string) {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

  const options = getFetchOptions();

  const response = await fetch(url, options);
  const data = await response.json();

  // Try to extract the first trailer
  const trailer = data.results.find(
    (video: { type: string }) => video.type === 'Trailer',
  );

  if (trailer) {
    const trailerKey = trailer.key; // Get the trailer key
    return `https://www.youtube.com/embed/${trailerKey}`; // Return the trailer URL
  }

  // If no trailer, try to find the first teaser
  const teaser = data.results.find(
    (video: { type: string }) => video.type === 'Teaser',
  );
  if (teaser) {
    const teaserKey = teaser.key; // Get the teaser key
    return `https://www.youtube.com/embed/${teaserKey}`; // Return the teaser URL
  }

  // If no teaser, try to find the first clip
  const clip = data.results.find(
    (video: { type: string }) => video.type === 'Clip',
  );
  if (clip) {
    const clipKey = clip.key; // Get the clip key
    return `https://www.youtube.com/embed/${clipKey}`; // Return the clip URL
  }

  // If no clip, try to find the first featurette
  const featurette = data.results.find(
    (video: { type: string }) => video.type === 'Featurette',
  );
  if (featurette) {
    const featuretteKey = featurette.key; // Get the featurette key
    return `https://www.youtube.com/embed/${featuretteKey}`; // Return the featurette URL
  }

  console.log('No videos found.');
  return null; // Return null if no appropriate video is found
}

export async function getCredits(id: String) {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  const options = getFetchOptions();

  const response = await fetch(url, options);

  const data = await response.json();

  // Extracting director(s), writer(s), and cast names
  const Director = data.crew
    .filter((member: { job: string }) => member.job === 'Director')
    .map((director: { name: any }) => director.name);
  const Writer = data.crew
    .filter((member: { job: string }) => member.job === 'Writer')
    .map((writer: { name: any }) => writer.name);
  const castNames = data.cast.map(
    (castMember: { name: any }) => castMember.name,
  );

  return {
    Director,
    Writer,
    castNames,
  };
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

export async function getLikedMovies(profileId: string) {
  if (!profileId) return [];

  const likedMovies = await db.myList.findMany({
    where: { profileId },
    select: {
      movieId: true,
      movieTitle: true,
      movieReleaseDate: true,
      moviePosterPath: true,
    },
  });

  // Convert to the format expected by MoviesCarousel
  return likedMovies.map((movie) => ({
    id: movie.movieId,
    title: movie.movieTitle,
    release_date: movie.movieReleaseDate,
    poster_path: movie.moviePosterPath,
  }));
}
