import { Reducer } from 'redux';
import {
  IUserLoginState,
  IUserCreateState,
  IUserFetchState,
  IUserPatchState,
  IUserBookingListState,
  IUserBookingCreateState,
  IUserBookingTimeState,
  UserLoginAction,
  UserCreateAction,
  UserFetchAction,
  UserPatchAction,
  UserBookingListAction,
  UserBookingCreateAction,
  UserBookingTimeAction,
} from './types';

const initialUserLoginState: IUserLoginState = {
  error: undefined,
  data: undefined,
  status: 'INVALID',
};

const initialUserCreateState: IUserCreateState = {
  error: undefined,
  status: 'INVALID',
};

const initialUserFetchState: IUserFetchState = {
  error: undefined,
  user: undefined,
  status: 'INVALID',
};

const initialUserPatchState: IUserPatchState = {
  error: undefined,
  user: undefined,
  status: 'INVALID',
};

const initialUserBookingListState: IUserBookingListState = {
  error: undefined,
  list: undefined,
  status: 'INVALID',
};

const initialUserBookingCreateState: IUserBookingCreateState = {
  error: undefined,
  status: 'INVALID',
};

const initialUserBookingTimeState: IUserBookingTimeState = {
  error: undefined,
  list: undefined,
  status: 'INVALID',
};

const neverReached = (_never: never) => {
  return null;
};

export const userLoginReducer: Reducer<IUserLoginState, UserLoginAction> = (
  state = initialUserLoginState,
  action: UserLoginAction
) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUESTING':
      return {
        ...state,
        status: 'REQUESTING',
      };
    case 'USER_LOGIN_FAILURE':
      return {
        ...state,
        error: action.error,
        status: 'FAILURE',
      };
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        data: action.data,
        status: 'SUCCESS',
      };
    default:
      neverReached(action);
  }

  return state;
};

export const userCreateReducer: Reducer<IUserCreateState, UserCreateAction> = (
  state = initialUserCreateState,
  action: UserCreateAction
) => {
  switch (action.type) {
    case 'USER_CREATE_REQUESTING':
      return {
        ...state,
        status: 'REQUESTING',
      };
    case 'USER_CREATE_FAILURE':
      return {
        ...state,
        error: action.error,
        status: 'FAILURE',
      };
    case 'USER_CREATE_SUCCESS':
      return {
        ...state,
        status: 'SUCCESS',
      };
    default:
      neverReached(action);
  }

  return state;
};

export const userFetchReducer: Reducer<IUserFetchState, UserFetchAction> = (
  state = initialUserFetchState,
  action: UserFetchAction
) => {
  switch (action.type) {
    case 'USER_FETCH_REQUESTING':
      return {
        ...state,
        status: 'REQUESTING',
      };
    case 'USER_FETCH_FAILURE':
      return {
        ...state,
        error: action.error,
        status: 'FAILURE',
      };
    case 'USER_FETCH_SUCCESS':
      return {
        ...state,
        user: action.user,
        status: 'SUCCESS',
      };
    default:
      neverReached(action);
  }

  return state;
};

export const userPatchReducer: Reducer<IUserPatchState, UserPatchAction> = (
  state = initialUserPatchState,
  action: UserPatchAction
) => {
  switch (action.type) {
    case 'USER_PATCH_REQUESTING':
      return {
        ...state,
        status: 'REQUESTING',
      };
    case 'USER_PATCH_FAILURE':
      return {
        ...state,
        error: action.error,
        status: 'FAILURE',
      };
    case 'USER_PATCH_SUCCESS':
      return {
        ...state,
        user: action.user,
        status: 'SUCCESS',
      };
    default:
      neverReached(action);
  }

  return state;
};

export const userBookingListReducer: Reducer<IUserBookingListState, UserBookingListAction> = (
  state = initialUserBookingListState,
  action: UserBookingListAction
) => {
  switch (action.type) {
    case 'USER_BOOKING_LIST_REQUESTING':
      return {
        ...state,
        status: 'REQUESTING',
      };
    case 'USER_BOOKING_LIST_FAILURE':
      return {
        ...state,
        error: action.error,
        status: 'FAILURE',
      };
    case 'USER_BOOKING_LIST_SUCCESS':
      return {
        ...state,
        list: action.list,
        status: 'SUCCESS',
      };
    default:
      neverReached(action);
  }

  return state;
};

export const userBookingCreateReducer: Reducer<IUserBookingCreateState, UserBookingCreateAction> = (
  state = initialUserBookingCreateState,
  action: UserBookingCreateAction
) => {
  switch (action.type) {
    case 'USER_BOOKING_CREATE_REQUESTING':
      return {
        ...state,
        status: 'REQUESTING',
      };
    case 'USER_BOOKING_CREATE_FAILURE':
      return {
        ...state,
        error: action.error,
        status: 'FAILURE',
      };
    case 'USER_BOOKING_CREATE_SUCCESS':
      return {
        ...state,
        status: 'SUCCESS',
      };
    default:
      neverReached(action);
  }

  return state;
};

export const userBookingTimeReducer: Reducer<IUserBookingTimeState, UserBookingTimeAction> = (
  state = initialUserBookingTimeState,
  action: UserBookingTimeAction
) => {
  switch (action.type) {
    case 'USER_BOOKING_TIME_REQUESTING':
      return {
        ...state,
        status: 'REQUESTING',
      };
    case 'USER_BOOKING_TIME_FAILURE':
      return {
        ...state,
        error: action.error,
        status: 'FAILURE',
      };
    case 'USER_BOOKING_TIME_SUCCESS':
      return {
        ...state,
        list: action.list,
        status: 'SUCCESS',
      };
    default:
      neverReached(action);
  }

  return state;
};
