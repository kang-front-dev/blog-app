import React, { FormEvent, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { getAllReviews } from './api/getAllReviews';
import { IReview } from './classes/ReviewClass';
import NavSearchCard from './NavSearchCard';

export default function NavSearch() {
  const [searchValue, setSearchValue] = useState('');
  const [cards, setCards] = useState([]);

  const handleInput = async (e: FormEvent) => {
    const searchValueTemp = (e.target as HTMLInputElement).value;
    setSearchValue(searchValueTemp);
    const { reviews } = await getAllReviews();
    if (reviews && searchValueTemp) {
      const filteredArr = reviews.filter((review: IReview) => {
        const isTitleIncludes = review.title.includes(searchValueTemp);
        const isDescrIncludes = review.descr.includes(searchValueTemp);
        return isTitleIncludes || isDescrIncludes ? true : false;
      });
      setCards(filteredArr);
    } else if (searchValueTemp === '') {
      setCards(reviews);
    }
  };
  const handleDelete = () => {
    setSearchValue('');
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
      <div className="nav_search_results">
        {cards.map((item: IReview, index: number) => {
          return <NavSearchCard cardInfo={item} key={index} />;
        })}
      </div>
    </div>
  );
}
