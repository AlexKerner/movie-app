import { useEffect, useState } from "react";
import { MovieServices } from "../../shared/services/api/movie/movieAPI";
import { CarouselCardMovie } from "../../shared/components/card/CardMovie";
import { Nav } from "@/shared/components/nav/Nav";

interface IMovie {
  title: string;
  overview: string;
  poster_path: string;
}

export const HomePage = () => {




  return (
    <div className="m-0 p-0 bg-zinc-100 overflow-hidden">
      <Nav />
      <div className=" flex items-center justify-center">
        <div className=" min-h-40">
          <CarouselCardMovie />
        </div>
      </div>
    </div>
  );
};
