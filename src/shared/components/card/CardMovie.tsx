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
  }, []);


  return (
    <div>
      <Carousel className="max-w-4xl p-4">
        <CarouselContent className="p-2 flex gap-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-3/12 lg:basis-2/12"
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
                      <span className="text-md scroll-m-10 font-bold tracking-tight lg:text-lg truncate">{movie[index].original_title}</span>
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
    </div>
  );
};
