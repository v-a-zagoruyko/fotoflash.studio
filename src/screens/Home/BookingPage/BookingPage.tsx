import React from 'react';
import { connect } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import Slider from 'react-slick';
import dayjs, { Dayjs } from 'dayjs';
import { toast } from 'react-toastify';
import { history } from '../../../utils/history';
import { sha256 } from 'js-sha256';
import axios from 'axios';
import { IArea, IAreaListSuccessAction } from '../../../store/area/types';
import { IStock, IStockListSuccessAction, IServicesListSuccessAction } from '../../../store/stock/types';
import { ITeam, ITeamListSuccessAction } from '../../../store/team/types';
import { IBooking, IUserBookingCreateSuccessAction, IUserBookingTimeSuccessAction } from '../../../store/user/types';
import { fetchAreaList } from '../../../store/area/action';
import { IUser, IUserFetchSuccessAction } from '../../../store/user/types';
import { fetchUser } from '../../../store/user/action';
import { fetchStockList, fetchServicesList } from '../../../store/stock/action';
import { fetchTeamList } from '../../../store/team/action';
import { createUserBooking, fetchUserBookingTime } from '../../../store/user/action';

import { MainContainer, Nav, UserPopup } from '../../../containers';
import { Button, Dropdown, SvgIcon, Chip } from '../../../components';

import styles from './BookingPage.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import 'lightgallery.js/dist/css/lightgallery.css';
import 'dayjs/locale/ru';
import ru from 'date-fns/locale/ru';

import { routes } from '../../index';

interface IBookingPageProps {
  profile?: IUser;
  area?: IArea[];
  stock?: IStock[];
  services?: IStock[];
  staff?: ITeam[];
  time?: IBooking[];
  isLoading?: boolean;
}

interface IBookingPageState {
  running: boolean;
  bonus: number;
  stockCategory?: string;
  stockCart: number[];
  servicesCategory?: string;
  servicesCart: number[];
  area: number;
  photograph: number | null;
  date: Dayjs;
  start?: Dayjs | null;
  end?: Dayjs | null;
}

interface IBookingPageDispatch {
  fetchUser: () => Promise<IUserFetchSuccessAction>;
  fetchAreaList: () => Promise<IAreaListSuccessAction>;
  fetchStockList: () => Promise<IStockListSuccessAction>;
  fetchServicesList: () => Promise<IServicesListSuccessAction>;
  fetchTeamList: () => Promise<ITeamListSuccessAction>;
  createUserBooking: (booking: IBooking) => Promise<IUserBookingCreateSuccessAction>;
  fetchUserBookingTime: (date: string, area: number) => Promise<IUserBookingTimeSuccessAction>;
}

type TBookingPage = IBookingPageProps & IBookingPageDispatch;

dayjs.locale('ru');
registerLocale('ru', ru);
class BookingPage extends React.Component<TBookingPage> {
  public state: IBookingPageState = {
    running: false,
    bonus: 0,
    area: 0,
    photograph: null,
    date: dayjs(),
    stockCart: [],
    servicesCart: [],
  };

  public async componentDidMount() {
    const { fetchUser, fetchAreaList, fetchStockList, fetchServicesList, fetchTeamList } = this.props;

    await fetchUser();
    await fetchAreaList();
    await fetchStockList();
    await fetchServicesList();
    await fetchTeamList();
  }

  public setSelectedArea = async (id: number) => {
    const { fetchUserBookingTime } = this.props;
    if (this.state.area !== id) {
      await fetchUserBookingTime(this.state.date.format('YYYY-MM-DD'), id);
    }
    this.setState({ area: this.state.area === id ? 0 : id });
  };

  public setSelectedDate = async (date: Date) => {
    const { fetchUserBookingTime } = this.props;
    if (this.state.area !== 0) {
      await fetchUserBookingTime(dayjs(date).format('YYYY-MM-DD'), this.state.area);
    }
    this.setState({ date: dayjs(date) });
  };

  public setSelectedTime = (time: Dayjs) => {
    if (this.state.end) {
      this.setState({ start: this.state.date.hour(time.hour()), end: null });
    } else if (this.state.start) {
      this.setState(
        { end: this.state.date.hour(time.hour()) },
        () =>
          (this.state.start!.hour() === 0 ? 24 : this.state.start!.hour()) >
            (this.state.end!.hour() === 0 ? 24 : this.state.end!.hour()) &&
          this.setState({ start: this.state.end, end: this.state.start })
      );
      // if (this.props.time) {
      //   this.props.time.map(x => {
      //     if (
      //       dayjs()
      //         .set('hour', Number(x.timeStart.substring(0, 2)))
      //         .isAfter(this.state.start!, 'hour') &&
      //       dayjs()
      //         .set('hour', Number(x.timeStart.substring(0, 2)))
      //         .isBefore(time.hour(), 'hour')
      //     ) {
      //       console.log(1);
      //     }
      //   });
      // }
    } else {
      this.setState({ start: this.state.date.hour(time.hour()) });
    }
  };

  public setStockCategory = (category: string) => {
    this.setState({ stockCategory: category.toUpperCase() });
  };

  public setServicesCategory = (category: string) => {
    this.setState({ servicesCategory: category.toUpperCase() });
  };

  public setSelectedPhotograph = (id: number | null) => {
    this.setState({ photograph: id });
  };
  
  public setBonus = (e: any) => {
    this.setState({ bonus: e.target.value });
  };

  public toggleStockCart = (id: number) => {
    this.setState({
      stockCart: this.state.stockCart.includes(id)
        ? this.state.stockCart.filter(x => x !== id)
        : [...this.state.stockCart, id],
    });
  };

  public toggleServicesCart = (id: number) => {
    this.setState({
      servicesCart: this.state.servicesCart.includes(id)
        ? this.state.servicesCart.filter(x => x !== id)
        : [...this.state.servicesCart, id],
    });
  };

  public createBooking = async (price: number) => {
    this.setState({ running: true });

    const { profile, area } = this.props;
    const { area: area_, bonus, date, start, end, photograph, stockCart, servicesCart } = this.state;

    const areaTitle = area?.find(x => x.id === area_);
    const bonus_ = profile?.profile?.card && (bonus <= (price - 1)) && bonus <= profile.profile!.card!.balance ? bonus : 0;
    let orderId = -1;

    const bookingData = {
      area: area_,
      bonus: bonus_,
      date: date.format('YYYY-MM-DD'),
      timeStart: start!.format('HH:00:00'),
      timeEnd: end ? end.add(1, 'hour').format('HH:00:00') : start!.add(1, 'hour').format('HH:00:00'),
      photograph: photograph,
      stock: stockCart,
      services: servicesCart,
      price,
    } as any;

    if (localStorage.getItem('token') && profile) {
      try {
        const { data } = await axios.post('http://68.183.201.128:8080/api/booking/', bookingData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
        });

        orderId = data[0];
      } catch (error) {
        toast.error(error.response.data[Object.keys(error.response.data)[0]][0]);
      }
    } else {
      toast.error('Для того чтобы совершить бронирование необходимо авторизоваться в личном кабинете');
      history.push('/user');
    }


    /*
      @ Tinkoff
    */
    const term = '1577093382823DEMO';
    //  const term = '1577093382823';
    const pass = '1fd2w4t3tjkum7bi';
    //  const pass = 'b8guw9it0gacdjn4';
    const token = sha256(`${String(price * 100)}Аренда фотостудии${String(1000)}${pass}${term}`)

    try {
    const { data } = await axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        Token: token,
        TerminalKey: term,
        NotificationURL: 'http://68.183.201.128:8080/api/locationrentstatus/',
        OrderId: String(orderId),
        Description: `Аренда фотостудии - ${areaTitle?.title} на ${date.format('DD-MMMM-YYYY')}`,
        Amount: (price - bonus_) * 100,
        Receipt: {
          Email: profile?.email,
          Phone: profile?.profile?.phone,
          EmailCompany: 'info@fotoflash.studio',
          Taxation: 'osn',
          Items: [{ Name: 'Аренда фотостудии и оборудования', Quantity: 1, Amount: (price - bonus_) * 100, Price: (price - bonus_) * 100, Tax: 'none' }]
        }
    },
      url: `https://securepay.tinkoff.ru/v2/Init`,
    });
      window.open(data.PaymentURL,"_self");
      // history.push('/profile/booking')
    } catch (error) {
      this.setState({ running: false });
      toast.error(error.response.data.message);
      console.error(error.response.data);
    }
    /*
      @ Tinkoff
    */

   this.setState({ running: false });
  };

  get Area() {
    const { area } = this.props;

    if (area) {
      return (
        <div className={styles['areaGrid']}>
          {area.map(x => {
            const { id, title, text, cover } = x;
            const gallery = x.gallery ? [cover, ...x.gallery.map(x => x.image)] : [cover];
            const settings = {
              arrows: false,
              autoplay: true,
              touchMove: false,
              pauseOnHover: false,
              pauseOnFocus: false,
              swipeToSlide: false,
              autoplaySpeed: 2000,
            };

            return (
              <div
                key={`area${id}`}
                className={`${styles['area-card']} ${this.state.area === id && styles['area-card--active']} ${gallery.length <= 1 && styles['area-card--disabled']}`}
                onClick={gallery.length > 1 ? () => this.setSelectedArea(id) : undefined}
              >
                <div className={styles['area-card__gallery']}>
                  <Slider {...settings}>
                    {this.state.area === id && gallery.map((x, idx) => (
                      <div key={idx} className={styles['area-card__slide']}>
                        <img className={styles['area-card__img']} src={x} alt="" />
                      </div>
                    ))}
                    {this.state.area !== id && <div className={styles['area-card__slide']}>
                      <img className={styles['area-card__img']} src={cover} alt="" />
                    </div>}
                  </Slider>
                </div>
                <div className={styles['area-card__info']} dangerouslySetInnerHTML={{ __html: text }} />
                <div className={styles['area-card__title']}>{title}</div>
              </div>
            )
          })}
        </div>
      );
    }

    return null;
  }

  get Date() {
    const { date } = this.state;

    return (
      <>
        <div className={styles['dateGrid']}>
          <SvgIcon className={styles['dateGrid-icon']} icon="calendar" type="black" size="18" />
          <DatePicker
            onChange={date => this.setSelectedDate(date || new Date())}
            className={styles['dateGrid-date']}
            minDate={new Date()}
            selected={new Date(date.format())}
            dateFormat="d MMMM yyyy"
            locale="ru"
            showPopperArrow={false}
            withPortal={true}
          />
        </div>
      </>
    );
  }

  get Time() {
    const { date, start, end } = this.state;
    const area = this.props.area && this.props.area.filter(x => x.id === this.state.area)[0];
    const isWeekend = date.day() % 6 === 0 || date.day() % 5 === 0;
    const time = Array.apply(null, Array(15)).map((x, idx) => dayjs().hour(idx + 9));

    if (area) {
      let price = area.rentCost;
      let priceLatetime = area.rentCostLateTime;
      let priceWeekend = area.rentCostWeekend;

      if (area.timeRange) {
        const timeRange = area.timeRange.filter(
          x => dayjs(date).isAfter(dayjs(x.dateStart)) && dayjs(date).isBefore(dayjs(x.dateEnd))
        );

        if (timeRange.length > 0) {
          price = timeRange[0].rentCost;
          priceLatetime = timeRange[0].rentCostLateTime;
          priceWeekend = timeRange[0].rentCostWeekend;
        }
      }

      return (
        <>
          <div className={styles['timeGrid']}>
            {time.map((x, idx) => {
              let isAvailable = true;
              const isActive = (start && start.hour() === x.hour()) || (end && end.hour() === x.hour());
              const isBetween =
                start && end && x.hour() > start.hour() && x.hour() < (end.hour() === 0 ? 24 : end.hour());
              const isLatetime = x.hour() >= 22 || x.hour() === 0;
              const total = price + (isLatetime ? priceLatetime : 0) + (isWeekend ? priceWeekend : 0);
              if (this.props.time) {
                if ((this.props.time as any).includes(x.hour())) {
                  isAvailable = false;
                }
                // this.props.time.map(y => {
                //   // console.log(x.hour());
                //   // if (x.hour()) {
                //   //   isAvailable = false;
                //   // }
                //   // if (
                //   //   x.hour() ===
                //   //     dayjs()
                //   //       .set('hour', Number(y.timeStart.substring(0, 2)))
                //   //       .hour() ||
                //   //   (y.timeStart &&
                //   //     y.timeEnd &&
                //   //     x.hour() >
                //   //       dayjs()
                //   //         .set('hour', Number(y.timeStart.substring(0, 2)))
                //   //         .hour() &&
                //   //     x.hour() <=
                //   //       (dayjs()
                //   //         .set('hour', Number(y.timeEnd.substring(0, 2)))
                //   //         .hour() === 0
                //   //         ? 24
                //   //         : dayjs()
                //   //             .set('hour', Number(y.timeEnd.substring(0, 2)))
                //   //             .add(-1, 'hour')
                //   //             .hour()))
                //   // ) {
                //   //   isAvailable = false;
                //   // }
                // });
              }

              return (
                <div
                  key={`timeCard${idx}`}
                  className={`${styles['timeCard']}
                  ${isActive && styles['timeCard_active']}
                  ${isBetween && styles['timeCard_between']}
                  ${!isAvailable && styles['timeCard_between']}`}
                  onClick={isAvailable ? () => this.setSelectedTime(x) : undefined}
                >
                  <span className={styles['timeCard-caption']}>{x.format('HH:00')}</span>
                  <span className={styles['timeCard-caption']}>{x.add(1, 'hour').format('HH:00')}</span>
                  <span className={styles['timeCard-price']}>{`${total} ˙₽`}</span>
                </div>
              );
            })}
          </div>
        </>
      );
    }

    return (
      <>
        <div className={styles['timeGrid']}>
          {time.map((x, idx) => {
            return (
              <div
                key={`_timeCard${idx}`}
                className={`${styles['timeCard']}
                ${styles['timeCard_between']}`}
                onClick={() => toast.warn('Сначала выберите студию!')}
              >
                <span className={styles['timeCard-caption']}>{x.format('HH:00')}</span>
                <span className={styles['timeCard-caption']}>{x.add(1, 'hour').format('HH:00')}</span>
                <span className={styles['timeCard-price']} />
              </div>
            );
          })}
        </div>
      </>
    );
  }

  get Stock() {
    const { stock } = this.props;
    const { stockCategory } = this.state;

    if (stock) {
      const stockList = Array.from(new Set(stock.map(x => x.kind)));
      const category = stockCategory || stockList[0].toUpperCase();

      return (
        <div className={styles['stockContainer']}>
          {/* <h3 className={styles['bookingContainer-title']}>Выберите оборудование:</h3> */}
          <Dropdown onClick={this.setStockCategory} text={category} options={stockList} />
          <div className={styles['stockGrid']}>
            {stock
              .filter(x => x.kind.toUpperCase() === category)
              .map(x => {
                const { id, title, text, qty, rentCostPerHour, cover } = x;

                return (
                  <div
                    key={`stockCard${id}`}
                    className={`${styles['stockCard']}
                    ${Number(qty) === 0 && styles['stockCard_disabled']}`}
                  >
                    <div className={styles['stockCard-picture']} style={{ backgroundImage: `url(${cover})` }} />
                    <div className={styles['stockCard-body']}>
                      <h6 className={styles['stockCard-title']}>{title}</h6>
                      <div className={styles['stockCard-wysiwyg']} dangerouslySetInnerHTML={{ __html: text }} />
                      {rentCostPerHour > 0 && (
                        <span className={styles['stockCard-price']}>{`${rentCostPerHour} ˙₽ / час`}</span>
                      )}
                      <Button
                        style={{ marginTop: 5, width: '100%' }}
                        type={this.state.stockCart.includes(id) ? 'danger' : 'primary'}
                        size="md"
                        text={this.state.stockCart.includes(id) ? 'Удалить' : 'Добавить'}
                        onClick={Number(qty) !== 0 ? () => this.toggleStockCart(id) : undefined}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      );
    }

    return null;
  }

  get Services() {
    const { services } = this.props;
    const { servicesCategory } = this.state;

    if (services) {
      const servicesList = Array.from(new Set(services.map(x => x.kind)));
      const category = servicesCategory || servicesList[0].toUpperCase();

      return (
        <div className={styles['stockContainer']}>
          {/* <h3 className={styles['bookingContainer-title']}>Выберите услуги:</h3> */}
          <Dropdown onClick={this.setServicesCategory} text={category} options={servicesList} />
          <div className={styles['stockGrid']}>
            {services
              .filter(x => x.kind.toUpperCase() === category)
              .map(x => {
                const { id, title, text, qty, rentCostPerHour, cover } = x;

                return (
                  <div
                    key={`stockCard${id}`}
                    className={`${styles['stockCard']}
                    ${Number(qty) === 0 && styles['stockCard_disabled']}`}
                  >
                    <div className={styles['stockCard-picture']} style={{ backgroundImage: `url(${cover})` }} />
                    <div className={styles['stockCard-body']}>
                      <h6 className={styles['stockCard-title']}>{title}</h6>
                      <div className={styles['stockCard-wysiwyg']} dangerouslySetInnerHTML={{ __html: text }} />
                      {rentCostPerHour > 0 && (
                        <span className={styles['stockCard-price']}>{`${rentCostPerHour} ˙₽ / час`}</span>
                      )}
                      <Button
                        style={{ marginTop: 5, width: '100%' }}
                        type={this.state.servicesCart.includes(id) ? 'danger' : 'primary'}
                        size="md"
                        text={this.state.servicesCart.includes(id) ? 'Удалить' : 'Добавить'}
                        onClick={Number(qty) !== 0 ? () => this.toggleServicesCart(id) : undefined}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      );
    }

    return null;
  }

  get Photograph() {
    const { staff } = this.props;
    const { photograph } = this.state;

    if (staff) {
      return (
        <div className={styles['teamContainer']}>
          <h3 className={styles['teamContainer-title']} style={{ marginTop: 15, marginBottom: 0 }}>
            Выберите фотографа:
          </h3>
          <div className={styles['teamGrid']}>
            {staff
              .filter(x => x.kind.toUpperCase() === 'ФОТОГРАФ')
              .map(x => {
                const { id, user, rentCost, headshot } = x;

                return (
                  <div key={`teamCard${id}`} className={styles['teamCard']}>
                    <div className={styles['teamCard-picture']} style={{ backgroundImage: `url(${headshot})` }} />
                    <div className={styles['teamCard-body']}>
                      <h6 className={styles['teamCard-title']}>{user}</h6>
                      <span className={styles['teamCard-price']}>{`${rentCost} ˙₽ / час`}</span>
                      <Button
                        style={{ marginTop: 5, width: '100%' }}
                        type={photograph === id ? 'success' : 'primary'}
                        size="md"
                        text={photograph === id ? 'Выбранный фотограф' : 'Выбрать фотографа'}
                        onClick={() => this.setSelectedPhotograph(id)}
                      />
                    </div>
                  </div>
                );
              })}
            <div className={styles['teamCard']} onClick={() => this.setSelectedPhotograph(null)}>
              <div className={styles['teamCard-picture']} style={{ backgroundImage: `url(https://bit.ly/2ryeIpA)` }} />
              <div className={styles['teamCard-body']}>
                <h6 className={styles['teamCard-title']}>Свой фотограф</h6>
                <span className={styles['teamCard-price']}>Бесплатно</span>
                <Button
                  style={{ marginTop: 5, width: '100%' }}
                  type={photograph === null ? 'success' : 'primary'}
                  size="md"
                  text={photograph === null ? 'Выбранный фотограф' : 'Свой фотограф'}
                  onClick={() => this.setSelectedPhotograph(null)}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  get Checkout() {
    const { stock, services, staff, profile } = this.props;
    const { area, date, start, end, photograph, stockCart, servicesCart } = this.state;

    if (this.props.area && staff && stock && services && start && area && profile) {
      let price = 0;
      const area = this.props.area && this.props.area.filter(x => x.id === this.state.area)[0];
      const isWeekend = date.day() % 6 === 0 || date.day() % 5 === 0;
      const time = Array.apply(null, Array(15)).map((x, idx) => dayjs().hour(idx + 9));
      const hours = end ? end.hour() + 1 - start.hour() : 1;
      let areaPrice = area.rentCost;
      let priceLatetime = area.rentCostLateTime;
      let priceWeekend = area.rentCostWeekend;

      if (area) {
        if (area.timeRange) {
          const timeRange = area.timeRange.filter(
            x => dayjs(date).isAfter(dayjs(x.dateStart)) && dayjs(date).isBefore(dayjs(x.dateEnd))
          );

          if (timeRange.length > 0) {
            areaPrice = timeRange[0].rentCost;
            priceLatetime = timeRange[0].rentCostLateTime;
            priceWeekend = timeRange[0].rentCostWeekend;
          }
        }
      }

      if (stock && stockCart) {
        stockCart.map(x => (price += stock.filter(y => x === y.id)[0].rentCostPerHour * hours));
      }

      if (services && servicesCart) {
        servicesCart.map(x => (price += services.filter(y => x === y.id)[0].rentCostPerHour * hours));
      }

      if (staff && photograph) {
        price += staff.filter(x => x.id === photograph)[0].rentCost * hours;
      }

      time.map(x => {
        const isActive = start && start.hour() === x.hour();
        const isBetween = start && end && x.hour() > start.hour() && x.hour() <= (end.hour() === 0 ? 24 : end.hour());
        const isLatetime = x.hour() >= 22 || x.hour() === 0;
        const total = areaPrice + (isLatetime ? priceLatetime : 0) + (isWeekend ? priceWeekend : 0);
        if (isActive || isBetween) {
          price += total;
        }
      });

      let max = 0;

      if (profile.profile?.card) {
        max = price > profile.profile!.card!.balance ? profile.profile!.card!.balance : price - 1;
      }

      return (
        <div className={styles['checkoutContainer']}>
          <h3 className={styles['checkoutContainer-title']}>Чекаут</h3>
          <p style={{ marginBottom: 10 }} className={styles['checkoutContainer-subtitle']}>
            <b>Дата:</b> {date.format('DD MMMM YYYY')}
          </p>
          <p style={{ marginBottom: 10 }} className={styles['checkoutContainer-subtitle']}>
            <b>Время:</b> {start.format('HH:00')}{' '}
            {` ${end ? end.add(1, 'hour').format('HH:00') : start.add(1, 'hour').format('HH:00')}`}
          </p>
          {photograph && (
            <p style={{ marginBottom: 10 }} className={styles['checkoutContainer-subtitle']}>
              <b>Фотограф:</b> {staff.filter(x => x.id === photograph)[0].user}
            </p>
          )}
          {stock && stockCart.length > 0 && (
            <p style={{ marginBottom: 10 }} className={styles['checkoutContainer-subtitle']}>
              <b>Выбранное оборудование:</b>
            </p>
          )}
          {stock &&
            stockCart.length > 0 &&
            stockCart.map(x => (
              <p style={{ marginBottom: 10 }} className={styles['checkoutContainer-caption']}>
                {stock.filter(y => x === y.id)[0].title} - {stock.filter(y => x === y.id)[0].rentCostPerHour * hours} ₽
              </p>
            ))}
          {services && servicesCart.length > 0 && (
            <p style={{ marginBottom: 10 }} className={styles['checkoutContainer-subtitle']}>
              <b>Выбранные услуги:</b>
            </p>
          )}
          {services &&
            servicesCart.length > 0 &&
            servicesCart.map(x => (
              <p style={{ marginBottom: 10 }} className={styles['checkoutContainer-caption']}>
                {services.filter(y => x === y.id)[0].title} -{' '}
                {services.filter(y => x === y.id)[0].rentCostPerHour * hours} ₽
              </p>
            ))}
          <h3 className={styles['checkoutContainer-subtitle']}>Итого: {price} ˙₽</h3>
          {profile.profile?.card && profile.profile?.card?.balance > 10 && (<div className={styles['bonus']}>
            <span className={styles['bonus-title']}>Оплатить бонусами</span>
            <div className={styles['bonus-inputs']}>
              <input onChange={this.setBonus} type="range" min="0" max={max} value={this.state.bonus}></input>
              <input onChange={this.setBonus} type="number" min="0" max={max} value={this.state.bonus}></input>
            </div>
          </div>)}
          <Button
            style={{ marginTop: 10 }}
            type="primary"
            size="md"
            text="Забронировать"
            onClick={() => this.createBooking(price)}
            isDisabled={!localStorage.getItem('token') || this.state.running}
          />
        </div>
      );
    }

    return (
      <div className={styles['checkoutContainer']}>
        {/* <h3 className={styles['checkoutContainer-title']}>Чекаут</h3> */}
        <Button style={{ marginTop: 10 }} type="primary" size="md" text="Забронировать" isDisabled={true} />
      </div>
    );
  }

  public render() {
    const { isLoading } = this.props;

    return (
      <MainContainer isLoading={isLoading}>
        {!localStorage.getItem('token') && <UserPopup />}
        <Nav routes={routes} />
        <section className={styles['bookingContainer']}>
          {this.Area}
          {this.Date}
          {this.Time}
          {this.Photograph}
          <details className={styles['bookingCard']}>
            <summary className={styles['bookingContainer-title']}>
              Дополнительное оборудование
              <span className={styles['bookingContainer-caption']}>
                {this.state.stockCart.length > 0 && ' (Выбрано ' + this.state.stockCart.length + ' аксессуар)'}
              </span>
            </summary>
            {this.Stock}
          </details>
          <details className={styles['bookingCard']}>
            <summary className={styles['bookingContainer-title']}>
              Дополнительные услуги
              <span className={styles['bookingContainer-caption']}>
                {this.state.servicesCart.length > 0 && ' (Выбрано ' + this.state.servicesCart.length + ' аксессуар)'}
              </span>
            </summary>
            {this.Services}
          </details>
          {this.Checkout}
        </section>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state: any) => {
  const userList = state.user.status === 'SUCCESS' ? state.user.user : undefined;
  const areaList = state.areaList.status === 'SUCCESS' ? state.areaList.list : undefined;
  const stockList = state.stockList.status === 'SUCCESS' ? state.stockList.list : undefined;
  const servicesList = state.servicesList.status === 'SUCCESS' ? state.servicesList.list : undefined;
  const staffList = state.teamList.status === 'SUCCESS' ? state.teamList.list : undefined;
  const timeList = state.userBookingTime.status === 'SUCCESS' ? state.userBookingTime.list : undefined;
  const isLoading =
    state.areaList.status === 'REQUESTING' &&
    state.stockList.status === 'REQUESTING' &&
    state.servicesList.status === 'REQUESTING' &&
    state.teamList.status === 'REQUESTING';

  return {
    profile: userList,
    area: areaList,
    stock: stockList,
    services: servicesList,
    staff: staffList,
    time: timeList,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchAreaList: () => dispatch(fetchAreaList()),
  fetchStockList: () => dispatch(fetchStockList()),
  fetchServicesList: () => dispatch(fetchServicesList()),
  fetchTeamList: () => dispatch(fetchTeamList()),
  createUserBooking: (booking: any) => dispatch(createUserBooking(booking)),
  fetchUserBookingTime: (date: string, area: number) => dispatch(fetchUserBookingTime(date, area)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingPage);
