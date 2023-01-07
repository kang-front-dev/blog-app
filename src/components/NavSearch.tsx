import React, { FormEvent, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import { getAllReviews } from '../api/getAllReviews';
import { IReview } from './classes/ReviewClass';
import NavSearchCard from './NavSearchCard';
import { SearchReviews } from '../utils/Search';

export default function NavSearch() {
  const [searchValue, setSearchValue] = useState('');
  const [cards, setCards] = useState([]);
  const [isSearchListOpen, setIsSearchListOpen] = useState(false);

  const handleInput = async (e: FormEvent) => {
    setIsSearchListOpen(true);
    const searchValueTemp = (e.target as HTMLInputElement).value;
    setSearchValue(searchValueTemp);
    const { reviews } = await getAllReviews();
    if (reviews && searchValueTemp) {
      const filteredArr = SearchReviews(searchValueTemp,reviews)
      setCards(filteredArr);
    } else if (searchValueTemp === '') {
      setCards([]);
      setIsSearchListOpen(false);
    }
  };
  const handleDelete = () => {
    setSearchValue('');
    setIsSearchListOpen(false);
  };
  return (
    <div className="nav_search_wrapper">
      <label htmlFor="nav-search" className="nav_search">
        <SearchIcon />
        <input
          id="nav-search"
          type="text"
          placeholder="Search..."
          className="nav_search_input"
          onChange={handleInput}
          value={searchValue}
        />
        <div onClick={handleDelete}>
          <CloseIcon />
        </div>
      </label>
      <div
        className={
          isSearchListOpen ? 'nav_search_results active' : 'nav_search_results'
        }
      >
        {cards.map((item: IReview, index: number) => {
          return (
            <NavSearchCard
              handleDelete={handleDelete}
              cardInfo={item}
              key={index}
            />
          );
        })}
      </div>
      <div
        className={
          isSearchListOpen
            ? 'nav_search_backplate active'
            : 'nav_search_backplate'
        }
        onClick={() => {
          setIsSearchListOpen(false);
        }}
      ></div>
    </div>
  );
}
