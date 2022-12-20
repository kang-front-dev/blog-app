import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import MainPage from './pages/MainPage';
import ReviewPage from './pages/ReviewPage';
import NewPost from './pages/NewPost';
import { globalContext } from './components/contexts/globalContext';
import { useState } from 'react';
import LogPage from './pages/LogPage';
import RegPage from './pages/RegPage';
import Profile from './pages/Profile';

function App() {
  const [isBurgerOpen,setIsBurgerOpen] = useState(false)
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  //SNACKBAR STATES
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  ////////
  //LOADING STATES
  const [isLoading,setIsLoading] = useState(false)
  ///////
  
  const contextValueNav = {
    isBurgerOpen: isBurgerOpen,
    setIsBurgerOpen: setIsBurgerOpen,
  };
  const contextValueSnackbar = {
    open: open,
    setOpen: setOpen,
    severity: severity,
    setSeverity: setSeverity,
    alertMessage: alertMessage,
    setAlertMessage: setAlertMessage,
  };
  const contextValueUser = {
    isAuth: isAuth,
    setIsAuth: setIsAuth,
    userEmail: userEmail,
    setUserEmail: setUserEmail,
    userName: userName,
    setUserName: setUserName,
  };
  const contextLoading = {
    isLoading: isLoading,
    setIsLoading: setIsLoading
  };
  return (
    <div className="App">
      <globalContext.Provider
        value={{
          ...contextValueNav,
          ...contextValueUser,
          ...contextValueSnackbar,
          ...contextLoading,
        }}
      >
        <Routes>
          <Route element={<Layout />}>
            <Route index path="/" element={<MainPage />}></Route>
            <Route index path="/review/:id" element={<ReviewPage />}></Route>
            <Route index path="/new" element={<NewPost />}></Route>
            <Route index path="/login" element={<LogPage />}></Route>
            <Route index path="/register" element={<RegPage />}></Route>
            <Route index path="/profiles/:name" element={<Profile />}></Route>
          </Route>
        </Routes>
      </globalContext.Provider>
    </div>
  );
}

export default App;
