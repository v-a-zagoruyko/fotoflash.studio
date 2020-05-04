import { IArea } from '../area/types';
import { IStock } from '../stock/types';
import { ITeam } from '../team/types';

export interface IBooking {
  id: number;
  user: IUser;
  area: IArea;
  date: string;
  timeStart: string;
  timeEnd: string | null;
  stock?: IStock[];
  services?: IStock[];
  photograph: ITeam | null;
  price: number;
  isPayed: boolean;
  paymentUrl?: string;
}

export interface IUser {
  email: string;
  first_name: string;
  last_name: string;
  profile?: {
    phone?: number;
    dob?: string;
    passport?: number;
    snils?: number;
    card?: {
      type: string;
      balance: number;
    };
    headshot?: string;
  };
}

export interface ILogin {
  token: string;
  user: IUser;
}

export interface IUserLoginState {
  error?: Error;
  status: 'INVALID' | 'REQUESTING' | 'FAILURE' | 'SUCCESS';
  data?: ILogin;
}

export interface IUserLoginRequestingAction {
  type: 'USER_LOGIN_REQUESTING';
}

export interface IUserLoginFailureAction {
  type: 'USER_LOGIN_FAILURE';
  error: Error;
}

export interface IUserLoginSuccessAction {
  type: 'USER_LOGIN_SUCCESS';
  data: ILogin;
}

export interface IUserCreateState {
  error?: Error;
  status: 'INVALID' | 'REQUESTING' | 'FAILURE' | 'SUCCESS';
  data?: ILogin;
}

export interface IUserCreateRequestingAction {
  type: 'USER_CREATE_REQUESTING';
}

export interface IUserCreateFailureAction {
  type: 'USER_CREATE_FAILURE';
  error: Error;
}

export interface IUserCreateSuccessAction {
  type: 'USER_CREATE_SUCCESS';
}

export interface IUserFetchState {
  error?: Error;
  status: 'INVALID' | 'REQUESTING' | 'FAILURE' | 'SUCCESS';
  user?: IUser;
}

export interface IUserFetchRequestingAction {
  type: 'USER_FETCH_REQUESTING';
}

export interface IUserFetchFailureAction {
  type: 'USER_FETCH_FAILURE';
  error: Error;
}

export interface IUserFetchSuccessAction {
  type: 'USER_FETCH_SUCCESS';
  user: IUser;
}

export interface IUserPatchState {
  error?: Error;
  status: 'INVALID' | 'REQUESTING' | 'FAILURE' | 'SUCCESS';
  user?: IUser;
}

export interface IUserPatchRequestingAction {
  type: 'USER_PATCH_REQUESTING';
}

export interface IUserPatchFailureAction {
  type: 'USER_PATCH_FAILURE';
  error: Error;
}

export interface IUserPatchSuccessAction {
  type: 'USER_PATCH_SUCCESS';
  user: IUser;
}

export interface IUserBookingListState {
  error?: Error;
  status: 'INVALID' | 'REQUESTING' | 'FAILURE' | 'SUCCESS';
  list?: IBooking[];
}

export interface IUserBookingListRequestingAction {
  type: 'USER_BOOKING_LIST_REQUESTING';
}

export interface IUserBookingListFailureAction {
  type: 'USER_BOOKING_LIST_FAILURE';
  error: Error;
}

export interface IUserBookingListSuccessAction {
  type: 'USER_BOOKING_LIST_SUCCESS';
  list: IBooking[];
}

export interface IUserBookingCreateState {
  error?: Error;
  status: 'INVALID' | 'REQUESTING' | 'FAILURE' | 'SUCCESS';
}

export interface IUserBookingCreateRequestingAction {
  type: 'USER_BOOKING_CREATE_REQUESTING';
}

export interface IUserBookingCreateFailureAction {
  type: 'USER_BOOKING_CREATE_FAILURE';
  error: Error;
}

export interface IUserBookingCreateSuccessAction {
  type: 'USER_BOOKING_CREATE_SUCCESS';
}

export interface IUserBookingTimeState {
  error?: Error;
  status: 'INVALID' | 'REQUESTING' | 'FAILURE' | 'SUCCESS';
  list?: IBooking[];
}

export interface IUserBookingTimeRequestingAction {
  type: 'USER_BOOKING_TIME_REQUESTING';
}

export interface IUserBookingTimeFailureAction {
  type: 'USER_BOOKING_TIME_FAILURE';
  error: Error;
}

export interface IUserBookingTimeSuccessAction {
  type: 'USER_BOOKING_TIME_SUCCESS';
  list: IBooking[];
}

export type UserLoginAction = IUserLoginRequestingAction | IUserLoginFailureAction | IUserLoginSuccessAction;
export type UserCreateAction = IUserCreateRequestingAction | IUserCreateFailureAction | IUserCreateSuccessAction;
export type UserFetchAction = IUserFetchRequestingAction | IUserFetchFailureAction | IUserFetchSuccessAction;
export type UserPatchAction = IUserPatchRequestingAction | IUserPatchFailureAction | IUserPatchSuccessAction;
export type UserBookingListAction =
  | IUserBookingListRequestingAction
  | IUserBookingListFailureAction
  | IUserBookingListSuccessAction;

export type UserBookingCreateAction =
  | IUserBookingCreateRequestingAction
  | IUserBookingCreateFailureAction
  | IUserBookingCreateSuccessAction;

export type UserBookingTimeAction =
  | IUserBookingTimeRequestingAction
  | IUserBookingTimeFailureAction
  | IUserBookingTimeSuccessAction;
