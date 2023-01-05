import React, { useEffect, useState, useContext } from 'react';
import { getAllReviews } from '../components/api/getAllReviews';
import { IReview } from '../components/classes/ReviewClass';
import { globalContext } from '../components/contexts/globalContext';
import ReviewCard from '../components/ReviewCard';

export default function MainPage() {
  const { setProgress } = useContext(globalContext);
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

          return a.views - b.views;
        })
        .reverse()
        .slice(0, 9),
    ];

    setRecentReviews(recentSorted);
    setPopularReviews(mostPopular);

  };

  return (
    <div
      style={{ padding: '50px 0', width: '100%' }}
      className="review__main_container_wrapper"
    >
      <div className="review__main_category_block">
        <h2 className="review__main_container_title">Recently added</h2>
        <div className="review__main_container">
          {recentReviews.map((item, index) => {
            return <ReviewCard key={index} cardInfo={{ ...item }} />;
          })}
        </div>
        <a href="/category/recent" className="review__main_container_link">
          View more
        </a>
      </div>
      <div className="review__main_category_block">
        <h2 className="review__main_container_title">Most Popular</h2>
        <div className="review__main_container">
          {popularReviews.map((item, index) => {
            return <ReviewCard key={index} cardInfo={{ ...item }} />;
          })}
        </div>
        <a href="/category/popular" className="review__main_container_link">
          View more
        </a>
      </div>
    </div>
  );
}
