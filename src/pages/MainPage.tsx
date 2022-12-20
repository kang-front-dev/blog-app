import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllReviews } from '../components/api/getAllReviews';
import { globalContext } from '../components/contexts/globalContext';
import ReviewCard from '../components/ReviewCard';

export default function MainPage() {
  const { isAuth,setOpen,setSeverity,setAlertMessage } = useContext(globalContext);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    handleUpdate();
    console.log('useEffect shut on');
  }, []);

  const handleUpdate = async () => {
    const response = await getAllReviews();
    setReviews(response.reviews);
    console.log(response);
  };

  const handleOpen = (severityState: string, alertMessageValue: string) => {
    setOpen(true);
    setSeverity(severityState);
    setAlertMessage(alertMessageValue);
  };

  function generateCards() {
    return reviews
      ? reviews.map((item, index) => {
          return (
            <ReviewCard
              key={index}
              cardInfo={{...item}}
            />
          );
        })
      : [];
  }
  return (
    <div style={{ padding: '50px 0',width: '100%' }}>
      <div
        className="review__btn-new"
        onClick={() => {
          if (isAuth) {
            navigate('/new')
          }else{
            handleOpen('error','You have to Sign In/Sign Up to create your posts')
          }
        }}
      >
        Create your own post
      </div>
      <div className="review__container">{generateCards()}</div>
    </div>
  );
}
