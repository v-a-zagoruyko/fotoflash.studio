import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Loader from 'react-loader-spinner';
import Media from 'react-media';
import { history } from '../../utils/history';
import { SvgIcon } from '../../components';

import './ProfileContainer.scss';

import logo from '../../assets/img/logoBlack.png';
import logoSmall from '../../assets/img/logoSmallBlack.png';

interface IRoute {
  title: string;
  link: string;
}

interface IMinimizedRoute {
  title: string;
  link: string;
  icon:
    | 'ok'
    | 'back'
    | 'docs'
    | 'down'
    | 'location'
    | 'trash'
    | 'user'
    | 'instagram'
    | 'vk'
    | 'left'
    | 'right'
    | 'home'
    | 'camera'
    | 'signOut';
}

interface IProfileContainer {
  routes: IRoute[] | IMinimizedRoute[];
  tab: string;
  children?: ReactNode;
  isLoading?: boolean;
}

interface ILoadingContainer {
  isLoading?: boolean;
}

const LoadingComponent = (props: ILoadingContainer) => {
  const { isLoading } = props;

  return (
    <CSSTransition classNames="fade" timeout={500} mountOnEnter unmountOnExit in={isLoading}>
      <div className="loadingContainer">
        <Loader type="Oval" color="#6200EE" width={100} height={100} />
      </div>
    </CSSTransition>
  );
};

export default (props: IProfileContainer) => {
  const { children, isLoading } = props;
  const [isMinimized, toggleMinimized] = useState(false);

  const toggleNav = () => {
    toggleMinimized(!isMinimized);
  };

  const renderRoutes = () => {
    const { routes, tab } = props;

    return (routes as IRoute[]).map((route, key) => {
      const { link, title } = route;

      return (
        <Link key={`route_${key}`} className={`profileNav-link ${tab === title && 'profileNav-link_active'}`} to={link}>
          {title}
        </Link>
      );
    });
  };

  const renderMinimizedRoutes = () => {
    const { routes, tab } = props;

    return (routes as IMinimizedRoute[]).map((route, key) => {
      const { link, icon, title } = route;

      return (
        <Link
          key={`route_${key}`}
          className={`profileNav-link profileNav-link_mini ${tab === title && 'profileNav-link_active'}`}
          to={link}
        >
          <SvgIcon icon={icon!} type="black" size="18" />
        </Link>
      );
    });
  };

  const logOutUser = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <aside className="profileContainer">
      <Media
        queries={{
          minimized: '(max-width: 992px)',
        }}
      >
        {matches => (
          <nav className={`profileNav ${(isMinimized || matches.minimized) && 'profileNav_minimized'}`}>
            {matches.minimized ||
              (!isMinimized && (
                <>
                  <img src={logo} alt="Логотип" className="profileNav-picture" />
                  {renderRoutes()}
                  <Link className="profileNav-link" to="/">
                    НА ГЛАВНУЮ
                  </Link>
                  <span className="profileNav-link" onClick={logOutUser}>
                    ВЫЙТИ
                  </span>
                </>
              ))}
            {(matches.minimized || isMinimized) && (
              <>
                <img src={logoSmall} alt="Логотип" className="profileNav-picture" />
                {renderMinimizedRoutes()}
                <Link className="profileNav-link profileNav-link_mini" to="/">
                  <SvgIcon icon={'home'} type="black" size="18" />
                </Link>
                <span className="profileNav-link profileNav-link_mini" onClick={logOutUser}>
                  <SvgIcon icon={'signOut'} type="black" size="18" />
                </span>
              </>
            )}
            <span className="profileNav-btn" onClick={toggleNav}>
              <SvgIcon icon={isMinimized ? 'right' : 'left'} type="black" size="18" />
            </span>
          </nav>
        )}
      </Media>
      <section className="profileContainer-body">
        <LoadingComponent isLoading={isLoading} />
        {children}
      </section>
    </aside>
  );
};
