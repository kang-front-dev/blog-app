import { useDispatch, useSelector } from 'react-redux';
interface IUseAuth {
  isAuth: boolean;
  userName: string;
  userEmail: string;
  handleAuth: (options: IAuth) => void;
}

interface IAuth {
  isAuth: boolean;
  userName: string;
  userEmail: string;
}
interface IReducerAuth {
  userReducer: {
    isAuth: boolean;
    userName: string;
    userEmail: string;
  };
}

export const useAuth = (): IUseAuth => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: IReducerAuth) => state.userReducer.isAuth);
  const userName = useSelector((state: IReducerAuth) => state.userReducer.userName);
  const userEmail = useSelector((state: IReducerAuth) => state.userReducer.userEmail);
  const handleAuth = (options: IAuth) => {
    dispatch({ type: 'SET_AUTH', payload: options.isAuth });
    dispatch({ type: 'SET_NAME', payload: options.userName });
    dispatch({ type: 'SET_EMAIL', payload: options.userEmail });
  };
  return { isAuth, userName, userEmail, handleAuth };
};
