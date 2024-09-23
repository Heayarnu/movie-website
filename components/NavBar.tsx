'use client';

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  faArrowLeftLong,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useState } from 'react';
import SearchInput from './SearchInput';
import SignOutBtn from './SignOutBtn';
import { ThemeToggler } from './ThemeToggler';
import { Button } from './ui/button';

const NavBar = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  return (
    <nav className="my-auto flex flex-row">
      {/* SearhInput */}
      <div
        className={`flex flex-col ${
          showSearch
            ? 'absolute left-0 top-0 z-50 w-screen bg-white dark:bg-black'
            : ''
        }`}
      >
        {showSearch ? (
          // cancel search button
          <div className="flex items-start justify-start">
            <button className="m-2" onClick={() => setShowSearch(false)}>
              <FontAwesomeIcon icon={faArrowLeftLong} className="m-2" />{' '}
            </button>
          </div>
        ) : (
          //  Search button
          <button
            className="m-2 md:m-4 lg:m-5"
            onClick={() => setShowSearch(true)}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="ml-4 mr-0.5 text-lg text-white md:text-2xl lg:text-3xl"
            />{' '}
          </button>
        )}

        {showSearch && (
          <SearchInput showSearch={showSearch} setShowSearch={setShowSearch} />
        )}
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <button className="mt-[6px] h-7 w-7 md:mr-5 md:mt-[9px] md:h-10 md:w-10 lg:mt-4">
            <Image
              src="/profile.png"
              alt="profile icon"
              width={100}
              height={100}
              className="rounded-md border"
            />
          </button>
        </SheetTrigger>

        <SheetContent className="dark:bg-stone-500">
          <SheetHeader className="mb-5">
            <Image
              src="/profile.png"
              alt="profile icon"
              width={50}
              height={50}
            />
          </SheetHeader>

          <Button
            variant="ghost"
            className="flex justify-start px-0 text-2xl font-semibold hover:scale-105 hover:bg-inherit"
          >
            My List
          </Button>

          {/* ThemeToggler */}
          <div className="my-5 flex flex-row ">
            <ThemeToggler />
          </div>

          <SheetFooter>
            <div className="absolute bottom-10 right-4">
              <SignOutBtn />
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default NavBar;
