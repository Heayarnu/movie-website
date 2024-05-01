import { CarouselBannerProps } from '@/types';
import { getDiscoverMovies } from '@/utils';
import Carouselbanner from './Carouselbanner';

async function CarouselBannerWrapper({ id, keywords }: CarouselBannerProps) {
  const movies = await getDiscoverMovies(id, keywords);

  return (
    <div className='mb-2 md:mb-0'>
      <Carouselbanner movies={movies} />
    </div>
  );
}

export default CarouselBannerWrapper;
