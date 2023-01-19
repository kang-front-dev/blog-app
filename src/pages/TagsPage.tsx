import React, { useEffect, useState } from 'react';
import { getAllReviews } from '../api/getAllReviews';
import { getAllTags } from '../api/getAllTags';
import { IReview } from '../components/classes/ReviewClass';
import { ITag } from '../components/classes/TagClass';
import ReviewCard from '../components/ReviewCard';

import Skeleton from '@mui/material/Skeleton';

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isNoResults, setIsNoResults] = useState(false);
  const [activeTags, setActiveTags] = useState([]);
  const [dbReviews, setDbReviews] = useState([]);

  async function getTags() {
    const response = await getAllTags();

    if (response.success) {
      const sorted = response.tags
        .sort((a: ITag, b: ITag) => {
          return a.useAbility - b.useAbility;
        })
        .reverse();
      setTags(sorted);
    }
  }

  async function getReviews() {
    const response = await getAllReviews();
    setDbReviews(response.reviews);
    setReviews(response.reviews);
  }

  function updateReviews(tagsArr: Array<string>) {
    const filteredArr = dbReviews.filter((item: IReview) => {
      let isContains = true;
      tagsArr.forEach((tag) => {
        if (item.tags.indexOf(tag) < 0) {
          isContains = false;
        }
      });
      return isContains;
    });
    if (filteredArr.length === 0) {
      setIsNoResults(true);
    } else {
      setIsNoResults(false);
    }
    setReviews(filteredArr);
  }

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const el = event.target as HTMLButtonElement;
    const value = el.textContent;
    const isActive = activeTags.includes(value);

    let activeTagsTemp = activeTags;
    if (isActive) {
      const temp = activeTags;
      const tagIndex = temp.indexOf(value);

      temp.splice(tagIndex, 1);
      activeTagsTemp.splice(tagIndex, 1);
      setActiveTags(temp);

      el.classList.remove('active');
    } else {
      const temp = [...activeTags, value];

      setActiveTags([...temp]);
      activeTagsTemp = [...temp];
      el.classList.add('active');
    }

    updateReviews(activeTagsTemp);
  };

  function generateCards() {
    if (reviews.length) {
      return reviews.map((item, index) => {
        return <ReviewCard key={index} cardInfo={item} />;
      });
    } else if (isNoResults) {
      return <div className="review__error">No reviews</div>;
    } else if (!isNoResults && !reviews.length) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
        return (
          <Skeleton
            key={item}
            variant="rounded"
            height={220}
            animation="wave"
            style={{ borderRadius: '20px' }}
          />
        );
      });
    }
  }

  useEffect(() => {
    getTags();
    getReviews();
  }, []);

  return (
    <section className="tags__wrapper">
      <div className="tags__block">
        {tags.map((tag, index) => {
          return (
            <button key={index} className="tags__item" onClick={handleClick}>
              <p className="tags__item_text">{tag.tagName}</p>
            </button>
          );
        })}
      </div>

      <div className="review__main_container">{generateCards()}</div>
    </section>
  );
}
