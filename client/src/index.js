import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/userContext';
import Routes from "./routes";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <AppContextProvider>
          <Routes />
        </AppContextProvider>
      </BrowserRouter>
  </React.StrictMode>
);
