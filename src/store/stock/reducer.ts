import { Reducer } from 'redux';
import {
  IStockListState,
  IRentListState,
  IServicesListState,
  StockListAction,
  RentListAction,
  ServicesListAction,
} from './types';

const initialStockState: IStockListState = {
  error: undefined,
  list: undefined,
  status: 'INVALID',
};

const initialRentState: IRentListState = {
  error: undefined,
  list: undefined,
  status: 'INVALID',
};

const initialServicesState: IServicesListState = {
  error: undefined,
  list: undefined,
  status: 'INVALID',
};

const neverReached = (_never: never) => {
  return null;
};

export const stockListReducer: Reducer<IStockListState, StockListAction> = (
  state = initialStockState,
  action: StockListAction
) => {
  switch (action.type) {
    case 'STOCK_LIST_REQUESTING':
      return {
        ...state,
        status: 'REQUESTING',
      };
    case 'STOCK_LIST_FAILURE':
      return {
        ...state,
        error: action.error,
        status: 'FAILURE',
      };
    case 'STOCK_LIST_SUCCESS':
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

export const rentListReducer: Reducer<IRentListState, RentListAction> = (
  state = initialStockState,
  action: RentListAction
) => {
  switch (action.type) {
    case 'RENT_LIST_REQUESTING':
      return {
        ...state,
        status: 'REQUESTING',
      };
    case 'RENT_LIST_FAILURE':
      return {
        ...state,
        error: action.error,
        status: 'FAILURE',
      };
    case 'RENT_LIST_SUCCESS':
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

export const servicesListReducer: Reducer<IServicesListState, ServicesListAction> = (
  state = initialStockState,
  action: ServicesListAction
) => {
  switch (action.type) {
    case 'SERVICES_LIST_REQUESTING':
      return {
        ...state,
        status: 'REQUESTING',
      };
    case 'SERVICES_LIST_FAILURE':
      return {
        ...state,
        error: action.error,
        status: 'FAILURE',
      };
    case 'SERVICES_LIST_SUCCESS':
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
