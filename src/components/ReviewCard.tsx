import React, { useEffect, useState } from 'react';

import Skeleton from '@mui/material/Skeleton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { AnimationOnScroll } from 'react-animation-on-scroll';
import { Link } from 'react-router-dom';
import { getUserAvatar } from './api/getUserAvatar';
import { IReview } from './classes/ReviewClass';

interface ICardProps {
  cardInfo: IReview;
}

export default function ReviewCard({ cardInfo }: ICardProps) {
  console.log(cardInfo);
  const [authorAvatar, setAuthorAvatar] = useState('');
  async function getAvatarImg() {
    const response = await getUserAvatar({ name: cardInfo.author });
    console.log(response, 'response');
    setAuthorAvatar(response.imgPath);
  }
  useEffect(() => {
    getAvatarImg();
  }, []);
  return (
    <AnimationOnScroll animateIn="pop-up" duration={0.3}>
      <Link to={`/review/${cardInfo._id}`}>
        <div
          className="review__card"
          id={cardInfo.selectorId ? cardInfo.selectorId : ''}
        >
          {cardInfo.imgPath ? (
            <div className="review__card_img_wrapper">
              <div className="review__card_img_block">
                <img
                  src={cardInfo.imgPath}
                  alt=""
                  className="review__card_img"
                />
              </div>
            </div>
          ) : (
            <Skeleton
              variant="rounded"
              style={{ maxWidth: '50%', width: '100%' }}
              height={340}
            />
          )}

          <div className="review__card_text">
            <div className="review__card_upper">
              <div className="review__card_title_block">
                <h3 className="review__card_title">{cardInfo.title}</h3>
                <span className="review__card_title_bordered">
                  {cardInfo.title}
                </span>
              </div>
              <p className="review__card_descr">{cardInfo.descr}</p>
            </div>
            <div className="review__card_bottom">
              <div className="review__card_author">
                {authorAvatar ? (
                  <img
                    src={authorAvatar}
                    alt=""
                    className="review__card_author_avatar"
                  />
                ) : (
                  <AccountCircleIcon
                    style={{ width: '30px', height: '30px', color: '#626262' }}
                  />
                )}
                <span>{cardInfo.author}</span>
              </div>
              <div className="review__card_stats">
                <span className="review__card_stats_views">
                  <ThumbUpAltIcon style={{ color: '#626262' }} />
                  {cardInfo.likes.length}
                </span>
                <span className="review__card_stats_likes">
                  <ThumbDownAltIcon style={{ color: '#626262' }} />
                  {cardInfo.dislikes.length}
                </span>
                <span className="review__card_stats_dislikes">
                  <RemoveRedEyeIcon style={{ color: '#626262' }} />
                  {cardInfo.views.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </AnimationOnScroll>
  );
}
