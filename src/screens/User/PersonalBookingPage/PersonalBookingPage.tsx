import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import { IBooking, IUserBookingListSuccessAction } from '../../../store/user/types';
import { fetchUserBookingList } from '../../../store/user/action';

import { ProfileContainer } from '../../../containers';
import { Button } from '../../../components';

import styles from './PersonalBookingPage.module.scss';
import 'dayjs/locale/ru';

import { profileRoutes } from '../../index';

interface IPersonalBookingPageProps {
  bookingList?: IBooking[];
  isLoading?: boolean;
}

interface IPersonalBookingPageState {}

interface IPersonalBookingPageDispatch {
  fetchUserBookingList: () => Promise<IUserBookingListSuccessAction>;
}

type TPersonalBookingPage = IPersonalBookingPageProps & IPersonalBookingPageDispatch;

dayjs.locale('ru');
class PersonalBookingPage extends React.Component<TPersonalBookingPage> {
  public async componentDidMount() {
    const { fetchUserBookingList } = this.props;

    await fetchUserBookingList();
  }

  get BookingList() {
    const { bookingList } = this.props;

    if (bookingList && bookingList.length > 0) {
      return (
        <div className={styles['bookingContainer']}>
          {bookingList.map(x => {
            const { id, area, date, timeStart, timeEnd, photograph, price, isPayed } = x;

            return (
              <div key={`bookingCard${id}`} className={styles['bookingCard']}>
                <div className={styles['bookingCard-picture']} style={{ backgroundImage: `url(${area.cover})` }}>
                  <h6 className={styles['bookingCard-title']}>{area.title}</h6>
                </div>
                <div className={styles['bookingCard-body']}>
                  <h3 className={styles['bookingCard-caption']}>
                    Дата: <span>{dayjs(date).format('DD MMMM YYYY')}</span>
                  </h3>
                  <h3 className={styles['bookingCard-caption']}>
                    Время:&nbsp;
                    <span>
                      {dayjs()
                        .hour(Number(timeStart.substring(0, 2)))
                        .format('HH:00')}{' '}
                      {` ${
                        timeEnd
                          ? dayjs()
                              .hour(Number(timeEnd.substring(0, 2)))
                              .format('HH:00')
                          : ''
                      }`}
                    </span>
                  </h3>
                  {photograph && (
                    <h3 className={styles['bookingCard-caption']}>
                      Фотограф:&nbsp;
                      <span>{photograph.user}</span>
                    </h3>
                  )}
                  <h3 className={styles['bookingCard-caption']}>{price} ₽</h3>
                  <Button
                    style={{ marginTop: 10 }}
                    type="primary"
                    size="md"
                    text="Посмотреть фото"
                    title="Фотографии будут доступны после фотосессии"
                    isDisabled={true}
                  />
                  {!isPayed && (
                    <span className={styles['bookingCard-payment']}>
                      * Заказ не оплачен, мы оставляем за собой право удалить любой неоплаченный заказ в течение 30 минут после бронирования. По вопросам оплаты свяжитесь с нами по телефону указанному на сайте.
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div>
        <p className={styles['bookingCard-caption']}>К сожалению у вас пока нет бронирований</p>
        <Link to="/booking">
          <Button style={{ marginTop: 10 }} type="primary" size="md" text="Перейти к бронированию" />
        </Link>
      </div>
    );
  }

  public render() {
    const { isLoading } = this.props;

    return (
      <ProfileContainer isLoading={isLoading} routes={profileRoutes} tab="БРОНИРОВАНИЯ">
        <section className={styles['personalBookingContainer']}>
          <h3 className={styles['personalBookingContainer-title']}>МОИ БРОНИРОВАНИЯ</h3>
          {this.BookingList}
        </section>
      </ProfileContainer>
    );
  }
}

const mapStateToProps = (state: any) => {
  const list = state.userBookingList.status === 'SUCCESS' ? state.userBookingList.list : undefined;
  const isLoading = state.userBookingList.status === 'REQUESTING';

  return {
    bookingList: list,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserBookingList: () => dispatch(fetchUserBookingList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalBookingPage);
