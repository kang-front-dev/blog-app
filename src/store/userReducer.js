const defaultState = {
  isAuth: false,
  userName: '',
  userEmail: '',
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return { ...state, isAuth: action.payload };
    case 'SET_NAME':
      return { ...state, userName: action.payload };
    case 'SET_EMAIL':
      return { ...state, userEmail: action.payload };
    default:
      return state;
  }
};
