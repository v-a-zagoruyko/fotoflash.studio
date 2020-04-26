import React from 'react';
import { Provider } from 'react-redux';
import { Router as ReactRouter, Route, Switch, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import { history } from './utils/history';
import { store } from './store/configureStore';

import {
  HomePage,
  NewsPage,
  StockPage,
  TeamPage,
  ContactsPage,
  BookingPage,
  UserPage,
  PersonalPage,
  PersonalBookingPage,
  PageNotFound,
  RestorePage,
} from './screens';

import '../src/styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/user', state: { from: props.location } }} />
      )
    }
  />
);

toast.configure();
const App = () => (
  <Provider store={store}>
    <ReactRouter history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/news" component={NewsPage} />
        <Route path="/stock" component={StockPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/contacts" component={ContactsPage} />
        <Route path="/booking" component={BookingPage} />
        <Route path="/user" component={UserPage} />
        <Route path="/password-reset/confirm" component={RestorePage} />

        <PrivateRoute exact path="/profile/personal" component={PersonalPage} />
        <PrivateRoute exact path="/profile/booking" component={PersonalBookingPage} />

        <Route component={PageNotFound} />
      </Switch>
    </ReactRouter>
  </Provider>
);

export default App;
