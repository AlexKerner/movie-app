import { Input } from "@/components/ui/input"



export const Nav = () => {

  return (

    <header className="w-screen p-5 mb-10 flex items-center justify-between shadow-md sm:p-8 md:p-10 lg:p-10 bg-white">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl lg:text-4xl">
            MOVIE-APP
          </h1>
          <input type="text" placeholder='Search...' className="p-1 pl-2 w-32 sm:py-2 sm:px-3 sm:w-40 md:py-2 md:px-3 md:w-44 lg:py-3 lg:px-4 lg:w-52 border border-zinc-800 rounded-md bg-transparent"/>
    </header>
  )

}