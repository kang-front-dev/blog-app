import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAllReviews } from '../components/api/getAllReviews';
import { globalContext } from '../components/contexts/globalContext';
import ReviewCard from '../components/ReviewCard';

export default function MainPage() {
  const { setNavTitle } = useContext(globalContext);
  const [reviews,setReviews] = useState([])
  useEffect(() => {
    setNavTitle('Reviews');
    handleUpdate()
    console.log('useEffect shut on');
  },[]);

  const handleUpdate = async ()=>{
    const response = await getAllReviews()
    setReviews(response.reviews)
    console.log(response);
  }

  function generateCards() {
    return reviews
      ? reviews.map((item, index) => {
          return (
            <ReviewCard
              key={index}
              cardInfo={{
                imgSrc: item.imgPath,
                title: item.title,
                descr: item.descr,
                _id: item._id,
              }}
            />
          );
        })
      : [];
  }
  return (
    <div style={{ padding: '50px 0' }}>
      <Link to="/new">
        <div
          className="review__btn-new"
          onClick={() => {
            setNavTitle('New post');
          }}
        >
          Create your own post
        </div>
      </Link>
      <div className="review__container">{generateCards()}</div>
    </div>
  );
}
