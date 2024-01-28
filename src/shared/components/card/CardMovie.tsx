import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import { MovieServices } from "@/shared/services/api/movie/movieAPI";
import { useEffect, useState } from "react";
import axios from "axios";
import { Environment } from "@/shared/environments";

interface IGenre {
  id: number;
  name: string;
}

interface IMovie {
  [x: string]: any;
  title: string;
  img: string;
  id?: number;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: [];
}

export const CarouselCardMovie: React.FC = () => {
  const [movie, setMovie] = useState<IMovie[]>([]);
  const [otherGenresMovies, setOtherGenresMovies] = useState<IMovie[][]>([]);
  const [genreMap, setGenreMap] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    MovieServices.getByRated().then((response) => {
      if (response instanceof Error) {
        alert(response.message);
      } else {
        const movieArray = response.results || [];
        setMovie(movieArray);
      }
    });

    const fetchMoviesByGenre = async (genreId: number) => {
      try {
        const response = await MovieServices.getByGenre(genreId);
        if (response instanceof Error) {
          alert(response.message);
        } else {
          return response.results || [];
        }
      } catch (error) {
        console.error("Error fetching movies by genre:", error);
        return [];
      }
    };

    const fetchMoviesForAllGenres = async () => {
      try {
        const actionMovies = await fetchMoviesByGenre(10749);
        const romanceMovies = await fetchMoviesByGenre(28);
        const comedyMovies = await fetchMoviesByGenre(35);
        const horrorMovies = await fetchMoviesByGenre(27);
        const dramaMovies = await fetchMoviesByGenre(18);

        setOtherGenresMovies([
          romanceMovies,
          actionMovies,
          comedyMovies,
          horrorMovies,
          dramaMovies,
        ]);
      } catch (error) {
        console.error("Error fetching movies for all genres:", error);
      }
    };

    fetchMoviesForAllGenres();

    const fetchGenres = async () => {
      axios
        .get<{ genres: IGenre[] }>(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${Environment.API_KEY}`
        )
        .then((response) => {
          const genres = response.data.genres.reduce((acc, genre) => {
            acc[genre.id] = genre.name;
            return acc;
          }, {} as { [key: number]: string });
          setGenreMap(genres);
          console.log(genres);
        });
    };
    fetchGenres();
  }, []);

  const genreNames = [
    "Top-Rated",
    "Action",
    "Romance",
    "Comedy",
    "Horror",
    "Drama",
  ];

  return (
    <div className="flex flex-col justify-center items-center max-w-lg m-15">
      <Carousel className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl mb-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl font-bold">
          {genreNames[0]}
        </h1>
        <CarouselContent className="p-6 flex gap-2 ">
          {Array.from({ length: movie.length }).map((_, index) => (
            <Dialog>
              <DialogTrigger asChild>
                <CarouselItem
                  key={index}
                  className="pl-1 basis-4/12 sm:basis-3/12 md:basis-3/12 lg:basis-2/12"
                >
                  <div className="">
                    <Card className="rounded-lg shadow-lg hover:shadow hover:dark:shadow-slate-800 max-h-90 scale-100 hover:scale-110 transition-all cursor-pointer">
                      <CardHeader className="flex flex-col p-0">
                        {movie && (
                          <img
                            className="h-full rounded-lg md:rounded"
                            src={`https://image.tmdb.org/t/p/w200${movie[index].poster_path}`}
                            alt="foto"
                          />
                        )}
                      </CardHeader>
                      <CardContent className="max-h-20 p-1 ml-1 hidden md:flex">
                        {movie[index]?.title && (
                          <span className="text-md scroll-m-10 p-0 font-semibold tracking-tight lg:text-lg truncate">
                            {movie[index].title}
                          </span>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              </DialogTrigger>

              <DialogContent className=" h-4/6 sm:h-3/5 md:h-3/5 lg:h-4/5 flex flex-col p-2 rounded-lg overflow-auto bg-slate-200 border-none dark:bg-slate-800 dark:text-slate-100">
                <DialogHeader className="flex flex-col w-full mt-1">
                  {movie[index] && (
                    <div className="absolute inset-0 h-60 sm:h-72">
                      <img
                        className="w-full h-full object-cover rounded-t brightness-50"
                        src={`https://image.tmdb.org/t/p/w500${movie[index].backdrop_path}`}
                        alt="Background"
                      />
                    </div>
                  )}
                  {movie[index] && (
                    <div className="h-60 mt-5">
                      <img
                        className="relative ml-4 z-10 rounded-md w-5/12 h-5/6 shadow-md sm:w-2/6 sm:h-full mt-16"
                        src={`https://image.tmdb.org/t/p/w500${movie[index].poster_path}`}
                        alt="foto"
                      />
                    </div>
                  )}
                  <DialogDescription className="text-left mb-0 mx-2 pb-0 sm:text-lg">
                    <div className="flex flex-col justify-start items-start p-0 gap-2 mt-12 sm:mt-20">
                      {movie[index]?.title && (
                        <h1 className="font-bold text-black dark:text-slate-200 text-lg mb-3">
                          {movie[index].title}
                        </h1>
                      )}

                      {movie[index]?.overview && (
                        <span className="text-black dark:text-slate-200 w-full italic ">
                          <span className="font-bold text-black dark:text-slate-200">Sinopse:</span>{" "}
                          {movie[index].overview}
                        </span>
                      )}
                      {movie[index]?.vote_average && (
                        <span className="text-black dark:text-slate-200 lg:text-lg w-full italic ">
                          <span className="font-bold">Rating:</span>{" "}
                          {movie[index].vote_average}
                        </span>
                      )}
                      {movie[index]?.genre_ids && (
                        <div>
                          <span className="font-bold text-black dark:text-slate-200 lg:text-lg w-full italic">
                            Genres:
                          </span>{" "}
                          {movie[index].genre_ids.map((genreId, genreIndex) => (
                            <span
                              key={genreIndex}
                              className="text-black dark:text-slate-200 lg:text-lg w-full italic"
                            >
                              {genreIndex > 0 && ", "} {genreMap[genreId]}
                            </span>
                          ))}
                        </div>
                      )}
                      {movie[index]?.release_date && (
                        <span className="text-black dark:text-slate-200 lg:text-lg w-full italic">
                          <span className="font-bold">Release:</span>{" "}
                          {movie[index].release_date}
                        </span>
                      )}
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Other Genres Movies Carousels */}
      {otherGenresMovies.map((movies, genreIndex) => (
        <Carousel
          key={genreIndex}
          className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl mb-10"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl font-bold">
            {genreNames[genreIndex + 1]}
          </h1>
          <CarouselContent className="p-6 flex gap-2">
            {movies.map((movie, movieIndex) => (
              <Dialog key={movieIndex}>
                <DialogTrigger asChild>
                  <CarouselItem
                    key={movieIndex}
                    className="pl-1 basis-4/12 sm:basis-3/12 md:basis-3/12 lg:basis-2/12"
                  >
                    <div className="">
                      <Card className=" shadow-md max-h-90 scale-100 hover:scale-110 transition-all cursor-pointer">
                        <CardHeader className="flex flex-col p-0 rounded-lg h-full">
                          {movie && (
                            <img
                              className="h-full rounded-lg md:rounded"
                              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                              alt="foto"
                            />
                          )}
                        </CardHeader>
                        <CardContent className="max-h-20 p-1 ml-1 hidden md:flex">
                          {movie?.title && (
                            <span className="text-md scroll-m-10 p-0 font-semibold tracking-tight lg:text-lg truncate">
                              {movie.title}
                            </span>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                </DialogTrigger>

                <DialogContent className=" h-4/6 sm:h-3/5 md:h-3/5 lg:h-4/5  flex flex-col p-2 rounded-lg overflow-auto bg-slate-200 border-none dark:bg-slate-800 dark:text-slate-100">
                  <DialogHeader className="flex flex-col w-full mt-1">
                  {movie && (
                    <div className="absolute inset-0 h-60 sm:h-72">
                      <img
                        className="w-full h-full object-cover rounded-t brightness-50"
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                        alt="Background"
                      />
                    </div>
                  )}
                  {movie && (
                    <div className="h-60 mt-5">
                      <img
                        className="relative ml-4 z-10 rounded-md w-5/12 h-5/6 shadow-md sm:w-2/6 sm:h-full mt-16"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt="foto"
                      />
                    </div>
                  )}
                    <DialogDescription className="text-left mb-0 mx-2 pb-0 sm:text-lg">
                      <div className="flex flex-col justify-start items-start p-0 gap-2 mt-12 sm:mt-20">
                        {movie?.title && (
                          <h1 className="font-bold text-black dark:text-slate-200 text-lg mb-3">
                            {movie.title}
                          </h1>
                        )}

                        {movie?.overview && (
                          <span className="text-base text-black dark:text-slate-200 lg:text-lg w-full italic ">
                            <span className="font-bold">Sinopse:</span>{" "}
                            {movie.overview}
                          </span>
                        )}
                        {movie?.genre_ids && (
                          <div>
                            <span className="text-base font-bold text-black dark:text-slate-200 lg:text-lg w-full italic">
                              Genres:
                            </span>{" "}
                            {movie.genre_ids.map((genreId, genreIndex) => (
                              <span
                                key={genreIndex}
                                className="text-base text-black dark:text-slate-200 lg:text-lg w-full italic"
                              >
                                {genreIndex > 0 && ", "} {genreMap[genreId]}
                              </span>
                            ))}
                          </div>
                        )}
                        {movie?.release_date && (
                          <span className="text-base text-black dark:text-slate-200 lg:text-lg w-full italic ">
                            <span className="font-bold">Release:</span>{" "}
                            {movie.release_date}
                          </span>
                        )}
                        {movie?.vote_average && (
                          <span className="text-base text-black dark:text-slate-200 lg:text-lg w-full italic ">
                            <span className="font-bold">Rating:</span>{" "}
                            {movie.vote_average}
                          </span>
                        )}
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ))}
    </div>
  );
};
