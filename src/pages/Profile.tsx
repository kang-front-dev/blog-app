import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { getUserInfo } from '../components/api/getUserInfo';
import { getUserReviews } from '../components/api/getUserReviews';
import { IUser, User } from '../components/classes/userDataClass';
import { IReview } from '../components/classes/ReviewClass';
import ReviewCard from '../components/ReviewCard';

export default function Profile() {
  const { name } = useParams();

  const [userInfo, setUserInfo] = useState<IUser>({});
  const [userReviews, setUserReviews] = useState<Array<IReview>>([]);

  async function getUser() {
    getUserInfo({ name: name })
      .then((res) => {
        setUserInfo(res.userData);
      })
      .catch((err) => {
        console.log(err);
      });

    getUserReviews({ name: name })
      .then((res) => {
        setUserReviews(res.reviews);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="profile">
      <div className="profile__about">
        <div className="profile__about_avatar_wrapper">
          <img src="" alt="" className="profile__about_avatar" />
        </div>
        <h2 className="profile__about_name">{userInfo.name}</h2>
        <p className="profile__about_email">{userInfo.email}</p>
      </div>
      <div className="profile__reviews">
        <h3 className="profile__reviews_title">
          <MenuBookIcon />
          Reviews
        </h3>
        <div className="profile__reviews_container">
          {userReviews.map((review, index) => {
            return (
              <ReviewCard
                key={index}
                cardInfo={{ ...review, selectorId: 'profile-review-card' }}
              ></ReviewCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
