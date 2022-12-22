import React, { useEffect, useState } from 'react';

import Skeleton from '@mui/material/Skeleton';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { AnimationOnScroll } from 'react-animation-on-scroll';
import { Link } from 'react-router-dom';
import { getUserAvatar } from './api/getUserAvatar';
import { IReview } from './classes/ReviewClass';
import { getBgFromRating } from './lib/RatingBackground';
interface ICardProps {
  cardInfo: IReview;
}

export default function ReviewCard({ cardInfo }: ICardProps) {
  return (
    <AnimationOnScroll animateIn="pop-up" duration={0.3}>
      <Link to={`/review/${cardInfo._id}`}>
        <div
          className="review__card"
          id={cardInfo.selectorId ? cardInfo.selectorId : ''}
        >
          <div className="review__card_img_wrapper">
            <div className="review__card_img_block">
              <img src={cardInfo.imgPath} alt="" className="review__card_img" />
            </div>
          </div>

          <div className="review__card_text">
            <h3 className="review__card_title">
              {cardInfo.title}
              <span
                className="review__rating"
                style={{
                  backgroundColor: getBgFromRating(Number(cardInfo.rating)),
                }}
              >
                {cardInfo.rating}
              </span>
            </h3>

            <div className="review__card_bottom">
              <div className="review__card_author">{cardInfo.author}</div>
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
                  {cardInfo.views}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </AnimationOnScroll>
  );
}
