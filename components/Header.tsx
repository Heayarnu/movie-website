import Image from 'next/image';
import Link from 'next/link';
import NavBar from './NavBar';

const Header = () => {
  return (
    <header className="flex flex-row justify-between  items-center fixed w-full z-50 bg-white dark:bg-black px-5 py-2 top-0">
      <Link href="/Home" className="mr-10 scale-75 -ml-6 md:scale-100 md:-ml-0">
        <Image
          src="/logo.png"
          alt="netflix Logo"
          width={120}
          height={100}
          className="cursor-pointer"
        />
      </Link>

      <NavBar />
    </header>
  );
};

export default Header;
