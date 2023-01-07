import React, { useState, useEffect } from 'react';
import '../assets/images/lines.png';

interface IBackground {
  size: number;
  xAmount: number;
  yAmount: number;
}

export default function Background() {
  const [bgProps, setBgProps] = useState({
    size: 0,
    xAmount: 1,
    yAmount: 1,
  });
  const [bgArray, setBgArray] = useState<Array<IBackground>>([]);

  function setBg() {
    let size = (window.innerWidth - 1270) / 2;

    let xAmount = 1;
    if (size >= 1200) {
      xAmount = 4;
    } else if (size < 1200 && size >= 900) {
      xAmount = 3;
    } else if (size < 900 && size >= 600) {
      xAmount = 2;
    }

    size = size / xAmount;

    const yAmount = Math.ceil(window.innerHeight / size);

    setBgProps({
      size,
      xAmount,
      yAmount,
    });
    const arr = [];
    for (let i = 0; i < xAmount * yAmount; i++) {
      arr.push(bgProps);
    }

    setBgArray(arr);
  }

  useEffect(() => {
    if (window.innerWidth > 1500) {
      setBg();
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1500) {
        setBg();
      }else{
        setBgArray([])
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="background"
      style={{
        gridTemplateColumns: `repeat(${bgProps.xAmount},${bgProps.size}px)`,
      }}
    >
      {bgArray.map((item, index) => {
        return (
          <img
            key={index}
            src={require('../assets/images/lines.png')}
            alt=""
            style={{ width: `${bgProps.size}px`, height: `${bgProps.size}px` }}
          />
        );
      })}
    </div>
  );
}
