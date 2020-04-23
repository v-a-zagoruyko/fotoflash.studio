import { Reducer } from 'redux';
import { IPhotosessionListState, PhotosessionListAction } from './types';

const initialState: IPhotosessionListState = {
  error: undefined,
  list: undefined,
  status: 'INVALID',
};

const neverReached = (_never: never) => {
  return null;
};

export const photosessionListReducer: Reducer<IPhotosessionListState, PhotosessionListAction> = (
  state = initialState,
  action: PhotosessionListAction
) => {
  switch (action.type) {
    case 'PHOTOSESSION_LIST_REQUESTING':
      return {
        ...state,
        status: 'REQUESTING',
      };
    case 'PHOTOSESSION_LIST_FAILURE':
      return {
        ...state,
        error: action.error,
        status: 'FAILURE',
      };
    case 'PHOTOSESSION_LIST_SUCCESS':
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
