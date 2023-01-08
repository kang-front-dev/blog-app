import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getAllReviews } from '../api/getAllReviews';
import { IReview } from '../components/classes/ReviewClass';
import ReviewCard from '../components/ReviewCard';

import Skeleton from '@mui/material/Skeleton';
import { globalContext } from '../components/contexts/globalContext';

export default function CategoryPage() {
  const { category } = useParams();
  const { startProgress, finishProgress } = useContext(globalContext);
  const [categoryReviews, setCategoryReviews] = useState<Array<IReview>>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  async function getFilteredReviews(categoryParam: string) {
    startProgress();
    const response = await getAllReviews();

    if (category !== 'popular' && category !== 'recent') {
      const result = response.reviews.filter((review: IReview) => {
        return review.group.toLowerCase() === categoryParam ? review : null;
      });
      setCategoryReviews(result);
    } else if (category === 'popular') {
      const reviews = [...response.reviews];
      const result = [
        ...reviews
          .sort((a: IReview, b: IReview) => {
            return a.views - b.views;
          })
          .reverse(),
      ];
      setCategoryReviews(result);
    } else if (category === 'recent') {
      const reviews = [...response.reviews];
      const result = [...reviews.reverse()];
      setCategoryReviews(result);
    }
    setIsDataLoaded(true);
    finishProgress();
  }

  function generateCards() {
    if (isDataLoaded && categoryReviews.length) {
      return categoryReviews.map((review, index) => {
        return <ReviewCard key={index} cardInfo={{ ...review }} />;
      });
    } else if (!isDataLoaded && !categoryReviews.length) {
      return [1, 2, 3, 4, 5, 6].map((item) => {
        return (
          <Skeleton
            key={item}
            variant="rounded"
            animation="wave"
            style={{ borderRadius: '20px', height: '100%' }}
          />
        );
      });
    } else if (isDataLoaded && !categoryReviews.length) {
      return <div className="review__error">No reviews</div>;
    }
  }

  useEffect(() => {
    getFilteredReviews(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <section className="review__main_category">
      <div className="review__main_container_title">{category}</div>
      <div className="review__main_container">{generateCards()}</div>
    </section>
  );
}
