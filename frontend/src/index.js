// entrypoint for React application, where App component is rendered 
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// add this
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
