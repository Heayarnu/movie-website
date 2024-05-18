'use client';

import { ThemeToggler } from './ThemeToggler';
import SignOutBtn from './SignOutBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeftLong,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import SearchInput from './SearchInput';
import { useState } from 'react';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';

const NavBar = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  return (
    <nav className="flex flex-row my-auto">
      {/* SearhInput */}
      <div
        className={`flex flex-col ${
          showSearch
            ? 'bg-white w-screen top-0 left-0 absolute dark:bg-black z-50'
            : ''
        }`}
      >
        {showSearch ? (
          // cancel search button
          <div className="flex justify-start items-start">
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
              className="ml-4 mr-0.5 text-lg md:text-2xl text-white lg:text-3xl"
            />{' '}
          </button>
        )}

        {showSearch && <SearchInput showSearch />}
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <button className="w-7 h-7 md:w-10 md:h-10 mt-[6px] md:mt-[9px] lg:mt-4 md:mr-5">
            <Image
              src="/profile.png"
              alt="profile icon"
              width={100}
              height={100}
              className="border rounded-md"
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
            className="text-2xl font-semibold flex hover:bg-inherit hover:scale-105 justify-start px-0"
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
