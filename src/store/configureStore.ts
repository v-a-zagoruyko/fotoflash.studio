import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import jwt_decode from 'jwt-decode';

import { reducers } from './index';

const tokenExpiration = (store: any) => (next: { (arg0: any): void; (arg0: any): void }) => (action: any) => {
  if (localStorage.getItem('token')) {
    const token = jwt_decode(localStorage.getItem('token')!);
    if ((token as any).exp < Date.now() / 1000) {
      next(action);
      localStorage.clear();
    }
  }
  next(action);
};

export const store = createStore(reducers, applyMiddleware(thunk, tokenExpiration));
