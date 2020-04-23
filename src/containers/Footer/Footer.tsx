import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

import logoBlack from '../../assets/img/logoBlack.png';

export default () => {
  return (
    <footer className="footerContainer">
      <Link to="/">
        <img className="footerContainer-picture" src={logoBlack} alt="Логотип" />
      </Link>
      <div className="footerNav">
        <h6 className="footerNav-title">Социальные сети:</h6>
        <a className="footerNav-link" href="https://bit.ly/2Zy59Gp">
          VK
        </a>
        <a className="footerNav-link" href="https://bit.ly/34cHcE3">
          INSTAGRAM
        </a>
      </div>
      <div className="footerNav">
        <h6 className="footerNav-title">Контакты:</h6>
        <a className="footerNav-link" href="https://bit.ly/359ypm4">
          Зоологическая, 31
        </a>
        <a className="footerNav-link" href="mailto:info@fotoflash.studio">
          info@fotoflash.studio
        </a>
        <a className="footerNav-link" href="tel:+79222670055">
          +7-922-267-00-55
        </a>
      </div>
    </footer>
  );
};
