import React, { useEffect, useState, useContext } from 'react';
import { getAllReviews } from '../components/api/getAllReviews';
import { IReview } from '../components/classes/ReviewClass';
import { globalContext } from '../components/contexts/globalContext';
import ReviewCard from '../components/ReviewCard';

export default function MainPage() {
  const {
    setProgress,
  } = useContext(globalContext);
  const [recentReviews, setRecentReviews] = useState([]);
  const [popularReviews, setPopularReviews] = useState([]);

  useEffect(() => {
    setProgress(20);
    handleUpdate().then(() => {
      setProgress(90);
      setTimeout(() => {
        setProgress(100);
        setProgress(0);
      }, 500);
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
          console.log(a.views, b.views);

          return a.views - b.views;
        })
        .reverse()
        .slice(0, 9),
    ];

    setRecentReviews(recentSorted);
    setPopularReviews(mostPopular);

    console.log(recentSorted, mostPopular);
  };

  return (
    <div style={{ padding: '50px 0', width: '100%' }}>
      <h2 className="review__container_title">Recently added</h2>
      <div className="review__container">
        {recentReviews.map((item, index) => {
          return <ReviewCard key={index} cardInfo={{ ...item }} />;
        })}
      </div>
      <h2 className="review__container_title">Most Popular</h2>
      <div className="review__container">
        {popularReviews.map((item, index) => {
          return <ReviewCard key={index} cardInfo={{ ...item }} />;
        })}
      </div>
    </div>
  );
}
