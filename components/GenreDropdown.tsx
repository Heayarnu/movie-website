'use client';

import { fetchMovies } from '@/utils';
import { faTag, faX } from '@fortawesome/free-solid-svg-icons';
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
  setIsSheetOpen: (arg0: boolean) => void;
  isSheetOpen?: boolean;
}

const GenreDropdown = ({
  showBackground,
  isHome,
  isSheetOpen,
  setIsSheetOpen,
}: GenreDropdownProps) => {
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
          className={`mt-1 flex h-auto flex-row items-center justify-center rounded-3xl bg-transparent p-0 text-2xl text-black hover:bg-transparent sm:border sm:px-2 sm:py-1 sm:text-base   md:px-3 lg:text-lg ${
            isSheetOpen
              ? 'text-black dark:text-white'
              : isHome || showBackground
                ? 'border-white text-white sm:hover:bg-zinc-600'
                : 'border-black text-black dark:border-white dark:text-white sm:hover:bg-slate-200 sm:dark:hover:bg-zinc-600'
          }`}
        >
          <div className="flex sm:hidden">
            <FontAwesomeIcon icon={faTag} className="mr-5  pl-0 pt-2 " />
          </div>
          <span>Categories</span>
          <div className="hidden sm:flex">
            <ChevronDownIcon className="ml-2 mt-0.5" />
          </div>
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
                    onClick={() => {
                      handleNavigation(genre.id.toString(), genre.name);
                      setIsSheetOpen(false);
                    }}
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
