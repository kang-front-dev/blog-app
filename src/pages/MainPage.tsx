import React, { useEffect, useState, useContext } from 'react';
import { getAllReviews } from '../api/getAllReviews';
import { IReview } from '../components/classes/ReviewClass';
import { globalContext } from '../components/contexts/globalContext';
import ReviewCard from '../components/ReviewCard';

import Skeleton from '@mui/material/Skeleton';

export default function MainPage() {
  const { startProgress, finishProgress } = useContext(globalContext);
  const [recentReviews, setRecentReviews] = useState([]);
  const [popularReviews, setPopularReviews] = useState([]);

  useEffect(() => {
    startProgress();
    handleUpdate().then(() => {
      finishProgress();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = async () => {
    const response = await getAllReviews();
    const reviews = response.reviews;
    const recentSorted = [...reviews.reverse().slice(0, 9)];

    const mostPopular = [
      ...reviews
        .sort((a: IReview, b: IReview) => {
          return a.views - b.views;
        })
        .reverse()
        .slice(0, 9),
    ];

    setRecentReviews(recentSorted);
    setPopularReviews(mostPopular);
  };

  function generateCards(reviewsArray: Array<IReview>) {
    if (reviewsArray.length) {
      return reviewsArray.map((item, index) => {
        return <ReviewCard key={index} cardInfo={{ ...item }} />;
      });
    } else {
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
    }
  }

  return (
    <div
      style={{ padding: '50px 0', width: '100%' }}
      className="review__main_container_wrapper"
    >
      <div className="review__main_category_block">
        <h2 className="review__main_container_title">Recently added</h2>
        <div className="review__main_container">
          {generateCards(recentReviews)}
        </div>
        <a href="/category/recent" className="review__main_container_link">
          View more
        </a>
      </div>
      <div className="review__main_category_block">
        <h2 className="review__main_container_title">Most Popular</h2>
        <div className="review__main_container">
          {generateCards(popularReviews)}
        </div>
        <a href="/category/popular" className="review__main_container_link">
          View more
        </a>
      </div>
    </div>
  );
}
