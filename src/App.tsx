import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import MainPage from './pages/MainPage';
import ReviewPage from './pages/ReviewPage';
import NewPost from './pages/NewPost';
import { globalContext } from './components/contexts/globalContext';
import { useState } from 'react';
import LogPage from './pages/LogPage';
import RegPage from './pages/RegPage';

function App() {
  const [navTitle, setNavTitle] = useState('Reviews');
  const [isAuth, setIsAuth] = useState(false);

  //SNACKBAR STATES
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  //SNACKBAR STATES

  const contextValue = {
    navTitle: navTitle,
    setNavTitle: setNavTitle,
    isAuth: isAuth,
    setIsAuth: setIsAuth,
    open: open,
    setOpen: setOpen,
    severity: severity,
    setSeverity: setSeverity,
    alertMessage: alertMessage,
    setAlertMessage: setAlertMessage,
  };
  return (
    <div className="App">
      <globalContext.Provider value={contextValue}>
        <Routes>
          <Route element={<Layout />}>
            <Route index path="/" element={<MainPage />}></Route>
            <Route index path="/review/:id" element={<ReviewPage />}></Route>
            <Route index path="/new" element={<NewPost />}></Route>
            <Route index path="/login" element={<LogPage />}></Route>
            <Route index path="/register" element={<RegPage />}></Route>
          </Route>
        </Routes>
      </globalContext.Provider>
    </div>
  );
}

export default App;
