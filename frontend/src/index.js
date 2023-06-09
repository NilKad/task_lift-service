import React from 'react';
import ReactDOM from 'react-dom/client';
import './fonts/7LED.ttf';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './components/BasesStyles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  // <BrowserRouter basename="/task_lift-service">
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
reportWebVitals();
