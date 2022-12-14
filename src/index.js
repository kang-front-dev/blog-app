import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import './styles/animation.scss'
import './assets/fonts/PeaceSans/stylesheet.css'
import './assets/fonts/Gilroy/stylesheet.css'

import './styles/style.scss'
import './styles/media/media.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
