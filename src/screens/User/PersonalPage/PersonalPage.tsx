import React, { SyntheticEvent } from 'react';
import { connect } from 'react-redux';

import { IUser, IUserFetchSuccessAction, IUserPatchSuccessAction } from '../../../store/user/types';
import { fetchUser, patchUser } from '../../../store/user/action';

import { ProfileContainer } from '../../../containers';
import { Input, Button } from '../../../components';

import styles from './PersonalPage.module.scss';

import { profileRoutes } from '../../index';

interface IPersonalPageProps {
  profile?: IUser;
  isLoading?: boolean;
}

interface IPersonalPageState {
  user: IUser;
}

interface IPersonalPageDispatch {
  fetchUser: () => Promise<IUserFetchSuccessAction>;
  patchUser: (user: IUser) => Promise<IUserPatchSuccessAction>;
}

type TPersonalPage = IPersonalPageProps & IPersonalPageDispatch;

const cardName = {
  CLASSIC: 'Классическая карта',
  SILVER: 'Серебряная карта',
  GOLD: 'Золотая карта',
  PLATINUM: 'Платиновая карта',
} as any;

const cardDesc = {
  CLASSIC: 'Накапливает 3% бонусов от общей суммы заказа',
  SILVER: 'Накапливает 7% бонусов от общей суммы заказа',
  GOLD: 'Накапливает 15% бонусов от общей суммы заказа',
  PLATINUM: 'Накапливает 20% бонусов от общей суммы заказа',
} as any;

class PersonalPage extends React.Component<TPersonalPage> {
  public state: IPersonalPageState = {
    user: {
      email: '',
      first_name: '',
      last_name: '',
      profile: {},
    },
  };

  public async componentDidMount() {
    const { fetchUser } = this.props;

    await fetchUser();

    this.setState({ user: { ...this.props.profile! } });
  }

  public handleFieldChange = (e: SyntheticEvent<HTMLInputElement>, fieldName: string) => {
    this.setState({ [fieldName]: e.currentTarget.value });
  };

  public handleSubfieldChange = (e: SyntheticEvent<HTMLInputElement>, fieldName: string) => {
    this.setState({
      user: { ...this.state.user, profile: { ...this.state.user.profile, [fieldName]: e.currentTarget.value } },
    });
  };

  public handlePatchUser = async () => {
    const { patchUser } = this.props;

    await patchUser(this.state.user);
  };

  public render() {
    const { isLoading } = this.props;
    const { user } = this.state;

    return (
      <ProfileContainer isLoading={isLoading} routes={profileRoutes} tab="ПРОФИЛЬ">
        <section className={styles['personalContainer']}>
          <h3 className={styles['personalContainer-title']}>{`${user.first_name} ${user.last_name}`}</h3>
          {this.props.profile?.profile?.card && (<><div title={cardDesc[this.props.profile!.profile!.card!.type as any] as any} className={`${styles['personalContainer-card']} ${this.props.profile!.profile!.card!.type}`}>
            <span>{cardName[this.props.profile!.profile!.card!.type as any] as any}</span>
            <span>{this.props.profile?.profile?.card?.balance} баллов</span>
          </div><span className={styles['personalContainer-cardinfo']}>{cardDesc[this.props.profile!.profile!.card!.type as any] as any}</span></>)}
          <h3 className={styles['personalContainer-subtitle']}>Личные данные</h3>
          <Input
            onChange={e => this.handleFieldChange(e, 'first_name')}
            className={styles['personalContainer-input']}
            type="text"
            value={user.first_name}
            label="Имя"
          />
          <Input
            onChange={e => this.handleFieldChange(e, 'last_name')}
            className={styles['personalContainer-input']}
            type="text"
            value={user.last_name}
            label="Фамилия"
          />
          <Input
            onChange={e => this.handleFieldChange(e, 'email')}
            className={styles['personalContainer-input']}
            type="text"
            value={user.email}
            label="Электропочта"
          />
          <Input
            onChange={e => this.handleSubfieldChange(e, 'phone')}
            className={styles['personalContainer-input']}
            type="number"
            value={user.profile ? user.profile.phone : ''}
            label="Телефон"
          />
          {/* <Input
            onChange={e => this.handleSubfieldChange(e, 'passport')}
            className={styles['personalContainer-input']}
            type="text"
            value={user.profile ? user.profile.passport : ''}
            label="Серия и номер паспорта"
          />
          <Input
            onChange={e => this.handleSubfieldChange(e, 'snils')}
            className={styles['personalContainer-input']}
            type="text"
            value={user.profile ? user.profile.snils : ''}
            label="СНИЛС"
          />
          <Button
            onClick={this.handlePatchUser}
            className={styles['personalContainer-btn']}
            text={isLoading ? 'Загрузка...' : 'Сохранить'}
            title="Сохранить"
            type="primary"
            size="md"
          /> */}
        </section>
      </ProfileContainer>
    );
  }
}

const mapStateToProps = (state: any) => {
  const list = state.user.status === 'SUCCESS' ? state.user.user : undefined;
  const isLoading = state.user.status === 'REQUESTING' || state.userPatch.status === 'REQUESTING';

  return {
    profile: list,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchUser: () => dispatch(fetchUser()),
  patchUser: (user: any) => dispatch(patchUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalPage);
