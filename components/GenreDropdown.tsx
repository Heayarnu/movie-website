import { ChevronsUpDown } from 'lucide-react';
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
async function GenreDropdown() {
  const data = await fetchMovies();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-black dark:text-white flex justify-center items-center border rounded-xl p-2 bg-inherit">
        Genre <ChevronsUpDown className="ml-2 h-5 mt-1" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Select a Genre</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <ScrollArea className="h-96">
          {data.genres.map((genre) => (
            <DropdownMenuItem key={genre.id} className='cursor-pointer'>
              <Link className='w-full' href={`/genre/${genre.id}?genre=${genre.name}`}>
                {genre.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default GenreDropdown;
