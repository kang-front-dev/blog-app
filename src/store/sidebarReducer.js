const defaultState = {
  isSideBarOpen: false,
};

export const sidebarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_SIDEBAR_OPEN':
      return { ...state, isSideBarOpen: action.payload };
    default:
      return state;
  }
};