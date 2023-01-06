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
import { checkAuth } from './api/checkAuth';
import TagsPage from './pages/TagsPage';
import { useSnackbar } from './hooks/useSnackbar';
import { useAuth } from './hooks/useAuth';

function App() {

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const { isAuth, userName, userEmail, handleAuth } = useAuth();

  const { open, severity, alertMessage, handleSnackbarOpen,handleSnackbarClose } = useSnackbar();

  const contextValueNav = {
    isSideBarOpen,
    setIsSideBarOpen,
    progress,
    setProgress,
  };
  const contextValueSnackbar = {
    open,
    severity,
    alertMessage,
    handleSnackbarOpen,
    handleSnackbarClose,
  };
  const contextValueUser = {
    isAuth,
    userEmail,
    userName,
    handleAuth,
  };

  async function checkToken() {
    const response = await checkAuth();
    if (response.success) {
      localStorage.setItem('token', response.accessToken);
      handleAuth({
        isAuth: true,
        userName: response.userData.name,
        userEmail: response.userData.email,
      });
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('id');
      localStorage.removeItem('token');
    }
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkToken();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <globalContext.Provider
        value={{
          ...contextValueNav,
          ...contextValueUser,
          ...contextValueSnackbar,
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
              path="/category/:category"
              element={<CategoryPage />}
            ></Route>
            <Route index path="/tags" element={<TagsPage />}></Route>
          </Route>
        </Routes>
      </globalContext.Provider>
    </div>
  );
}

export default App;
