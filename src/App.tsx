import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout'
import MainPage from './pages/MainPage'
import ReviewPage from './pages/ReviewPage'
import NewPost from './pages/NewPost'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout/>}>
          <Route index path='/' element={<MainPage/>}></Route>
          <Route index path='/review/:id' element={<ReviewPage/>}></Route>
          <Route index path='/new' element={<NewPost/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
