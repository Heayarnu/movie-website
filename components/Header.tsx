'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import GenreDropdown from './GenreDropdown';
import NavBar from './NavBar';
import { Button } from './ui/button';

const Header = ({ profile }: any) => {
  const [showBackground, setShowBackground] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/Home';
  const bgColor = pathname === '/Home' ? 'bg-transparent ' : '';

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
        <Link
          href="/Home"
          className="-ml-6 scale-75 md:-ml-0 md:mr-10 md:scale-100"
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
              className="h-auto w-auto cursor-pointer"
            />
          </div>
        </Link>

        <GenreDropdown showBackground={showBackground} isHome={isHome} />

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

      <NavBar
        profile={profile}
        showBackground={showBackground}
        isHome={isHome}
      />
    </header>
  );
};

export default Header;
