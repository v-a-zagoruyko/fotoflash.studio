import { combineReducers, Reducer } from 'redux';

import {
  IUserLoginState,
  IUserCreateState,
  IUserFetchState,
  IUserPatchState,
  IUserBookingListState,
  IUserBookingCreateState,
  IUserBookingTimeState,
} from './user/types';
import { IAreaListState } from './area/types';
import { IDocsListState } from './docs/types';
import { INewsListState } from './news/types';
import { IStockListState, IRentListState, IServicesListState } from './stock/types';
import { ITeamListState } from './team/types';
import { IPhotosessionListState } from './photosession/types';

import {
  userLoginReducer,
  userCreateReducer,
  userFetchReducer,
  userPatchReducer,
  userBookingListReducer,
  userBookingCreateReducer,
  userBookingTimeReducer,
} from './user/reducer';
import { areaListReducer } from './area/reducer';
import { docsListReducer } from './docs/reducer';
import { newsListReducer } from './news/reducer';
import { stockListReducer, rentListReducer, servicesListReducer } from './stock/reducer';
import { teamListReducer } from './team/reducer';
import { photosessionListReducer } from './photosession/reducer';

export interface ApplicationState {
  user: IUserFetchState;
  userLogin: IUserLoginState;
  userCreate: IUserCreateState;
  userPatch: IUserPatchState;
  userBookingList: IUserBookingListState;
  userBookingCreate: IUserBookingCreateState;
  userBookingTime: IUserBookingTimeState;

  areaList: IAreaListState;
  docsList: IDocsListState;
  newsList: INewsListState;
  stockList: IStockListState;
  rentList: IRentListState;
  servicesList: IServicesListState;
  teamList: ITeamListState;
  photosessionList: IPhotosessionListState;
}

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  user: userFetchReducer,
  userLogin: userLoginReducer,
  userCreate: userCreateReducer,
  userPatch: userPatchReducer,
  userBookingList: userBookingListReducer,
  userBookingCreate: userBookingCreateReducer,
  userBookingTime: userBookingTimeReducer,

  areaList: areaListReducer,
  docsList: docsListReducer,
  newsList: newsListReducer,
  stockList: stockListReducer,
  rentList: rentListReducer,
  servicesList: servicesListReducer,
  teamList: teamListReducer,
  photosessionList: photosessionListReducer,
});
