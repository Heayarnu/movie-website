import { ThemeToggler } from './ThemeToggler';
import SearchInput from './SearchInput';
import GenreDropdown from './GenreDropdown';

const NavBar = () => {
  return (
    <nav className="flex space-x-2">
      {/* GenreDropdown */}
      <GenreDropdown />

      {/* SearhInput */}
      <SearchInput />

      {/* ThemeToggler */}
      <ThemeToggler />
    </nav>
  );
};

export default NavBar;
