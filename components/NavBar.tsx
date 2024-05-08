import { ThemeToggler } from './ThemeToggler';
import SearchInput from './SearchInput';
import GenreDropdown from './GenreDropdown';
import { Button } from './ui/button';
import { signOut } from '@/auth';

const NavBar = () => {
  return (
    <nav className="flex space-x-2">
      {/* GenreDropdown */}
      <GenreDropdown />

      {/* SearhInput */}
      <SearchInput />

      {/* ThemeToggler */}
      <ThemeToggler />

      <form
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <Button
          variant="ghost"
          type="submit"
          className="md:bg-[#CC0000]
      hover:bg-[#990000] hover:text-white md:text-white"
        >
          Sign Out
        </Button>
      </form>
    </nav>
  );
};

export default NavBar;
