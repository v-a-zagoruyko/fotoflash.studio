import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  IStock,
  IStockListRequestingAction,
  IStockListFailureAction,
  IStockListSuccessAction,
  IRentListRequestingAction,
  IRentListFailureAction,
  IRentListSuccessAction,
  IServicesListRequestingAction,
  IServicesListFailureAction,
  IServicesListSuccessAction,
} from './types';

export const fetchStockList: ActionCreator<ThunkAction<
  Promise<IStockListSuccessAction | IStockListFailureAction>,
  null,
  null,
  IStockListSuccessAction | IStockListFailureAction
>> = () => async (dispatch: Dispatch) => {
  const stockRequest: IStockListRequestingAction = {
    type: 'STOCK_LIST_REQUESTING',
  };
  dispatch(stockRequest);

  try {
    const { data }: { data: IStock[] } = await axios.get('http://194.67.121.29/api/stock/');

    const stockSuccess: IStockListSuccessAction = {
      list: data,
      type: 'STOCK_LIST_SUCCESS',
    };

    return dispatch(stockSuccess);
  } catch (error) {
    const stockFailure: IStockListFailureAction = {
      error,
      type: 'STOCK_LIST_FAILURE',
    };

    return dispatch(stockFailure);
  }
};

export const fetchRentList: ActionCreator<ThunkAction<
  Promise<IRentListSuccessAction | IRentListFailureAction>,
  null,
  null,
  IRentListSuccessAction | IRentListFailureAction
>> = () => async (dispatch: Dispatch) => {
  const rentRequest: IRentListRequestingAction = {
    type: 'RENT_LIST_REQUESTING',
  };
  dispatch(rentRequest);

  try {
    const { data }: { data: IStock[] } = await axios.get('http://194.67.121.29/api/rent/');

    const rentSuccess: IRentListSuccessAction = {
      list: data,
      type: 'RENT_LIST_SUCCESS',
    };

    return dispatch(rentSuccess);
  } catch (error) {
    const rentFailure: IRentListFailureAction = {
      error,
      type: 'RENT_LIST_FAILURE',
    };

    return dispatch(rentFailure);
  }
};

export const fetchServicesList: ActionCreator<ThunkAction<
  Promise<IServicesListSuccessAction | IServicesListFailureAction>,
  null,
  null,
  IServicesListSuccessAction | IServicesListFailureAction
>> = () => async (dispatch: Dispatch) => {
  const servicesRequest: IServicesListRequestingAction = {
    type: 'SERVICES_LIST_REQUESTING',
  };
  dispatch(servicesRequest);

  try {
    const { data }: { data: IStock[] } = await axios.get('http://194.67.121.29/api/services/');

    const servicesSuccess: IServicesListSuccessAction = {
      list: data,
      type: 'SERVICES_LIST_SUCCESS',
    };

    return dispatch(servicesSuccess);
  } catch (error) {
    const servicesFailure: IServicesListFailureAction = {
      error,
      type: 'SERVICES_LIST_FAILURE',
    };

    return dispatch(servicesFailure);
  }
};
