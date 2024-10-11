'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NavBarProps } from '@/types/index';
import {
  faArrowLeftLong,
  faMagnifyingGlass,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChevronDownIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileManager from './ProfileManager';
import SearchInput from './SearchInput';
import SignOutBtn from './SignOutBtn';
import { Button } from './ui/button';

const NavBar = ({
  showBackground,
  isHome,
  profile,
  profiles,
  setProfiles,
  isLoading,
}: NavBarProps) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const router = useRouter();

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const searchButton = (
    <button
      className="m-2 hidden border-none text-black hover:no-underline focus:border-none focus:outline-none focus:ring-0 md:m-4 lg:m-5 xl:flex"
      onClick={() => setShowSearch(true)}
    >
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className={`ml-4 mr-0.5 text-lg md:text-2xl lg:text-3xl ${
          isHome || showBackground ? 'text-white' : 'text-black dark:text-white'
        }`}
      />
    </button>
  );

  const mobileSearchButton = (
    <button
      className="m-2 text-black md:m-4 lg:m-5"
      onClick={() => setShowSearch(true)}
    >
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className={`ml-4 mr-0.5 text-lg md:text-2xl lg:text-3xl ${
          isHome || showBackground ? 'text-white' : 'text-black dark:text-white'
        }`}
      />
    </button>
  );

  const profileButton = (
    <button className="m-0 -mr-4">
      <div className="flex items-center">
        <Image
          src={profile.imageSrc}
          alt="profile icon"
          width={200}
          height={100}
          className="h-7 w-7 rounded-sm object-cover md:h-10 md:w-10"
        />
        <ChevronDownIcon
          className={`m-0 flex h-5 w-5 font-bold lg:h-7 lg:w-7 ${
            isHome || showBackground
              ? 'text-white'
              : 'text-black dark:text-white'
          }`}
        />
      </div>
    </button>
  );

  return (
    <nav className="my-auto flex flex-row">
      {showSearch ? (
        <div className="mx-3 mt-2 flex">
          <Button
            variant="outline"
            onClick={() => {
              setShowSearch(false);
            }}
            className="m-2 h-10 w-10 rounded-full border p-4 text-2xl"
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>
          <SearchInput
            setIsSheetOpen={setIsSheetOpen}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
          />
        </div>
      ) : (
        searchButton
      )}

      <div className="flex xl:hidden">
        <Sheet
          open={isSheetOpen}
          onOpenChange={(isOpen) => {
            setIsSheetOpen(isOpen);
            setShowSearch(isOpen);
          }}
        >
          <SheetTrigger asChild>{mobileSearchButton}</SheetTrigger>

          <SheetContent
            side="top"
            className="flex flex-col p-2 sm:p-5 lg:p-7 xl:p-10"
          >
            <SheetHeader>
              <SheetClose asChild>
                <div className="flex items-start justify-start">
                  <button
                    type="submit"
                    className="mb-2 p-2 text-2xl sm:text-4xl"
                  >
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                  </button>
                </div>
              </SheetClose>

              <SearchInput
                showSearch={showSearch}
                setShowSearch={setShowSearch}
                setIsSheetOpen={setIsSheetOpen}
              />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <SheetTrigger asChild>{profileButton}</SheetTrigger>
        <SheetContent className="dark:bg-stone-500">
          <SheetHeader className="mb-5">
            <ProfileManager
              profile={profile}
              profiles={profiles}
              setProfiles={setProfiles}
              isLoading={isLoading}
              setIsProfileOpen={setIsProfileOpen}
            />
          </SheetHeader>

          <SheetClose asChild>
            <button
              className="m-0 flex items-center justify-start text-xl font-semibold sm:text-2xl"
              onClick={() => {
                router.push('/MyAccount');
              }}
            >
              <FontAwesomeIcon icon={faUser} className="mr-5" />
              My Account
            </button>
          </SheetClose>

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
