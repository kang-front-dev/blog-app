import React from 'react';
import { Link } from 'react-router-dom';
import { IReview } from './classes/ReviewClass';

interface ICardProps {
  cardInfo: IReview;
  handleDelete: () => void;
}
export default function NavSearchCard({ cardInfo, handleDelete }: ICardProps) {
  return (
    <Link
      to={`review/${cardInfo._id}`}
      onClick={() => {
        handleDelete();
      }}
    >
      <div
        className="nav_search_card"
        style={{ backgroundImage: `url(${cardInfo.imgPath})` }}
      >
        <div className="nav_search_card_content">
          <h3 className="nav_search_card_title">{cardInfo.title}</h3>
        </div>
      </div>
    </Link>
  );
}
