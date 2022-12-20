import React, { FormEvent, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function NavSearch() {
  const [searchValue, setSearchValue] = useState('');
  const handleInput = (e: FormEvent) => {
    setSearchValue((e.target as HTMLInputElement).value);
  };
  const handleDelete = () => {
    setSearchValue('');
  };
  return (
    <label htmlFor="nav-search" className="nav_search">
      <SearchIcon />
      <input
        id="nav-search"
        type="text"
        placeholder="Search..."
        className="nav_search_input"
        onInput={handleInput}
        value={searchValue}
      />
      <IconButton onClick={handleDelete}>
        <CloseIcon />
      </IconButton>
    </label>
  );
}
