import { NowPlaying } from '@/utils';
import Carouselbanner from './Carouselbanner';
import { Profile } from '@prisma/client';

async function CarouselBannerWrapper({
  selectedProfile,
}: {
  selectedProfile: Profile;
}) {
  const movies = await NowPlaying();

  return (
    <div className="mb-2">
      <Carouselbanner movies={movies} selectedProfile={selectedProfile} />
    </div>
  );
}

export default CarouselBannerWrapper;
