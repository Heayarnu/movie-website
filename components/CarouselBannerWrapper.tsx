import { NowPlaying } from '@/utils';
import Carouselbanner from './Carouselbanner';

async function CarouselBannerWrapper() {
  const movies = await NowPlaying();

  return (
    <div className="mb-2">
      <Carouselbanner movies={movies} />
    </div>
  );
}

export default CarouselBannerWrapper;
