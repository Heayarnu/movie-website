'use client';

import Image from 'next/image';
import Link from 'next/link';
import NavBar from './NavBar';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Header = () => {
  const [showBackground, setShowBackground] = useState<boolean>(false);

  const pathname = usePathname();

  const bgColor =
    pathname === '/Home'
      ? 'bg-transparent '
      : 'bg-gradient-to-b from-black/45 via-black/20 to-transparent w-full';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed flex flex-row z-30 justify-between items-center w-full px-5 py-2 ${
        showBackground ? 'bg-zinc-900/90 dark:bg-white/50' : bgColor
      }`}
    >
      <div className="flex flex-row justify-between items-center">
        <Link
          href="/Home"
          className="md:mr-10 scale-75 -ml-6 md:scale-100 md:-ml-0"
        >
          <div className="block md:hidden">
            <Image
              src="/mobile-logo.png"
              alt="netflix Logo"
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </div>

          <div className="hidden md:block">
            <Image
              src="/logo.png"
              alt="netflix Logo"
              width={120}
              height={100}
              className="cursor-pointer w-auto h-auto"
            />
          </div>
        </Link>

        <div className="md:hidden bg-inherit">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-white my-3 text-xl">
              Browse
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-semibold bg-white text-black">
              <DropdownMenuItem>Tv Shows</DropdownMenuItem>
              <DropdownMenuItem>Movies</DropdownMenuItem>
              <DropdownMenuItem>My List</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          variant="ghost"
          className="hidden md:block text-xl lg:text-2xl text-white font-semibold my-3 -ml-3 hover:bg-stone-600"
        >
          Tv Shows
        </Button>

        <Button
          variant="ghost"
          className="hidden md:block text-xl lg:text-2xl text-white font-semibold my-3 hover:bg-stone-600"
        >
          Movies
        </Button>

        <Button
          variant="ghost"
          className="hidden md:block text-xl lg:text-2xl text-white font-semibold my-3 hover:bg-stone-600"
        >
          My List
        </Button>
      </div>

      <NavBar />
    </header>
  );
};

export default Header;
