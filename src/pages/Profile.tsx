import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import Skeleton from '@mui/material/Skeleton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { getUserInfo } from '../api/getUserInfo';
import { getUserReviews } from '../api/getUserReviews';
import { IUser } from '../components/classes/userDataClass';
import { IReview } from '../components/classes/ReviewClass';
import ReviewCard from '../components/ReviewCard';

import { uploadFile } from '../api/firebase';

import { FileUploader } from 'react-drag-drop-files';
import { updateUserInfo } from '../api/updateUserInfo';
import { useAuth } from '../hooks/useAuth';
import { useSnackbar } from '../hooks/useSnackbar';
import { useProgress } from '../hooks/useProgress';

const fileTypes = ['JPG', 'PNG', 'JPEG'];

export default function Profile() {
  const { name } = useParams();
  const { userName } = useAuth();
  const { handleSnackbarOpen } = useSnackbar();
  const { startProgress, finishProgress } = useProgress();

  const [userInfo, setUserInfo] = useState<IUser>({});
  const [userReviews, setUserReviews] = useState<Array<IReview>>([]);
  const [userReviewsLoaded, setUserReviewsLoaded] = useState(false);
  const [avatarImgPath, setAvatarImgPath] = useState('');
  async function getUser() {
    startProgress();
    getUserInfo({ name: name })
      .then((res) => {
        setUserInfo(res.userData);
        setAvatarImgPath(res.userData.avatarImgPath);
      })
      .catch((err) => {
        console.log(err);
      });

    getUserReviews({ name: name })
      .then((res) => {
        setUserReviews(res.reviews);
        setUserReviewsLoaded(true);
        finishProgress();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleChange = async (file: any) => {
    const filePath = await uploadFile(file);
    setAvatarImgPath(filePath);
    const response = await updateUserInfo({
      ...userInfo,
      avatarImgPath: filePath,
    });
    if (response.success) {
      handleSnackbarOpen('success', response.message);
    } else {
      handleSnackbarOpen('error', response.message);
    }
  };

  function generateReviews() {
    if (userReviewsLoaded && userReviews.length) {
      return userReviews.map((review, index) => {
        return <ReviewCard key={index} cardInfo={{ ...review }} />;
      });
    } else if (!userReviewsLoaded && !userReviews.length) {
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
    } else if (userReviewsLoaded && !userReviews.length) {
      return <div className="review__error">No reviews</div>;
    }
  }

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="profile">
      <div className="profile__about">
        <div
          className={
            avatarImgPath
              ? 'profile__about_avatar active'
              : 'profile__about_avatar'
          }
          style={{ backgroundImage: `url(${avatarImgPath})` }}
        >
          {userName === name ? (
            <FileUploader
              handleChange={handleChange}
              name="file"
              multiple={false}
              types={fileTypes}
              label={'Change avatar'}
            />
          ) : null}
          {!avatarImgPath ? <AccountCircleIcon /> : null}
        </div>
        {userInfo.name ? (
          <h2 className="profile__about_name">{userInfo.name}</h2>
        ) : (
          <Skeleton
            variant="rounded"
            width={120}
            height={40}
            animation="wave"
          />
        )}
        {userInfo.email ? (
          <p className="profile__about_email">{userInfo.email}</p>
        ) : (
          <Skeleton
            variant="rounded"
            width={220}
            height={20}
            animation="wave"
          />
        )}
      </div>
      <div className="profile__reviews">
        <h3 className="profile__reviews_title">
          <MenuBookIcon />
          Reviews
        </h3>
        <div className="profile__reviews_container">{generateReviews()}</div>
      </div>
    </div>
  );
}
