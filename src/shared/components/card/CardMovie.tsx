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
  title: string;
  img: string;
  id?: number;
}

export const CarouselCardMovie: React.FC<IMovie> = ({ title, img }) => {
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
      <Carousel className="max-w-4xl">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-2/12 lg:basis-3/12"
            >
              <div className="p-1">
                <Card className="rounded-lg shadow-md">
                  <CardHeader className="flex flex-col ">
                    <img className="h-4/4 rounded-lg" src={img} alt="foto" />
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-xl font-bold">{title}</h1>
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