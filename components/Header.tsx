'use client';

import { Profile } from '@/types/index';
import { faBars, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import GenreDropdown from './GenreDropdown';
import NavBar from './NavBar';
import { useFetchProfiles } from './Profilehandler';
import { Button } from './ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from './ui/sheet';

interface HeaderProps {
  profile: Profile;
}

const Header = ({ profile }: HeaderProps) => {
  const [showBackground, setShowBackground] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/Home';
  const bgColor = pathname === '/Home' ? 'bg-transparent ' : '';

  const [profiles, setProfiles] = useState<Profile[]>([]);
  useState<string | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useFetchProfiles(setProfiles, setError, setIsLoading);

  const filteredProfiles = profiles.filter((p) => p.name !== profile.name);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 20) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`fixed z-30 flex w-full flex-row items-center justify-between px-5 py-2 transition-transform duration-300 ${
        showBackground ? 'bg-zinc-900/90 text-white hover:text-white ' : bgColor
      } ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="block sm:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className={`m-0 mr-5 p-0 hover:bg-transparent ${
                  isHome || showBackground
                    ? 'text-white hover:text-white'
                    : 'hover:text-black dark:hover:text-white'
                }`}
              >
                <FontAwesomeIcon icon={faBars} className="text-2xl" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pl-5">
              <SheetHeader className="mb-5 ">
                <h1 className="text-left text-2xl ">Browse</h1>
              </SheetHeader>

              <GenreDropdown
                showBackground={showBackground}
                isHome={isHome}
                setIsSheetOpen={setIsSheetOpen}
                isSheetOpen={isSheetOpen}
              />

              <SheetClose asChild>
                <Button
                  variant="ghost"
                  type="submit"
                  className={`my-3 p-0 text-2xl font-semibold hover:bg-transparent ${
                    isSheetOpen
                      ? 'text-black dark:text-white'
                      : isHome || showBackground
                        ? 'text-white hover:text-white'
                        : 'hover:text-black dark:hover:text-white'
                  }`}
                  onClick={() => {
                    router.push('/MyList');
                  }}
                >
                  <FontAwesomeIcon icon={faClipboardList} className="mr-5" />
                  My List
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>

        <Link
          href="/Home"
          className="-ml-6 scale-75 md:-ml-0 md:mr-10 md:scale-100"
        >
          <Image
            src="/logo.png"
            alt="netflix Logo"
            width={120}
            height={100}
            className="h-auto w-auto cursor-pointer"
          />
        </Link>

        <div className="hidden sm:flex sm:flex-row sm:items-center sm:justify-between">
          <GenreDropdown
            showBackground={showBackground}
            isHome={isHome}
            setIsSheetOpen={setIsSheetOpen}
          />
          <Button
            variant="ghost"
            className={`my-3 text-xl font-semibold ${
              isHome || showBackground
                ? 'text-white hover:text-white'
                : 'hover:text-black dark:hover:text-white'
            } bg-transparent hover:scale-110 hover:bg-transparent lg:text-2xl`}
            onClick={() => {
              router.push('/MyList');
            }}
          >
            My List
          </Button>
        </div>
      </div>

      <NavBar
        profile={profile}
        showBackground={showBackground}
        isHome={isHome}
        profiles={filteredProfiles}
        setProfiles={setProfiles}
        isLoading={isLoading}
      />
    </header>
  );
};

export default Header;
