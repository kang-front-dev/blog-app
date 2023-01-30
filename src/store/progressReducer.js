const defaultState = {
  progress: 0,
};

export const progressReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    default:
      return state;
  }
};
