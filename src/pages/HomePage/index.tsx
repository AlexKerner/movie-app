import { Nav } from "@/shared/components/nav/Nav";
import { CarouselCardMovie } from "../../shared/components/card/CardMovie";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { Environment } from "@/shared/environments";
import { CardSearch } from "@/shared/components/cardSearch/CardSearch";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

export const HomePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

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
        `https://api.themoviedb.org/3/search/movie?api_key=${Environment.API_KEY}&query=${query}`
      );
    } catch (error) {
      throw new Error("Erro ao buscar filmes");
    }
  };

  return (
    <div className="m-0 p-0 bg-zinc-100 overflow-hidden dark:bg-slate-900">
    <Nav handleSearchChange={handleSearch} value={searchValue} />
    {searchValue.trim() !== '' ? (
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 items-center p-5">
          {searchResults.map((movie, index) => (
            <CardSearch
              key={index}
              img={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              title={movie.title}
            />
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
