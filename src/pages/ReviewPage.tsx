import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getReview } from '../components/api/getReview';
import { IReview, Review } from '../components/classes/ReviewClass';
import { getBgFromRating } from '../components/lib/RatingBackground';

import Button from '@mui/material/Button';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

import { globalContext } from '../components/contexts/globalContext';
import { addLike, removeLike } from '../components/api/addOrRemoveLike';
import {
  addDislike,
  removeDislike,
} from '../components/api/addOrRemoveDislike';
import { addView } from '../components/api/addView';

interface IHasMyLikeOrDislike {
  hasMyLike: boolean;
  hasMyDislike: boolean;
}

export default function ReviewPage() {
  const { id } = useParams();
  const {
    userName,
    isAuth,
    setOpen,
    setSeverity,
    setAlertMessage,
    setIsLoading,
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
    views: [],
  });

  async function getReviewData() {
    const response = await getReview({ _id: id }).catch((err) => {
      console.log(err);
    });
    console.log(response);
    setReviewData(response.reviewData);
    handleView();
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

  const handleOpen = (severityState: string, alertMessageValue: string) => {
    setOpen(true);
    setSeverity(severityState);
    setAlertMessage(alertMessageValue);
  };

  useEffect(() => {
    getReviewData();
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
              <img src="" alt="" />
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
                  handleOpen('error', 'You have to sign in to rate reviews');
                }
              }}
            >
              {isLiked ? (
                <ThumbUpAltIcon style={{ color: '#252525' }} />
              ) : (
                <ThumbUpOffAltIcon style={{ color: '#252525' }} />
              )}
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
                  handleOpen('error', 'You have to sign in to rate reviews');
                }
              }}
            >
              {isDisliked ? (
                <ThumbDownAltIcon style={{ color: '#252525' }} />
              ) : (
                <ThumbDownOffAltIcon style={{ color: '#252525' }} />
              )}
              <span className="review__likes_amount">
                {reviewData.dislikes.length}
              </span>
            </Button>
          </div>
          <span className="review__views">
            <RemoveRedEyeIcon style={{ color: '#626262' }} />
            {reviewData.views.length}
          </span>
        </div>
      </div>
    </div>
  );
}
