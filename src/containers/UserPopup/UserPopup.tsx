import React, { FunctionComponent } from 'react';
import { history } from '../../utils/history';
import Button from '../../components/Button';

import './UserPopup.scss';

const UserPopup: FunctionComponent = () => {
  return (
    <div className="userPopup">
      <h6 className="userPopup-title">Упс..</h6>
      <p className="userPopup-description">
        Вы еще не авторизировались или не зарегистрировались на нашем сайте :(
        <br /> Для того чтобы завершить бронирование перейдите на страницу авторизации.
      </p>
      <Button
        onClick={() => history.push('/')}
        text="Войти или зарегистрироваться"
        title="Войти или зарегистрироваться"
        type="primary"
        style={{ marginTop: '15px', marginRight: '5px' }}
      />
    </div>
  );
};

export default UserPopup;
