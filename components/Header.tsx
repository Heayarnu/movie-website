import Image from 'next/image';
import Link from 'next/link';
import NavBar from './NavBar';

const Header = () => {
  return (
    <header className="flex flex-row justify-between items-center fixed w-full z-50 bg-gradient-to-t backdrop-blur- from-gray-200/0 via-gray-900/25 to-gray-900 px-5 py-2 top-0">
      <Link href="/" className="mr-10">
        <Image
          src="https://links.papareact.com/a943ae"
          alt="Disney Logo"
          width={120}
          height={100}
          className="cursor-pointer dark:invert"
        />
      </Link>

      <NavBar />
    </header>
  );
};

export default Header;
