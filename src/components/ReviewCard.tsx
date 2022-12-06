import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { Link } from 'react-router-dom';

interface IReviewCard {
  imgSrc: string;
  title: string;
  descr: string;
  id: string;
}
interface ICardProps {
  cardInfo: IReviewCard;
}

export default function ReviewCard({ cardInfo }: ICardProps) {
  return (
    <AnimationOnScroll animateIn="pop-up" duration={0.3}>
      <Link to={`/review/${cardInfo.id}`}>
        <div className="review__card">
          {cardInfo.imgSrc ? (
            <img src="" alt="" className="review__card_img" />
          ) : (
            <Skeleton
              variant="rounded"
              style={{ maxWidth: '50%', width: '100%' }}
              height={340}
            />
          )}

          <div className="review__card_text">
            <h3 className="review__card_title">Card</h3>

            <p className="review__card_descr">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Necessitatibus id, iure voluptates delectus quod commodi vel quo
              odio ratione neque.
            </p>
          </div>
        </div>
      </Link>
    </AnimationOnScroll>
  );
}
