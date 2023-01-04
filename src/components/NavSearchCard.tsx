import React from 'react';
import { IReview } from './classes/ReviewClass';

interface ICardProps {
  cardInfo: IReview;
}
export default function NavSearchCard({ cardInfo }: ICardProps) {
  return (
    <div
      className="nav_search_card"
      style={{ backgroundImage: `url(${cardInfo.imgPath})` }}
    >
      <div className="nav_search_card_content">
        <h3 className="nav_search_card_title">{cardInfo.title}</h3>
      </div>
    </div>
  );
}
