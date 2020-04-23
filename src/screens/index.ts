export const routes = [
  { title: 'ГЛАВНАЯ', link: '/' },
  { title: 'БРОНИРОВАНИЕ', link: '/booking' },
  { title: 'ОБОРУДОВАНИЕ', link: '/stock' },
  { title: 'КОМАНДА', link: '/team' },
  { title: 'НОВОСТИ', link: '/news' },
  { title: 'КОНТАКТЫ', link: '/contacts' },
];

export const profileRoutes = [
  { title: 'ПРОФИЛЬ', icon: 'user', link: '/profile/personal' },
  { title: 'БРОНИРОВАНИЯ', icon: 'camera', link: '/profile/booking' },
];

export { default as HomePage } from './Home/HomePage';
export { default as NewsPage } from './Home/NewsPage';
export { default as StockPage } from './Home/StockPage';
export { default as TeamPage } from './Home/TeamPage';
export { default as ContactsPage } from './Home/ContactsPage';
export { default as BookingPage } from './Home/BookingPage';
export { default as UserPage } from './User/UserPage';
export { default as PersonalPage } from './User/PersonalPage';
export { default as RestorePage } from './User/RestorePage';
export { default as PersonalBookingPage } from './User/PersonalBookingPage';
export { default as PageNotFound } from './PageNotFound';
