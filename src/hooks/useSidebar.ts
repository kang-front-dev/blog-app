import { useDispatch, useSelector } from 'react-redux';
interface ISideBar {
  isSideBarOpen: boolean;
  handleSideBarOpen: () => void;
  handleSideBarClose: () => void;
}
interface IReducerSideBar {
  sidebarReducer: {
    isSideBarOpen: boolean;
    handleSideBarOpen: () => void;
    handleSideBarClose: () => void;
  };
}

export const useSideBar = (): ISideBar => {
  const dispatch = useDispatch();
  const isSideBarOpen = useSelector(
    (state: IReducerSideBar) => state.sidebarReducer.isSideBarOpen
  );
  const handleSideBarOpen = () => {
    dispatch({ type: 'SET_SIDEBAR_OPEN', payload: true });
  };
  const handleSideBarClose = () => {
    dispatch({ type: 'SET_SIDEBAR_OPEN', payload: false });
  };
  return {
    isSideBarOpen,
    handleSideBarOpen,
    handleSideBarClose,
  };
};
