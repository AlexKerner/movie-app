import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface IMovieSearch {
  img: string;
  title: string;
}

export const CardSearch: React.FC<IMovieSearch> = ({ img, title }) => {
  return (
    <div className="flex gap-0">


      <Card className="flex flex-col max-h-72 min-w-12 max-w-40 rounded-lg shadow-lg hover:shadow hover:dark:shadow-slate-800 max-h-90 scale-100 hover:scale-105 sm:scale-100 sm:hover:scale-110 transition-all cursor-pointer">
        <CardHeader className="flex flex-col p-0 min-h-[2rem] ">
          <img src={img} alt="" className="h-full rounded-lg md:rounded" />
        </CardHeader>
        <CardContent className="max-h-20 p-1 ml-1 hidden md:flex">
          <span className="text-md scroll-m-10 p-0 font-semibold tracking-tight lg:text-lg truncate">{title}</span>
        </CardContent>
      </Card>
    </div>
  );
};
