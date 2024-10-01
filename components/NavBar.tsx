'use client';

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NavBarProps } from '@/types/index';
import {
  faArrowLeftLong,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChevronDownIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ProfileManager from './ProfileManager';
import SearchInput from './SearchInput';
import SignOutBtn from './SignOutBtn';

const NavBar = ({ showBackground, isHome, profile }: NavBarProps) => {
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
            className="m-2 text-black md:m-4 lg:m-5 "
            onClick={() => setShowSearch(true)}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={`ml-4 mr-0.5 text-lg md:text-2xl lg:text-3xl ${
                isHome || showBackground
                  ? 'text-white'
                  : 'text-black dark:text-white'
              }`}
            />{' '}
          </button>
        )}

        {showSearch && (
          <SearchInput showSearch={showSearch} setShowSearch={setShowSearch} />
        )}
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <button className="m-0 -mr-2">
            <div className="flex items-center">
              <Image
                src={profile.imageSrc}
                alt="profile icon"
                width={200}
                height={100}
                className="h-7 w-7 rounded-sm object-cover md:h-10 md:w-10"
              />
              <ChevronDownIcon
                className={`m-0 hidden h-5 w-5 font-bold sm:flex lg:h-7 lg:w-7 ${isHome || showBackground ? 'text-white' : 'text-black dark:text-white'}`}
              />
            </div>
          </button>
        </SheetTrigger>

        <SheetContent className="dark:bg-stone-500">
          <SheetHeader className="mb-5">
            {/* Profile management and Theme toggler */}
            <ProfileManager profile={profile} />
          </SheetHeader>

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
