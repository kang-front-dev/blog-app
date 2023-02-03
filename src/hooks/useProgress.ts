import { useDispatch, useSelector } from 'react-redux';
interface IProgress {
  progress: number;
  startProgress: () => void;
  finishProgress: () => void;
}
interface IReducerProgress {
  progressReducer: {
    progress: number;
  };
}

export const useProgress = (): IProgress => {
  const dispatch = useDispatch();
  const progress = useSelector(
    (state: IReducerProgress) => state.progressReducer.progress
  );
  const startProgress = () => {
    dispatch({ type: 'SET_PROGRESS', payload: 20 });
  };
  const finishProgress = () => {
    dispatch({ type: 'SET_PROGRESS', payload: 90 });
    setTimeout(() => {
      dispatch({ type: 'SET_PROGRESS', payload: 100 });

      setTimeout(() => {
        dispatch({ type: 'SET_PROGRESS', payload: 0 });
      }, 100);
    }, 500);
  };
  return {
    progress,
    startProgress,
    finishProgress,
  };
};
