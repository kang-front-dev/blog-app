import React, { useState, FormEvent, useEffect } from 'react';
import { getAllReviews } from '../api/getAllReviews';
import { IReview } from '../components/classes/ReviewClass';
import { SearchReviews } from '../utils/Search';
import ReviewCard from '../components/ReviewCard';

import Skeleton from '@mui/material/Skeleton';
import CloseIcon from '@mui/icons-material/Close';
import { useProgress } from '../hooks/useProgress';

export default function SearchPage() {
  const { startProgress, finishProgress } = useProgress();
  const [searchValue, setSearchValue] = useState('');
  const [cards, setCards] = useState<Array<IReview>>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [dbReviews, setDbReviews] = useState<Array<IReview>>([]);

  const handleInput = async (e: FormEvent) => {
    setCards([]);
    setIsDataLoaded(false);
    const searchValueTemp = (e.target as HTMLInputElement).value;
    setSearchValue(searchValueTemp);
    const { reviews } = await getAllReviews();
    setDbReviews(reviews);
    if (reviews && searchValueTemp) {
      const filteredArr = SearchReviews(searchValueTemp, reviews);
      setCards(filteredArr);
    }
    setIsDataLoaded(true);
  };

  const handleClear = () => {
    setSearchValue('');
  };

  function generateCards() {
    if (isDataLoaded && cards.length) {
      return cards.map((review, index) => {
        return <ReviewCard key={index} cardInfo={{ ...review }} />;
      });
    } else if (!isDataLoaded && !cards.length) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
        return (
          <Skeleton
            key={item}
            variant="rounded"
            animation="wave"
            style={{ borderRadius: '20px', height: '100%' }}
          />
        );
      });
    } else if (isDataLoaded && !cards.length) {
      return dbReviews.map((review, index) => {
        return <ReviewCard key={index} cardInfo={{ ...review }} />;
      });
    }
  }

  useEffect(() => {
    startProgress();
    const getReviews = async () => {
      const { reviews } = await getAllReviews();
      setDbReviews(reviews);
      setIsDataLoaded(true);

      finishProgress();
    };
    getReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="review__search">
      <div className="review__search_input_wrapper">
        <input
          type="text"
          className="review__search_input"
          value={searchValue}
          onChange={handleInput}
          placeholder="Search..."
        />
        <button className="review__search_input_btn" onClick={handleClear}>
          <CloseIcon />
        </button>
      </div>
      <div className="review__main_container">{generateCards()}</div>
    </section>
  );
}
