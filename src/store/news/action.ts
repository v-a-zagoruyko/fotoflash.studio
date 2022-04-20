import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { INews, INewsListRequestingAction, INewsListFailureAction, INewsListSuccessAction } from './types';

export const fetchNewsList: ActionCreator<ThunkAction<
  Promise<INewsListSuccessAction | INewsListFailureAction>,
  null,
  null,
  INewsListSuccessAction | INewsListFailureAction
>> = () => async (dispatch: Dispatch) => {
  const newsRequest: INewsListRequestingAction = {
    type: 'NEWS_LIST_REQUESTING',
  };
  dispatch(newsRequest);

  try {
    const { data }: { data: INews[] } = await axios.get('http://194.67.121.29/api/news/');
    const newsSucess: INewsListSuccessAction = {
      list: data,
      type: 'NEWS_LIST_SUCCESS',
    };

    return dispatch(newsSucess);
  } catch (error) {
    const newsFailure: INewsListFailureAction = {
      error,
      type: 'NEWS_LIST_FAILURE',
    };

    return dispatch(newsFailure);
  }
};
