import { Route, Routes } from 'react-router-dom';

import { useEffect } from 'react';

import Layout from './pages/Layout';
import MainPage from './pages/MainPage';
import ReviewPage from './pages/ReviewPage';
import NewPost from './pages/NewPost';
import LogPage from './pages/LogPage';
import RegPage from './pages/RegPage';
import Profile from './pages/Profile';
import CategoryPage from './pages/CategoryPage';
import TagsPage from './pages/TagsPage';
import SearchPage from './pages/SearchPage';

import { checkAuth } from './api/checkAuth';

import { useSnackbar } from './hooks/useSnackbar';
import { useAuth } from './hooks/useAuth';

function App() {
  const { handleAuth } = useAuth();
  const { handleSnackbarOpen } = useSnackbar();

  async function checkToken() {
    const response = await checkAuth();
    if (response.success) {
      localStorage.setItem('token', response.accessToken);
      handleAuth({
        isAuth: true,
        userName: response.userData.name,
        userEmail: response.userData.email,
      });
      handleSnackbarOpen('success', 'Welcome back!');
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
            <Route index path="/search" element={<SearchPage />}></Route>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
