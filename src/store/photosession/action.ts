import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  IPhotosession,
  IPhotosessionListRequestingAction,
  IPhotosessionListFailureAction,
  IPhotosessionListSuccessAction,
} from './types';

export const fetchPhotosessionList: ActionCreator<
  ThunkAction<
    Promise<IPhotosessionListSuccessAction | IPhotosessionListFailureAction>,
    null,
    null,
    IPhotosessionListSuccessAction | IPhotosessionListFailureAction
  >
> = () => async (dispatch: Dispatch) => {
  const photosessionRequest: IPhotosessionListRequestingAction = {
    type: 'PHOTOSESSION_LIST_REQUESTING',
  };
  dispatch(photosessionRequest);

  try {
    const { data }: { data: IPhotosession[] } = await axios.get('http://68.183.201.128:8080/api/photosession/');
    const photosessionSucess: IPhotosessionListSuccessAction = {
      list: data,
      type: 'PHOTOSESSION_LIST_SUCCESS',
    };

    return dispatch(photosessionSucess);
  } catch (error) {
    const photosessionFailure: IPhotosessionListFailureAction = {
      error,
      type: 'PHOTOSESSION_LIST_FAILURE',
    };

    return dispatch(photosessionFailure);
  }
};
