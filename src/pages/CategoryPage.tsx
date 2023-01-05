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


    if (category !== 'popular' && category !== 'recent') {
      const result = response.reviews.filter((review: IReview) => {
        return review.group.toLowerCase() === categoryParam ? review : null;
      });
      setCategoryReviews(result);
    } else if (category === 'popular') {
      const reviews = [...response.reviews];
      const result = [
        ...reviews
          .sort((a: IReview, b: IReview) => {

            return a.views - b.views;
          })
          .reverse(),
      ];
      setCategoryReviews(result);
    } else if (category === 'recent') {
      const reviews = [...response.reviews];
      const result = [...reviews.reverse()];
      setCategoryReviews(result);
    }
  }

  useEffect(() => {
    getFilteredReviews(category);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <section className="review__main_category">
      <div className="review__main_container_title">{category}</div>
      <div className="review__main_container">
        {categoryReviews.length > 0 ? (
          categoryReviews.map((review, index) => {
            return <ReviewCard key={index} cardInfo={{ ...review }} />;
          })
        ) : (
          <div className="review__error">
            No reviews in category "{category}"
          </div>
        )}
      </div>
    </section>
  );
}
