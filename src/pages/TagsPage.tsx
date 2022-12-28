import React, { useEffect, useState } from 'react';
import { getAllTags } from '../components/api/getAllTags';
import { ITag } from '../components/classes/TagClass';

export default function TagsPage() {
  const [tags, setTags] = useState([]);

  async function getTags() {
    const response = await getAllTags();
    console.log(response);

    if (response.success) {
      const sorted = response.tags
        .sort((a: ITag, b: ITag) => {
          return a.useAbility - b.useAbility;
        })
        .reverse();
      setTags(sorted);
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const el = event.target as HTMLButtonElement;
    if (el.classList.contains('active')) {
      el.classList.remove('active');
    } else {
      el.classList.add('active');
    }
    console.log(el);
  };

  useEffect(() => {
    getTags();
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
    </section>
  );
}
