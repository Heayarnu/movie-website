'use client';

import { fetchMovies } from '@/utils';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChevronDownIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Key, useEffect, useState } from 'react';
import { Button } from './ui/button';
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

interface GenreDropdownProps {
  showBackground: boolean;
  isHome: boolean;
}

const GenreDropdown = ({ showBackground, isHome }: GenreDropdownProps) => {
  const [genres, setGenres] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await fetchMovies();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleNavigation = (id: string, name: string) => {
    router.push(`/genre/${id}?genre=${name}`);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className={`mt-1 flex h-auto items-center justify-center rounded-3xl border bg-transparent px-2 py-1 text-black hover:bg-zinc-600 md:px-3 lg:text-lg ${
            isHome || showBackground
              ? 'border-white text-white'
              : 'border-black  text-black dark:border-white dark:text-white'
          }`}
        >
          Categories <ChevronDownIcon className="ml-2 mt-1" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="top"
        className="flex h-screen items-center justify-center bg-black/10"
      >
        <ScrollArea className="h-[70vh]">
          <SheetHeader>
            <SheetClose asChild>
              <SheetTitle className="flex cursor-pointer items-center justify-center text-2xl text-white md:text-3xl lg:text-4xl">
                Home
              </SheetTitle>
            </SheetClose>
          </SheetHeader>

          {genres.map((genre: { id: Key; name: string }) => (
            <div key={genre.id}>
              <button className="mt-4 flex w-full items-center justify-center text-lg text-white md:text-2xl lg:mt-6 lg:text-3xl">
                <SheetClose asChild>
                  <button
                    key={genre.id}
                    onClick={() =>
                      handleNavigation(genre.id.toString(), genre.name)
                    }
                  >
                    {genre.name}
                  </button>
                </SheetClose>
              </button>
            </div>
          ))}
        </ScrollArea>

        <SheetFooter className="absolute bottom-5">
          <SheetClose asChild>
            <Button className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <FontAwesomeIcon icon={faX} className="text-3xl text-black" />
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default GenreDropdown;
