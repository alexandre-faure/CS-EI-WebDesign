import React from 'react';
import './index.css';
import './icon/mfglabs_iconset.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('app')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
