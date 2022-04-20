import React, { SyntheticEvent } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { Input, Button } from '../../../components';
import { history } from '../../../utils/history';

import logoBlack from '../../../assets/img/logoBlack.png';

import styles from './RestorePage.module.scss';

interface IUserPageProps {
  history: any;
}

interface IUserPageState {
  email?: string;
  uid?: string;
  token?: string;
  new_password1?: string;
  new_password2?: string;
}

class RestorePage extends React.Component<IUserPageProps, IUserPageState> {
  location = window.location.pathname.split('/');

  state: IUserPageState = {
    uid: this.location[3],
    token: this.location[4],
  };

  public handleFieldChange = (e: SyntheticEvent<HTMLInputElement>, fieldName: string) => {
    this.setState({ [fieldName]: e.currentTarget.value });
  };

  public handleRestorePassword = async () => {
    const { email } = this.state;

    try {
      await axios({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: { email },
        url: `http://194.67.121.29/user/password/reset/`,
      });

      toast.success(`Письмо с инструкцией отправлено на ${email}`);
    } catch (error) {
      toast.error(error.response.data.detail);
      console.error(error.response.data.detail);
    }
  };

  handleChangePassword = async () => {
    const { uid, token, new_password1, new_password2 } = this.state;
    try {
      await axios({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: { uid, token, new_password1, new_password2 },
        url: `http://194.67.121.29/user/password/reset/confirm/`,
      });

      history.push('/user');
      toast.success('Пароль успешно изменен!');
    } catch (error) {
      toast.error(error.response.data.detail);
      console.error(error.response.data.detail);
    }
  };

  public render() {
    const { email, new_password1, new_password2 } = this.state;

    if (this.location.length !== 6) {
      return (
        <section className={styles['userContainer']}>
          <div className={styles['userContainer-form']}>
            <img src={logoBlack} alt="Логотип" className={styles['userContainer-picture']} />
            <Input
              onChange={e => this.handleFieldChange(e, 'email')}
              className={styles['userContainer-input']}
              type="text"
              value={email}
              label="Электропочта"
            />
            <Button
              onClick={this.handleRestorePassword}
              className={styles['userContainer-btn']}
              style={{ marginTop: 10 }}
              text={'Восстановить пароль'}
              title="Восстановить пароль"
              type="primary"
              size="md"
              isDisabled={!email}
            />
          </div>
        </section>
      );
    }

    return (
      <section className={styles['userContainer']}>
        <div className={styles['userContainer-form']}>
          <img src={logoBlack} alt="Логотип" className={styles['userContainer-picture']} />
          <Input
            onChange={e => this.handleFieldChange(e, 'new_password1')}
            className={styles['userContainer-input']}
            type="password"
            value={new_password1}
            label="Пароль"
          />
          <Input
            onChange={e => this.handleFieldChange(e, 'new_password2')}
            className={styles['userContainer-input']}
            type="password"
            value={new_password2}
            label="Повторите пароль"
          />
          <Button
            onClick={this.handleChangePassword}
            className={styles['userContainer-btn']}
            style={{ marginTop: 10 }}
            text={'Изменить пароль'}
            title="Изменить пароль"
            type="primary"
            size="md"
            isDisabled={!new_password1 || new_password1 !== new_password2}
          />
        </div>
      </section>
    );
  }
}

export default RestorePage;
