import React, { useEffect, useState } from 'react';
interface ILoadingProp {
  isDataLoaded: boolean;
}
export default function Loading({ isDataLoaded }: ILoadingProp) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(isDataLoaded);
  }, [isDataLoaded]);

  return (
    <div className={`loading ${isActive ? 'active' : ''}`}>
      <div className="loading__wrapper">
        <span className="loading__bordered">
          loading
          <span className="loading__dots">
            <span className="loading__dot">.</span>
            <span className="loading__dot">.</span>
            <span className="loading__dot">.</span>
          </span>
        </span>
        <span className="loading__primary">
          loading
          <span className="loading__dots">
            <span className="loading__dot">.</span>
            <span className="loading__dot">.</span>
            <span className="loading__dot">.</span>
          </span>
        </span>
        <div className="loading__block-upper">
          <div className="loading__block-upper_bg"></div>
        </div>
        <div className="loading__block-bottom">
          <div className="loading__block-bottom_bg"></div>
        </div>
        <div className="loading__progress"></div>
      </div>
    </div>
  );
}
