import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';

export default function MainPage() {
  const cards = [
    {
      title: 'Card',
      descr: 'description',
      imgSrc: '',
      id: '1',
    },
    {
      title: 'Card',
      descr: 'description',
      imgSrc: '',
      id: '2',
    },
    {
      title: 'Card',
      descr: 'description',
      imgSrc: '',
      id: '3',
    },
    {
      title: 'Card',
      descr: 'description',
      imgSrc: '',
      id: '4',
    },
    {
      title: 'Card',
      descr: 'description',
      imgSrc: '',
      id: '1',
    },
    {
      title: 'Card',
      descr: 'description',
      imgSrc: '',
      id: '2',
    },
    {
      title: 'Card',
      descr: 'description',
      imgSrc: '',
      id: '3',
    },
    {
      title: 'Card',
      descr: 'description',
      imgSrc: '',
      id: '4',
    },
  ];
  useEffect(() => {
    console.log('useEffect shut on');
  });
  function generateCards() {
    return cards.map((item, index) => {
      return (
        <ReviewCard
          key={index}
          cardInfo={{
            imgSrc: item.imgSrc,
            title: item.title,
            descr: item.descr,
            id: item.id,
          }}
        />
      );
    });
  }
  return (
    <div style={{padding: '50px 0'}}>
      <Link to='/new'>
        <div className='review__btn-new'>Create your own post</div>
      </Link>
      <div className="review__container">{generateCards()}</div>
    </div>
  );
}
