import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Main from './App/Main';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Main />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
