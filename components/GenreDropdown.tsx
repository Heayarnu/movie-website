import { ChevronDownIcon, ChevronsUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from './ui/dropdown-menu';
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
        <Button className="text-black dark:text-white flex justify-center items-center border rounded-3xl px-5 bg-inherit hover:bg-zinc-500">
          Categories <ChevronDownIcon className="ml-2 mt-1" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="top"
        className="h-screen bg-black/10 flex items-center justify-center"
      >
        <ScrollArea className="h-[80vh]">
          <SheetHeader>
            <SheetClose asChild>
              <SheetTitle className="text-white  text-2xl flex justify-center items-center cursor-pointer">
                Home
              </SheetTitle>
            </SheetClose>
          </SheetHeader>

          {data.genres.map((genre) => (
            <div key={genre.id}>
              <button className="w-full text-white text-lg flex items-center justify-center space-y-2 mt-4">
                <Link href={`/genre/${genre.id}?genre=${genre.name}`}>
                  {genre.name}
                </Link>
              </button>
            </div>
          ))}
        </ScrollArea>
        <SheetFooter className="w-16 h-16 bg-white absolute bottom-5 justify-center items-center rounded-full">
          <SheetClose asChild>
            <FontAwesomeIcon icon={faX} className="text-black text-3xl" />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default GenreDropdown;
