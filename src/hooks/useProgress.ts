import { useState } from 'react';

interface IProgress {
  progress: number;
  startProgress: () => void;
  finishProgress: () => void;
}

export const useProgress = (): IProgress => {
  const [progress, setProgress] = useState(0);
  const startProgress = () => {
    setProgress(20)
  }
  const finishProgress = () => {
    setProgress(90);
    setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
      }, 100);
    }, 500);
  };
  return {
    progress,
    startProgress,
    finishProgress,
  };
};
