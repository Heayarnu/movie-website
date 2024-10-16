import MoviesCarousel from '@/components/MoviesCarousel';
import MyList from '@/components/MyList';
import ShowMoreText from '@/components/ShowMore';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { db } from '@/lib/db';
import { MoviePageProps } from '@/types/index';
import {
  getCredits,
  getMovieCertification,
  getMovieDetails,
  getMovieVideos,
  getRecommendations,
  getSimilarMovies,
} from '@/utils';

const page = async ({ params: { id } }: MoviePageProps) => {
  const movie = await getMovieDetails(id);

  const similarMovies = await getSimilarMovies(id);
  const recommendations = await getRecommendations(id);
  const maturityRating = await getMovieCertification(id);
  const credits = await getCredits(id);

  const videoUrl = await getMovieVideos(id); // Fetch the trailer URL

  // Access cookies server-side
  const cookieStore = (await import('next/headers')).cookies();
  const selectedProfileId = cookieStore.get('selectedProfileId')?.value;

  // Fetch the selected profile from Prisma
  const selectedProfile = selectedProfileId
    ? await db.profile.findUnique({
        where: { id: selectedProfileId },
      })
    : null;

  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const getMaturityRatingDescription = (rating: string) => {
    switch (rating) {
      case 'G':
        return 'General Audiences';
      case 'PG':
        return 'Parental Guidance Suggested';
      case 'PG-13':
        return 'Parents Strongly Cautioned';
      case 'R':
        return 'Restricted';
      case 'NC-17':
        return 'Adults Only';
    }
  };

  const getVoteAverageClass = (voteAverage: number) => {
    if (voteAverage >= 7) {
      return 'bg-green-500 text-white';
    } else if (voteAverage >= 5) {
      return 'bg-yellow-500 text-black';
    } else {
      return 'bg-red-500 text-white';
    }
  };

  return (
    <div className="flex flex-col p-2 py-10 sm:p-5 xl:pl-10 ">
      <div className="flex w-full flex-col pt-[40px] sm:pt-[65px] xl:grid xl:grid-cols-[2fr_1fr] xl:gap-10 xl:pt-[95px]">
        <div className="flex w-full">
          {videoUrl && (
            <iframe
              src={videoUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-[350px] w-full items-center justify-center sm:h-[400px] xl:h-[550px]"
            ></iframe>
          )}
        </div>

        <div className="flex flex-col">
          {movie.title && (
            <h1 className="mb-2 mt-2 text-3xl font-bold sm:mb-3 sm:mt-4 lg:text-5xl xl:-mt-2 xl:mb-4">
              {movie.title}
            </h1>
          )}

          <div className="mb-2 flex items-center justify-between">
            <div className="mb-2 flex flex-row items-center space-x-7 xl:space-x-10">
              {movie.release_date && (
                <p className="text-xl font-medium">
                  {movie.release_date.split('-')[0]}
                </p>
              )}

              {maturityRating && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="cursor-pointer rounded-md border bg-gray-500 px-1 py-0 text-white">
                        {maturityRating}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{getMaturityRatingDescription(maturityRating)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {movie.runtime && (
                <p className="text-lg font-medium">
                  {formatRuntime(movie.runtime)}
                </p>
              )}

              {movie.vote_average &&
                movie.vote_average !== 0 &&
                movie.vote_count >= 100 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p
                          className={`cursor-pointer rounded-md border px-1 py-0 font-medium ${getVoteAverageClass(
                            movie.vote_average,
                          )}`}
                        >
                          {movie.vote_average.toFixed(2)}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Avg Rating</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
            </div>

            <div className="-mt-4 hidden sm:block xl:hidden">
              <MyList movie={movie} selectedProfile={selectedProfile} />
            </div>
          </div>

          {movie.overview && (
            <div className="mb-1.5 text-lg">
              <ShowMoreText maxLength={170} text={movie.overview} />{' '}
            </div>
          )}

          <div className="sm:hidden xl:block">
            <MyList movie={movie} selectedProfile={selectedProfile} />
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <p className="mb-0.5 text-lg">
              <span className="font-medium">Genre: </span>
              {movie.genres
                .map((genre: { name: any }) => genre.name)
                .join(', ')}
            </p>
          )}

          {credits.Director && credits.Director.length > 0 && (
            <p className="text-lg">
              <span className="font-medium">Director: </span>
              {credits.Director.join(', ')}
            </p>
          )}

          {credits.Writer && credits.Writer.length > 0 && (
            <p className="text-lg">
              <span className="font-medium">Writer: </span>
              {credits.Writer.join(', ')}
            </p>
          )}

          {credits.castNames && credits.castNames.length > 0 && (
            <p className="mb-1.5 inline text-lg">
              <span className="mr-2 font-medium">Starring:</span>
              <ShowMoreText
                maxLength={120}
                text={credits.castNames.join(', ')}
              />
            </p>
          )}

          {movie.production_companies &&
            movie.production_companies.length > 0 && (
              <p className="mb-0.5 text-lg">
                <span className="font-medium">Studios: </span>
                {movie.production_companies
                  .map((company: { name: string }) => company.name)
                  .join(', ')}
              </p>
            )}

          {movie.production_countries &&
            movie.production_countries.length > 0 && (
              <p className="text-lg">
                <span className="font-medium">Production Country: </span>
                {movie.production_countries
                  .map((country: { name: string }) => country.name)
                  .join(', ')}
              </p>
            )}
        </div>

        <div className="mt-5 flex flex-col items-center  justify-center space-y-5 xl:hidden">
          {recommendations.length !== 0 && (
            <MoviesCarousel
              movies={recommendations}
              title="Recommended Movies"
            />
          )}

          {similarMovies.length !== 0 && (
            <MoviesCarousel movies={similarMovies} title="Similar Movies" />
          )}
        </div>
      </div>

      <div className="mt-20 hidden space-y-5 xl:-ml-7 xl:flex xl:flex-col xl:items-center xl:justify-start">
        {recommendations.length !== 0 && (
          <MoviesCarousel movies={recommendations} title="Recommended Movies" />
        )}

        {similarMovies.length !== 0 && (
          <MoviesCarousel movies={similarMovies} title="Similar Movies" />
        )}
      </div>
    </div>
  );
};

export default page;
