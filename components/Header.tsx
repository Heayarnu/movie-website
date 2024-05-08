import Image from 'next/image';
import Link from 'next/link';
import NavBar from './NavBar';

const Header = () => {
  return (
    <header className="flex flex-row justify-between items-center fixed w-full z-50 dark:bg-black/10 backdrop-blur-sm bg-white  px-5 py-2 top-0">
      <Link href="/Home" className="mr-10">
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
