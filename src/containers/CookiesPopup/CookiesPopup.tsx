import React, { FunctionComponent, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Button from '../../components/Button';

import './CookiesPopup.scss';

const CookiesPopup: FunctionComponent = () => {
  const [isCookiesAccepted, setCookiesAccept] = useState(!!!localStorage.getItem('cookies'));

  const handleCookiesAccept = () => {
    localStorage.setItem('cookies', 'agreed');
    setCookiesAccept(!isCookiesAccepted);
  };

  return (
    <CSSTransition classNames="fade" timeout={500} mountOnEnter unmountOnExit in={isCookiesAccepted}>
      <div className="cookiesPopup">
        <h6 className="cookiesPopup-title">Привет</h6>
        <p className="cookiesPopup-description">
          Мы сохраняем файлы cookie: это помогает сайту работать лучше. Подробности в&nbsp;
          <a href="https://google.com">Политике конфиденциальности</a>
        </p>
        <Button
          onClick={handleCookiesAccept}
          text="Я согласен"
          title="Я согласен"
          type="primary"
          style={{ marginTop: '15px', marginRight: '5px' }}
        />
        <a href="https://google.com">
          <Button text="Покинуть сайт" title="Покинуть сайт" type="secondary" style={{ marginTop: '15px' }} />
        </a>
      </div>
    </CSSTransition>
  );
};

export default CookiesPopup;
