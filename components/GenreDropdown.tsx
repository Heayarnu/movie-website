import { ChevronDownIcon } from 'lucide-react';
import { fetchMovies } from '@/utils';
import Link from 'next/link';
import { ScrollArea } from './ui/scroll-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

async function GenreDropdown() {
  const data = await fetchMovies();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="absolute mt-[60px] md:mt-[74px] mx-4 z-10 text-white flex justify-center h-8 md:h-auto items-center border lg:text-xl rounded-3xl px-2 md:px-5 bg-transparent hover:bg-zinc-600 bg-slate-500">
          Categories <ChevronDownIcon className="ml-2 mt-1" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="top"
        className="h-screen bg-black/10 flex items-center justify-center"
      >
        <ScrollArea className="h-[70vh]">
          <SheetHeader>
            <SheetClose asChild>
              <SheetTitle className="text-white  text-2xl md:text-3xl lg:text-4xl flex justify-center items-center cursor-pointer">
                Home
              </SheetTitle>
            </SheetClose>
          </SheetHeader>

          {data.genres.map((genre) => (
            <div key={genre.id}>
              <button className="w-full text-white text-lg md:text-2xl lg:text-3xl flex items-center justify-center mt-4 lg:mt-6">
                <SheetClose asChild>
                  <Link href={`/genre/${genre.id}?genre=${genre.name}`}>
                    {genre.name}
                  </Link>
                </SheetClose>
              </button>
            </div>
          ))}
        </ScrollArea>

        <SheetFooter className=" absolute bottom-5 ">
          <SheetClose asChild>
            <Button className="flex w-16 h-16 bg-white justify-center items-center rounded-full">
              <FontAwesomeIcon icon={faX} className="text-black text-3xl" />
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default GenreDropdown;
