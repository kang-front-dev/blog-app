const defaultState = {
  open: false,
  severity: '',
  alertMessage: '',
};

export const snackbarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_OPEN':
      return { ...state, progress: action.payload };
    case 'SET_SEVERITY':
      return { ...state, progress: action.payload };
    case 'SET_MESSAGE':
      return { ...state, progress: action.payload };
    default:
      return state;
  }
};