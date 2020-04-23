import { Reducer } from 'redux';
import { IAreaListState, AreaListAction } from './types';

const initialState: IAreaListState = {
  error: undefined,
  list: undefined,
  status: 'INVALID',
};

const neverReached = (_never: never) => {
  return null;
};

export const areaListReducer: Reducer<IAreaListState, AreaListAction> = (
  state = initialState,
  action: AreaListAction
) => {
  switch (action.type) {
    case 'AREA_LIST_REQUESTING':
      return {
        ...state,
        status: 'REQUESTING',
      };
    case 'AREA_LIST_FAILURE':
      return {
        ...state,
        error: action.error,
        status: 'FAILURE',
      };
    case 'AREA_LIST_SUCCESS':
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
