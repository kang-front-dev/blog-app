import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllReviews } from '../components/api/getAllReviews';
import { IReview } from '../components/classes/ReviewClass';
import { globalContext } from '../components/contexts/globalContext';
import ReviewCard from '../components/ReviewCard';

export default function MainPage() {
  const { isAuth, setOpen, setSeverity, setAlertMessage } =
    useContext(globalContext);
  const [recentReviews, setRecentReviews] = useState([]);
  const [popularReviews, setPopularReviews] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    handleUpdate();
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

  const handleOpen = (severityState: string, alertMessageValue: string) => {
    setOpen(true);
    setSeverity(severityState);
    setAlertMessage(alertMessageValue);
  };

  return (
    <div style={{ padding: '50px 0', width: '100%' }}>
      <div
        className="review__btn-new"
        onClick={() => {
          if (isAuth) {
            navigate('/new');
          } else {
            handleOpen(
              'error',
              'You have to Sign In/Sign Up to create your posts'
            );
          }
        }}
      >
        Create your own post
      </div>
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
