import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { LightgalleryProvider } from 'react-lightgallery';

import * as serviceWorker from './serviceWorker';

import { CookiesPopup } from './containers';

import App from './App';

function Application() {
  return (
    <LightgalleryProvider>
      <App />
      <CookiesPopup />
    </LightgalleryProvider>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.register();
