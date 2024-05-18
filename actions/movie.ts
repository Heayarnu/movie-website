import { db } from '@/lib/db';

export const addMovie = async (movieId: number, movieTitle: string) => {
  try {
    const newMovie = await db.movie.create({
      data: {
        id: movieId,
        title: movieTitle,
        user: {},
      },
    });

    return newMovie;
  } catch (error) {
    console.error('Error adding movie: ', error);
    throw error;
  }
};

export const removeMovie = async (movieId: number) => {
  try {
    const deletedMovie = await db.movie.delete({
      where: {
        id: movieId,
      },
    });

    return deletedMovie;
  } catch (error) {
    console.error('Error removing movie: ', error);
    throw error;
  }
};
