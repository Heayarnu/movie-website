import { db } from '@/lib/db';

const apiCache: { [key: string]: { data: any; expiry: number } } = {};

// Consolidated API call function with caching and expiration
async function fetchFromTMDB(
  url: URL,
  cacheTime: number = 86400,
): Promise<any> {
  const cacheKey = url.toString();
  const currentTime = Date.now();

  if (apiCache[cacheKey] && apiCache[cacheKey].expiry > currentTime) {
    return apiCache[cacheKey].data;
  }

  try {
    url.searchParams.set('include_adult', 'false');
    url.searchParams.set('language', 'en');
    url.searchParams.set('sort_by', 'popularity.desc');
    url.searchParams.set('include_video', 'false');

    const options: RequestInit = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
      next: { revalidate: cacheTime },
    };

    const response = await fetch(url.toString(), options);
    if (!response.ok) throw new Error('Failed to fetch data from TMDB');
    const data = await response.json();
    apiCache[cacheKey] = { data, expiry: currentTime + cacheTime * 1000 };
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Fetch movie videos
export async function getMovieVideos(id: string): Promise<string | null> {
  const cacheKey = `movie_videos_${id}`;
  const currentTime = Date.now();

  if (apiCache[cacheKey] && apiCache[cacheKey].expiry > currentTime) {
    return apiCache[cacheKey].data;
  }

  try {
    const url = new URL(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    );
    const response = await fetchFromTMDB(url);
    if (!response) return null;

    const video = response.results.find((video: { type: string }) =>
      ['Trailer', 'Teaser', 'Clip', 'Featurette'].includes(video.type),
    );
    const videoUrl = video
      ? `https://www.youtube.com/embed/${video.key}`
      : null;
    apiCache[cacheKey] = { data: videoUrl, expiry: currentTime + 86400 * 1000 };
    return videoUrl;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Filter movies based on video and path
async function filterMovies(
  movies: { id: string; backdrop_path?: string; poster_path?: string }[],
  type: 'nowPlaying' | 'others',
): Promise<any[]> {
  const moviesWithVideos = await Promise.all(
    movies.map(async (movie) => {
      const videoUrl = await getMovieVideos(movie.id);
      if (type === 'nowPlaying') {
        return videoUrl && movie.backdrop_path ? movie : null;
      } else {
        return videoUrl && movie.poster_path ? movie : null;
      }
    }),
  );
  return moviesWithVideos.filter(Boolean);
}

// Fetch functions
export async function fetchMovies() {
  const url = new URL(
    'https://api.themoviedb.org/3/genre/movie/list?language=en',
  );
  return fetchFromTMDB(url);
}

export async function getUpcomingMovies() {
  const url = new URL('https://api.themoviedb.org/3/movie/upcoming');
  const data = await fetchFromTMDB(url);
  return data ? filterMovies(data.results, 'others') : [];
}

export async function getTopRatedMovies() {
  const url = new URL('https://api.themoviedb.org/3/movie/top_rated');
  const data = await fetchFromTMDB(url);
  return data ? filterMovies(data.results, 'others') : [];
}

export async function getPopularMovies() {
  const url = new URL('https://api.themoviedb.org/3/movie/popular');
  const data = await fetchFromTMDB(url);
  return data ? filterMovies(data.results, 'others') : [];
}

export async function getDiscoverGenre(
  id?: string,
  keywords?: string,
  page: number = 1,
) {
  const url = new URL('https://api.themoviedb.org/3/discover/movie');
  if (keywords) url.searchParams.set('with_keywords', keywords);
  if (id) url.searchParams.set('with_genres', id);
  url.searchParams.set('page', page.toString());

  const data = await fetchFromTMDB(url);
  return data ? filterMovies(data.results, 'others') : [];
}

export async function getMovieDetails(id: string) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}`);
  return fetchFromTMDB(url);
}

export async function getSimilarMovies(id: string) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}/similar`);
  const data = await fetchFromTMDB(url);
  return data ? filterMovies(data.results, 'others') : [];
}

export async function getRecommendations(id: string) {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/${id}/recommendations`,
  );
  const data = await fetchFromTMDB(url);
  return data ? filterMovies(data.results, 'others') : [];
}

export async function getMovieCertification(id: string) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}/release_dates`);
  const data = await fetchFromTMDB(url);
  if (!data) return null;

  const usRelease = data.results.find(
    (release: { iso_3166_1: string }) => release.iso_3166_1 === 'US',
  );
  return usRelease?.release_dates[0]?.certification || null;
}

export async function getCredits(id: string) {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
  );
  const data = await fetchFromTMDB(url);

  const Director = data.crew
    .filter((member: { job: string }) => member.job === 'Director')
    .map((director: { name: string }) => director.name);
  const Writer = data.crew
    .filter((member: { job: string }) => member.job === 'Writer')
    .map((writer: { name: string }) => writer.name);
  const castNames = data.cast.map(
    (castMember: { name: string }) => castMember.name,
  );

  return { Director, Writer, castNames };
}

export async function NowPlaying() {
  const url = new URL('https://api.themoviedb.org/3/movie/now_playing');
  const data = await fetchFromTMDB(url);
  if (!data) return [];

  const moviesWithVideosAndBackdrop = await filterMovies(
    data.results,
    'nowPlaying',
  );
  return moviesWithVideosAndBackdrop.sort(() => Math.random() - 0.5);
}

const searchMoviesCache: { [key: string]: { data: any; expiry: number } } = {};

export async function getSearchMovies(term: string) {
  const currentTime = Date.now();
  if (searchMoviesCache[term] && searchMoviesCache[term].expiry > currentTime) {
    return searchMoviesCache[term].data;
  }

  const url = new URL('https://api.themoviedb.org/3/search/movie');
  url.searchParams.set('query', term);
  url.searchParams.set('page', '1');

  const firstPageData = await fetchFromTMDB(url);
  if (!firstPageData) return { fetchedMovies: [], totalPages: 0 };

  const totalPages = Math.min(firstPageData.total_pages, 40);
  const allPagesData = await Promise.all(
    Array.from({ length: totalPages }, (_, i) => {
      const pageUrl = new URL(url.toString());
      pageUrl.searchParams.set('page', (i + 1).toString());
      return fetchFromTMDB(pageUrl);
    }),
  );

  const allMovies = allPagesData.flatMap((data) => data.results);
  const filteredMovies = await filterMovies(allMovies, 'others');

  const paginatedMovies = [];
  for (let i = 0; i < filteredMovies.length; i += 24) {
    paginatedMovies.push(filteredMovies.slice(i, i + 24));
  }

  const result = {
    fetchedMovies: paginatedMovies,
    totalPages: paginatedMovies.length,
  };
  searchMoviesCache[term] = {
    data: result,
    expiry: currentTime + 86400 * 1000,
  };

  return result;
}

export const getImagePath = (imagePath?: string, fullsize?: boolean) => {
  return imagePath
    ? `http://image.tmdb.org/t/p/${fullsize ? 'original' : 'w500'}${imagePath}`
    : 'https://links.papareact.com/o8z';
};

export async function getMyList(profileId: string) {
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

  return likedMovies.map((movie) => ({
    id: movie.movieId,
    title: movie.movieTitle,
    release_date: movie.movieReleaseDate,
    poster_path: movie.moviePosterPath,
  }));
}

export async function getLikedMovie(profileId: string, movieId: string) {
  try {
    const response = await fetch(
      `/api/mylist?profileId=${profileId}&movieId=${movieId}`,
    );
    if (!response.ok) throw new Error('Failed to fetch liked status');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
