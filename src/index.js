import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Main from './App/Main';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <CookiesProvider>
        <Main />
      </CookiesProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
