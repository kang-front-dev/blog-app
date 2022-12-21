import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllReviews } from '../components/api/getAllReviews';
import { IReview } from '../components/classes/ReviewClass';
import ReviewCard from '../components/ReviewCard';

export default function CategoryPage() {
  const { category } = useParams();
  const [categoryReviews, setCategoryReviews] = useState<Array<IReview>>([]);

  async function getFilteredReviews(categoryParam: string) {
    const response = await getAllReviews();
    console.log(response);

    const result = response.reviews.filter((review: IReview) => {
      return review.group.toLowerCase() === categoryParam ? review : null;
    });
    console.log(result);
    setCategoryReviews(result);
  }

  useEffect(() => {
    getFilteredReviews(category);
  }, [category]);

  return (
    <div className="review__category">
      <div className="review__container">
        {categoryReviews.length > 0 ? (
          categoryReviews.map((review, index) => {
            return <ReviewCard key={index} cardInfo={{ ...review }} />;
          })
        ) : (
          <div className="review__error">No reviews in category "{category}"</div>
        )}
      </div>
    </div>
  );
}
