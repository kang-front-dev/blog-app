import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import MainPage from './pages/MainPage';
import ReviewPage from './pages/ReviewPage';
import NewPost from './pages/NewPost';
import { globalContext } from './components/contexts/globalContext';
import { useState, useEffect } from 'react';
import LogPage from './pages/LogPage';
import RegPage from './pages/RegPage';
import Profile from './pages/Profile';
import CategoryPage from './pages/CategoryPage';
import { checkAuth } from './components/api/checkAuth';

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  //SNACKBAR STATES
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  ////////
  //LOADING STATES
  const [isLoading, setIsLoading] = useState(false);
  ///////

  const contextValueNav = {
    isSideBarOpen: isSideBarOpen,
    setIsSideBarOpen: setIsSideBarOpen,
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
    setIsLoading: setIsLoading,
  };
  async function checkToken() {
    const response = await checkAuth();
    if (response.success) {
      localStorage.setItem('token', response.accessToken);
      setIsAuth(true);
      setUserName(response.userData.name);
      setUserEmail(response.userData.email);
    }
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkToken();
    }
  }, []);

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
            <Route
              index
              path="/reviews/category/:category"
              element={<CategoryPage />}
            ></Route>
          </Route>
        </Routes>
      </globalContext.Provider>
    </div>
  );
}

export default App;
