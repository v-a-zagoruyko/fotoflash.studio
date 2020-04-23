import React from 'react';
import { Link } from 'react-router-dom';

import './Nav.scss';

import logoBlack from '../../assets/img/logoBlack.png';

interface IRoute {
  title: string;
  link: string;
}

interface INav {
  routes: IRoute[];
}

export default (props: INav) => {
  const renderRoutes = () => {
    const { routes } = props;

    return routes.map((route, key) => {
      const { link, title } = route;

      return (
        <Link key={`route_${key}`} className="navList-link" to={link}>
          {title}
        </Link>
      );
    });
  };

  return (
    <nav className="navContainer">
      <Link to="/">
        <img className="navContainer-picture" src={logoBlack} alt="Логотип" />
      </Link>
      <div className="navList">
        <div className="navList-row">{renderRoutes()}</div>
        <div className="navList-row">
          <Link to="/profile/personal" className="navList-link navList-link_active">
            ЛИЧНЫЙ КАБИНЕТ
          </Link>
          <a className="navList-link" href="tel:+79222670055">
            +7-922-267-00-55
          </a>
        </div>
      </div>
    </nav>
  );
};
