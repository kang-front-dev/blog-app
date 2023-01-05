import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import { getUserInfo } from '../components/api/getUserInfo';
import { getUserReviews } from '../components/api/getUserReviews';
import { IUser } from '../components/classes/userDataClass';
import { IReview } from '../components/classes/ReviewClass';
import ReviewCard from '../components/ReviewCard';

import { uploadFile } from '../components/api/firebase';

import { FileUploader } from 'react-drag-drop-files';
import { updateUserInfo } from '../components/api/updateUserInfo';
import { globalContext } from '../components/contexts/globalContext';
const fileTypes = ['JPG', 'PNG', 'JPEG'];

export default function Profile() {
  const { name } = useParams();
  const { handleSnackbarOpen, userName } = useContext(globalContext);

  const [userInfo, setUserInfo] = useState<IUser>({});
  const [userReviews, setUserReviews] = useState<Array<IReview>>([]);
  const [avatarImgPath, setAvatarImgPath] = useState('');
  async function getUser() {
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
