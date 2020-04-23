import React, { ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import Loader from 'react-loader-spinner';

import { SvgIcon } from '../../components';
import { Footer } from '..';

import './MainContainer.scss';

import webm from '../../assets/video/BackgroundVideo.webm';
import mp4 from '../../assets/video/BackgroundVideo.mp4';
import logo from '../../assets/img/logoWhite.png';

interface IMainContainer {
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

export default (props: IMainContainer) => {
  const { children, isLoading } = props;

  return (
    <aside className="mainContainer">
      <div className="mainContainer-media">
        <video className="mainContainer-video" autoPlay playsInline loop muted>
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </video>
        <img className="mainContainer-picture" src={logo} alt="Логотип" />
        <SvgIcon className="mainContainer-icon" icon="down" type="black" size="18" />
      </div>
      <section className="mainContainer-body">
        <LoadingComponent isLoading={isLoading} />
        {children}
      </section>
      <Footer />
    </aside>
  );
};
