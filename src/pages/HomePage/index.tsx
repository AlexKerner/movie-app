
import { Nav } from "@/shared/components/nav/Nav";
import { CarouselCardMovie } from "../../shared/components/card/CardMovie";


export const HomePage = () => {




  return (
    <div className="m-0 p-0 bg-zinc-100 overflow-hidden dark:bg-slate-900">
      <Nav />
      <div className=" flex items-center justify-center">
        <div className=" min-h-40">
          <CarouselCardMovie />
        </div>
      </div>
    </div>
  );
};
