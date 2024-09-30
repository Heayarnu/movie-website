import MoviesCarousel from '@/components/MoviesCarousel';
import { GenreProps } from '@/types/index';
import { getDiscoverGenre } from '@/utils';

async function GenrePage({
  params: { id },
  searchParams: { genre },
}: GenreProps) {
  const movies = await getDiscoverGenre(id);

  return (
    <div className="relative mx-auto pt-20">
      <div className="flex flex-col">
        <h1 className="xl:text:7xl ml-5 px-4 font-mono text-2xl font-semibold md:ml-10 md:text-5xl xl:px-10">
          {genre}
        </h1>

        <MoviesCarousel movies={movies} isVertical />
      </div>
    </div>
  );
}

export default GenrePage;
