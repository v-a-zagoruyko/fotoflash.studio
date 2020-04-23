import React from 'react';

import './PageNotFound.scss';

import webm from '../../assets/video/BackgroundVideo.webm';
import mp4 from '../../assets/video/BackgroundVideo.mp4';

export default () => {
  return (
    <section className="pageNotFound">
      <video className="pageNotFound-video" autoPlay playsInline loop muted>
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
      <span className="pageNotFound-error">404</span>
      <span className="pageNotFound-title">Страница не найдена</span>
    </section>
  );
};
