import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppContext } from './Context/AppContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContext.Provider value={{}}>
        <App />
      </AppContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
