import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MovieServices } from "@/shared/services/api/movie/movieAPI";
import { useEffect, useState } from "react";

interface IMovie {
  [x: string]: any;
  original_title: string;
  img: string;
  id?: number;
}

export const CarouselCardMovie: React.FC = () => {
  const [movie, setMovie] = useState<IMovie[]>([]);
  const [filteredMovie, setFilteredMovie] = useState<IMovie[]>([]);
  const [otherGenresMovies, setOtherGenresMovies] = useState<IMovie[][]>([]);

  useEffect(() => {
    MovieServices.getByRated().then((response) => {
      if (response instanceof Error) {
        alert(response.message);
      } else {
        const movieArray = response.results || [];
        setMovie(movieArray);
        setFilteredMovie(movieArray);
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
        const dramaMovies = await fetchMoviesByGenre(18)


  
        setOtherGenresMovies([romanceMovies, actionMovies, comedyMovies, horrorMovies, dramaMovies]);
      } catch (error) {
        console.error("Error fetching movies for all genres:", error);
      }
    };
  
    fetchMoviesForAllGenres();
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
    <div className="flex flex-col justify-center items-center max-w-md m-15">
      <Carousel className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-6xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl font-bold">{genreNames[0]}</h1>
        <CarouselContent className="p-2 flex gap-2 ">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 basis-4/12 sm:basis-3/12 md:basis-3/12 lg:basis-2/12"
            >
              <div className="">
                <Card className="rounded-lg shadow-md max-h-90 scale-100 hover:scale-105 transition-all cursor-pointer">
                  <CardHeader className="flex flex-col p-2">
                    {movie[index] && (
                      <img
                        className="h-6/6 rounded-lg"
                        src={`https://image.tmdb.org/t/p/w200${movie[index].poster_path}`}
                        alt="foto"
                      />
                    )}
                  </CardHeader>
                  <CardContent className="max-h-20 flex p-1 ml-1">
                    {movie[index]?.original_title && (
                      <span className="text-md scroll-m-10 p-1 font-semibold tracking-tight lg:text-lg truncate">
                        {movie[index].original_title}
                      </span>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Other Genres Movies Carousels */}
      {otherGenresMovies.map((movies, genreIndex) => (
        <Carousel key={genreIndex} className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-6xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl font-bold">{genreNames[genreIndex + 1]}</h1>
          <CarouselContent className="p-2 flex gap-2">
            {movies.map((movie, movieIndex) => (
              <CarouselItem
                key={movieIndex}
                className="pl-1 basis-4/12 sm:basis-3/12 md:basis-3/12 lg:basis-2/12"
              >
                <div className="">
                  <Card className="rounded-lg shadow-md max-h-90 scale-100 hover:scale-105 transition-all cursor-pointer">
                    <CardHeader className="flex flex-col p-2">
                      {movie && (
                        <img
                          className="h-6/6 rounded-lg"
                          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                          alt="foto"
                        />
                      )}
                    </CardHeader>
                    <CardContent className="max-h-20 flex p-1 ml-1">
                      {movie?.original_title && (
                        <span className="text-md scroll-m-10 p-1 font-semibold tracking-tight lg:text-lg truncate">
                          {movie.original_title}
                        </span>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ))}
    </div>
  );
};
