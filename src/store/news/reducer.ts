import { Reducer } from 'redux';
import { INewsListState, NewsListAction } from './types';

const initialState: INewsListState = {
  error: undefined,
  list: undefined,
  status: 'INVALID',
};

const neverReached = (_never: never) => {
  return null;
};

export const newsListReducer: Reducer<INewsListState, NewsListAction> = (state = initialState, action: NewsListAction) => {
  switch (action.type) {
    case 'NEWS_LIST_REQUESTING':
      return {
        ...state,
        status: 'REQUESTING',
      };
    case 'NEWS_LIST_FAILURE':
      return {
        ...state,
        error: action.error,
        status: 'FAILURE',
      };
    case 'NEWS_LIST_SUCCESS':
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
