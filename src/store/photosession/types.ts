import { IStock } from '../stock/types';

export interface IPhotosession {
  id: number;
  title: string;
  text: string;
  cover: string;
  cost: number;
  stock?: IStock[];
}

export interface IPhotosessionListState {
  error?: Error;
  status: 'INVALID' | 'REQUESTING' | 'FAILURE' | 'SUCCESS';
  list?: IPhotosession[];
}

export interface IPhotosessionListRequestingAction {
  type: 'PHOTOSESSION_LIST_REQUESTING';
}

export interface IPhotosessionListFailureAction {
  type: 'PHOTOSESSION_LIST_FAILURE';
  error: Error;
}

export interface IPhotosessionListSuccessAction {
  type: 'PHOTOSESSION_LIST_SUCCESS';
  list: IPhotosession[];
}

export type PhotosessionListAction =
  | IPhotosessionListRequestingAction
  | IPhotosessionListFailureAction
  | IPhotosessionListSuccessAction;
