import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { Link } from 'react-router-dom';

interface IReviewCard {
  imgSrc: string;
  title: string;
  descr: string;
  _id: string;
}
interface ICardProps {
  cardInfo: IReviewCard;
}

export default function ReviewCard({ cardInfo }: ICardProps) {
  console.log(cardInfo);

  return (
    <AnimationOnScroll animateIn="pop-up" duration={0.3}>
      <Link to={`/review/${cardInfo._id}`}>
        <div className="review__card">
          {cardInfo.imgSrc ? (
            <img src={cardInfo.imgSrc} alt="" className="review__card_img" />
          ) : (
            <Skeleton
              variant="rounded"
              style={{ maxWidth: '50%', width: '100%' }}
              height={340}
            />
          )}

          <div className="review__card_text">
            <div className="review__card_title_block">
              <h3 className="review__card_title">{cardInfo.title}</h3>
              <span className="review__card_title_bordered">
                {cardInfo.title}
              </span>
            </div>
            <hr className="review__card_hr" />
            <p className="review__card_descr">{cardInfo.descr}</p>
          </div>
        </div>
      </Link>
    </AnimationOnScroll>
  );
}
