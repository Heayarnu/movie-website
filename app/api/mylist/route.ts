import { db } from '@/lib/db';

// Named export for the POST method (toggles My List)
export async function POST(req: Request) {
  const { profileId, movie } = await req.json(); // Use `req.json()` to parse the incoming JSON

  // Validate input
  if ( 
    !profileId ||
    !movie ||
    !movie.id ||
    !movie.title ||
    !movie.release_date ||
    !movie.poster_path 
  ) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Invalid input: profileId and complete movie data are required.',
      }),
      { status: 400 },
    );
  }

  const movieId = String(movie.id); // Convert TMDB movie ID to String
  const movieTitle = movie.title;
  const movieReleaseDate = movie.release_date;
  const moviePosterPath = movie.poster_path;

  try {
    // Check if the movie is already in the user's My List
    const existingEntry = await db.myList.findUnique({
      where: {
        profileId_movieId: {
          profileId,
          movieId,
        },
      },
    });

    if (existingEntry) {
      // If the movie is already liked, remove it from My List
      await db.myList.delete({
        where: { id: existingEntry.id },
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Movie removed from My List.',
        }),
        { status: 200 },
      );
    } else {
      // If the movie is not liked, add it to My List
      await db.myList.create({
        data: {
          profileId,
          movieId,
          movieTitle,
          movieReleaseDate,
          moviePosterPath,
        },
      });

      return new Response(
        JSON.stringify({ success: true, message: 'Movie added to My List.' }),
        { status: 201 },
      );
    }
  } catch (error) {
    console.error('Database error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal Server Error: Unable to process your request.',
      }),
      { status: 500 },
    );
  }
}

// Named export for the GET method (checks if movie is in My List)
export async function GET(req: Request) {
  const url = new URL(req.url);
  const profileId = url.searchParams.get('profileId');
  const movieId = url.searchParams.get('movieId');

  // Validate input
  if (!profileId || !movieId) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Invalid input: profileId and movieId are required.',
      }),
      { status: 400 },
    );
  }

  try {
    // Check if the movie is in the user's My List
    const existingEntry = await db.myList.findUnique({
      where: {
        profileId_movieId: {
          profileId,
          movieId,
        },
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        isLiked: !!existingEntry, // true if liked, false otherwise
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Database error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal Server Error: Unable to process your request.',
      }),
      { status: 500 },
    );
  }
}
