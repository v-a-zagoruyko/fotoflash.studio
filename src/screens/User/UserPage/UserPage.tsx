import React, { SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { IUser, IUserLoginSuccessAction, IUserCreateSuccessAction } from '../../../store/user/types';
import { loginUser, createUser } from '../../../store/user/action';

import { Input, Button } from '../../../components';

import logoBlack from '../../../assets/img/logoBlack.png';

import styles from './UserPage.module.scss';

interface IUserPageProps {
  history: any;
  user?: IUser;
  isLoading?: boolean;
}

interface IUserPageState {
  tab: 'login' | 'signup';
  email?: string;
  phone?: string;
  password?: string;
  repeatedPassword?: string;
  firstName?: string;
  lastName?: string;
}

interface IUserPageDispatch {
  loginUser: (userLogin: { email: string; password: string }) => Promise<IUserLoginSuccessAction>;
  createUser: (userSignUp: IUser) => Promise<IUserCreateSuccessAction>;
}

type TLoginPage = IUserPageProps & IUserPageDispatch;

class UserPage extends React.Component<TLoginPage> {
  public state: IUserPageState = {
    tab: 'login',
  };

  public handleFieldChange = (e: SyntheticEvent<HTMLInputElement>, fieldName: string) => {
    this.setState({ [fieldName]: e.currentTarget.value });
  };

  public handleUserLogin = () => {
    const { loginUser } = this.props;

    loginUser({ email: this.state.email!, password: this.state.password! });
  };

  public handleUserRegister = () => {
    const { createUser } = this.props;
    const signUpData = {
      first_name: this.state.firstName!,
      last_name: this.state.lastName!,
      email: this.state.email!,
      password: this.state.password!,
      profile: { phone: Number('7' + this.state.phone!.replace(/[^0-9]/g, '').substr(1)) },
    };

    if (this.state.password === this.state.repeatedPassword) {
      createUser(signUpData);
    } else {
      this.setState({ password: '', repeatedPassword: '' });
      toast.error('Введенные пароли не совпадают!');
    }
  };

  public handleChangeStage = () => {
    const { tab } = this.state;

    this.setState({ tab: tab === 'login' ? 'signup' : 'login' });
  };

  get Login() {
    const { isLoading } = this.props;
    const { email, password } = this.state;
    const isValid = email && email.length > 0 && password && password.length > 0;

    return (
      <>
        <Input
          onChange={e => this.handleFieldChange(e, 'email')}
          className={styles['userContainer-input']}
          type="text"
          value={email}
          label="Электропочта"
        />
        <Input
          onChange={e => this.handleFieldChange(e, 'password')}
          className={styles['userContainer-input']}
          type="password"
          value={password}
          label="Пароль"
        />
        <span className={styles['userContainer-link']} onClick={this.handleChangeStage}>
          Еще не зарегистрированы?
        </span>
        <Link to="/password-reset/confirm" className={styles['userContainer-link']}>
          Забыли пароль?
        </Link>
        <Button
          onClick={this.handleUserLogin}
          className={styles['userContainer-btn']}
          style={{ marginTop: 10 }}
          text={isLoading ? 'Загрузка...' : 'Войти'}
          title="Войти"
          type="primary"
          size="md"
          isDisabled={!isValid}
        />
        <Button
          onClick={this.props.history.goBack}
          className={styles['userContainer-btn']}
          text="Назад"
          title="Назад"
          type="textOnly"
          size="md"
        />
      </>
    );
  }

  get SignUp() {
    const { isLoading } = this.props;
    const { email, phone, password, repeatedPassword, firstName, lastName } = this.state;
    const isValid =
      email &&
      email.length > 0 &&
      phone &&
      phone.length > 0 &&
      password &&
      password.length > 0 &&
      repeatedPassword &&
      repeatedPassword.length > 0 &&
      firstName &&
      firstName.length > 0 &&
      lastName &&
      lastName.length > 0;

    return (
      <>
        <Input
          onChange={e => this.handleFieldChange(e, 'firstName')}
          className={styles['userContainer-input']}
          type="text"
          value={firstName}
          label="Имя"
        />
        <Input
          onChange={e => this.handleFieldChange(e, 'lastName')}
          className={styles['userContainer-input']}
          type="text"
          value={lastName}
          label="Фамилия"
        />
        <Input
          onChange={e => this.handleFieldChange(e, 'email')}
          className={styles['userContainer-input']}
          type="text"
          value={email}
          label="Электропочта"
        />
        <Input
          onChange={e => this.handleFieldChange(e, 'phone')}
          className={styles['userContainer-input']}
          type="number"
          value={phone}
          label="Номер телефона"
        />
        <Input
          onChange={e => this.handleFieldChange(e, 'password')}
          className={styles['userContainer-input']}
          type="password"
          value={password}
          label="Пароль"
        />
        <Input
          onChange={e => this.handleFieldChange(e, 'repeatedPassword')}
          className={styles['userContainer-input']}
          type="password"
          value={repeatedPassword}
          label="Повторите пароль"
        />
        <span className={styles['userContainer-link']} onClick={this.handleChangeStage}>
          Уже зарегистрированы?
        </span>
        <Link to="/password-reset/confirm" className={styles['userContainer-link']}>
          Забыли пароль?
        </Link>
        <Button
          onClick={this.handleUserRegister}
          className={styles['userContainer-btn']}
          style={{ marginTop: 10 }}
          text={isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
          title="Зарегистрироваться"
          type="primary"
          size="md"
          isDisabled={!isValid}
        />
        <Button
          onClick={this.props.history.goBack}
          className={styles['userContainer-btn']}
          text="Назад"
          title="Назад"
          type="textOnly"
          size="md"
        />
      </>
    );
  }

  public render() {
    const { tab } = this.state;

    return (
      <section className={styles['userContainer']}>
        <div className={styles['userContainer-form']}>
          <img src={logoBlack} alt="Логотип" className={styles['userContainer-picture']} />
          {tab === 'login' && this.Login}
          {tab === 'signup' && this.SignUp}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: any) => {
  const list = state.user.status === 'SUCCESS' ? state.user.list : undefined;
  const isLoading = state.user.status === 'REQUESTING';

  return {
    user: list,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  loginUser: (userLogin: any) => dispatch(loginUser(userLogin)),
  createUser: (userSignUp: any) => dispatch(createUser(userSignUp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
