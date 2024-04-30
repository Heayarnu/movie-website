import React from 'react';
import { ThemeToggler } from './ThemeToggler';
import SearchInput from './SearchInput';
import GenreDropdow from './GenreDropdown';

const NavBar = () => {
  return (
    <nav className="flex space-x-2">
      {/* GenreDropdown */}
      <GenreDropdow />

      {/* SearhInput */}
      <SearchInput />

      {/* ThemeToggler */}
      <ThemeToggler />
    </nav>
  );
};

export default NavBar;
