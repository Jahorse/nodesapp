import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Main from './App/Main';
import ViewportProvider from './App/Utils/Hooks';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <CookiesProvider>
        <ViewportProvider>
          <Main />
        </ViewportProvider>
      </CookiesProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
