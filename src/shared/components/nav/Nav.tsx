import React, { ChangeEvent } from "react";
import { ModeToggle } from "../mode-toggle";

interface NavProps {
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number | readonly string[] | undefined
}

export const Nav: React.FC<NavProps> = ({handleSearchChange, value}) => {



  return (
    <header className="w-screen p-4 mb-10 flex items-center justify-center shadow-md md:p-8 bg-white dark:bg-slate-950">
      <div className="flex justify-between items-center max-w-[100%] sm:max-w-[75%] min-w-[100%] gap-2">
        <div>
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl lg:text-4xl">
        MOVIE-APP
      </h1>
      </div>
      
      <div className="flex items-center gap-1">
        <input
          type="text"
          placeholder="Search..."
          value={value}
          onChange={handleSearchChange}
          className="p-1 pl-2 w-32 sm:py-2 sm:px-3 sm:w-40 md:py-2 md:px-3 md:w-44 lg:py-3 lg:px-4 lg:w-52 border border-zinc-800 rounded-md bg-transparent"
        />
        <div>
          <ModeToggle />
        </div>
      </div>
      </div>
      
    </header>
  );
};
