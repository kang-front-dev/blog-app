import React, { useState } from 'react';

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

export const useAuth = (): IUseAuth => {
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const handleAuth = (options: IAuth) => {
    setIsAuth(options.isAuth);
    setUserName(options.userName);
    setUserEmail(options.userEmail);
  };
  return { isAuth, userName, userEmail, handleAuth };
};
