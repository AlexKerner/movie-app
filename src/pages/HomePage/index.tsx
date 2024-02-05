import { Nav } from "@/shared/components/nav/Nav";
import { CarouselCardMovie } from "../../shared/components/card/CardMovie";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { Environment } from "@/shared/environments";
import { CardSearch } from "@/shared/components/cardSearch/CardSearch";

interface Movie {
  [x: string]: any;
  id: number;
  poster_path: string;
  title: string;
}

export const HomePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [genreMap, setGenreMap] = useState<{ [key: number]: string }>({});

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);

    try {
      const response = await fetchSearchMovie(value);
      setSearchResults(response.data.results);
      console.log(response);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  const fetchSearchMovie = async (query: string) => {
    try {
      return await axios.get(
        `https://api.themoviedb.org/3/search/movie?include_adult=false&api_key=${Environment.API_KEY}&query=${query}`
      );
    } catch (error) {
      throw new Error("Erro ao buscar filmes");
    }
  };
  const fetchGenres = async () => {
    axios
      .get<{ genres: IGenre[] }>(
        `https://api.themoviedb.org/3/genre/movie/list?include_adult=false&api_key=${Environment.API_KEY}`
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

  return (
    <div className="m-0 p-0 bg-zinc-100 overflow-hidden dark:bg-slate-900">
     <Nav handleSearchChange={handleSearch} value={searchValue} />
    {searchValue.trim() !== '' ? (
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 items-center p-5">
          {searchResults.map((movie, movieIndex) => (
            <Dialog key={movieIndex}>
              <DialogTrigger>
                <CardSearch
                  key={movieIndex}
                  img={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  title={movie.title}
                />
              </DialogTrigger>
              <DialogContent className="h-4/6 sm:h-3/5 md:h-3/5 lg:h-[75%] w-5/6 flex flex-col p-2 rounded-lg overflow-auto bg-slate-200 border-none dark:bg-slate-800 dark:text-slate-100" key={movieIndex}>
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
        </div>
      </div>
    ) : (
      <div className="min-h-40 flex justify-center items-center">
        <CarouselCardMovie />
      </div>
    )} 
      
    </div>
  );
};
