import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getReview } from '../components/api/getReview';
import { IReview } from '../components/classes/ReviewClass';
import { getBgFromRating } from '../components/lib/RatingBackground';

import Button from '@mui/material/Button';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { globalContext } from '../components/contexts/globalContext';
import { addLike, removeLike } from '../components/api/addOrRemoveLike';
import {
  addDislike,
  removeDislike,
} from '../components/api/addOrRemoveDislike';
import { addView } from '../components/api/addView';
import { getUserAvatar } from '../components/api/getUserAvatar';

interface IHasMyLikeOrDislike {
  hasMyLike: boolean;
  hasMyDislike: boolean;
}

export default function ReviewPage() {
  const { id } = useParams();
  const {
    userName,
    isAuth,
    setProgress,
    handleSnackbarOpen,
  } = useContext(globalContext);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [reviewData, setReviewData] = useState<IReview>({
    _id: id,
    createDate: {
      dayMonthYear: '',
      time: { seconds: '0', minutes: '0', hours: '0' },
    },
    likes: [],
    dislikes: [],
    views: 0,
    group: '',
    tags: [],
  });
  const [authorAvatar, setAuthorAvatar] = useState('');

  async function getReviewData() {
    const response = await getReview({ _id: id }).catch((err) => {
      console.log(err);
    });
    console.log(response);
    setReviewData(response.reviewData);
    getAuthorAvatar(response.reviewData.author);
    handleView();
  }
  async function getAuthorAvatar(name: string) {
    console.log(name);

    const authorAvatarSrc = await getUserAvatar({ name: name });
    setAuthorAvatar(authorAvatarSrc.imgPath);
  }
  function checkLikeAndDislike(): IHasMyLikeOrDislike {
    const hasMyLike = reviewData.likes.indexOf(userName);
    const hasMyDislike = reviewData.dislikes.indexOf(userName);
    return {
      hasMyLike: hasMyLike > 0 ? true : false,
      hasMyDislike: hasMyDislike > 0 ? true : false,
    };
  }

  const handleLike = async () => {
    const { hasMyLike, hasMyDislike } = checkLikeAndDislike();
    if (!hasMyLike) {
      addLike({ _id: id, username: userName });
      setIsLiked(true);
      if (hasMyDislike) {
        removeDislike({ _id: id, username: userName });
        setIsDisliked(true);
      }
      getReviewData();
    } else {
      removeLike({ _id: id, username: userName });
    }
  };

  const handleDislike = async () => {
    const { hasMyLike, hasMyDislike } = checkLikeAndDislike();
    if (!hasMyDislike) {
      addDislike({ _id: id, username: userName });
      setIsDisliked(true);
      if (hasMyLike) {
        removeLike({ _id: id, username: userName });
        setIsLiked(false);
      }
      getReviewData();
    } else {
      removeDislike({ _id: id, username: userName });
    }
  };

  const handleView = async () => {
    addView({ _id: id, username: userName });
  };

  useEffect(() => {
    setProgress(20);
    getReviewData().then(() => {
      setProgress(90);
      setTimeout(() => {
        setProgress(100);
      }, 300);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="review">
      <div className="container">
        <div className="review__title">
          {reviewData.title}
          <span
            className="review__rating"
            style={{
              backgroundColor: getBgFromRating(Number(reviewData.rating)),
            }}
          >
            {reviewData.rating}
          </span>
        </div>
        <div className="review__about">
          <p className="review__date">{reviewData.createDate.dayMonthYear}</p>
          <p className="review__author">
            <Link to={`/profiles/${reviewData.author}`}>
              {authorAvatar ? (
                <img src={authorAvatar} alt="" />
              ) : (
                <AccountCircleIcon />
              )}
              <span>{reviewData.author}</span>
            </Link>
          </p>
        </div>
        <div className="review__img_wrapper">
          <img src={`${reviewData.imgPath}`} alt="" className="review__img" />
        </div>
        <p className="review__descr">{reviewData.descr}</p>
        <div className="review__stats">
          <div className="review__likes_block">
            <Button
              variant="text"
              onClick={() => {
                if (isAuth) {
                  handleLike();
                } else {
                  handleSnackbarOpen(
                    'error',
                    'You have to sign in to rate reviews'
                  );
                }
              }}
            >
              {isLiked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
              <span className="review__likes_amount">
                {reviewData.likes.length}
              </span>
            </Button>
          </div>
          <div className="review__dislikes_block">
            <Button
              variant="text"
              onClick={() => {
                if (isAuth) {
                  handleDislike();
                } else {
                  handleSnackbarOpen(
                    'error',
                    'You have to sign in to rate reviews'
                  );
                }
              }}
            >
              {isDisliked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
              <span className="review__likes_amount">
                {reviewData.dislikes.length}
              </span>
            </Button>
          </div>
          <span className="review__views">
            <RemoveRedEyeIcon />
            {reviewData.views}
          </span>
          <Link to={`/reviews/category/${reviewData.group.toLowerCase()}`}>
            <span className="review__group">{reviewData.group}</span>
          </Link>
          <div className="review__tags">
            {reviewData.tags.map((tag, index) => {
              return (
                <span className="review__tag" key={index}>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
