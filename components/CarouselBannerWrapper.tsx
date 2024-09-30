import { NowPlaying } from '@/utils';
import Carouselbanner from './Carouselbanner';

async function CarouselBannerWrapper({
  selectedProfile,
}: {
  selectedProfile: any;
}) {
  const movies = await NowPlaying();

  return (
    <div className="mb-2">
      <Carouselbanner movies={movies} selectedProfile={selectedProfile} />
    </div>
  );
}

export default CarouselBannerWrapper;
