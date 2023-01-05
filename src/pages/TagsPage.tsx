import React, { useEffect, useState } from 'react';
import { getAllReviews } from '../components/api/getAllReviews';
import { getAllTags } from '../components/api/getAllTags';
import { IReview } from '../components/classes/ReviewClass';
import { ITag } from '../components/classes/TagClass';
import ReviewCard from '../components/ReviewCard';

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [reviews, setReviews] = useState([]);
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
    setReviews(filteredArr);
  }

  const handleClick = (value: string, el: HTMLButtonElement) => {
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

  useEffect(() => {
    getTags();
    getReviews();
  }, []);

  return (
    <section className="tags__wrapper">
      <div className="tags__block">
        {tags.map((tag, index) => {
          return (
            <button
              key={index}
              className="tags__item"
              onClick={(e) => {
                const target = e.target as HTMLButtonElement;
                handleClick(target.textContent, target);
              }}
            >
              <p className="tags__item_text">{tag.tagName}</p>
            </button>
          );
        })}
      </div>

      <div className="review__main_container">
        {reviews.map((item, index) => {
          return <ReviewCard key={index} cardInfo={item} />;
        })}
      </div>
    </section>
  );
}
