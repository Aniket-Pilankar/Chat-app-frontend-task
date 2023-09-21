import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import GlobalProviders from './app/GlobalProviders';
import reportWebVitals from './reportWebVitals';
import registerInterceptors from './utils/request-interceptor';

registerInterceptors();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GlobalProviders>
      <App />
    </GlobalProviders>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
