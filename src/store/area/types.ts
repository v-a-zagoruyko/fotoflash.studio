import { IStock } from '../stock/types';

interface ITimeRange {
  dateStart: string;
  dateEnd: string;
  rentCost: number;
  rentCostLateTime: number;
  rentCostWeekend: number;
}

export interface IArea {
  id: number;
  title: string;
  text: string;
  rentCost: number;
  rentCostLateTime: number;
  rentCostWeekend: number;
  rentCostHalfNight: number;
  rentCostFullNight: number;
  cover: string;
  twin: [{ id: number }];
  stock?: IStock[];
  gallery?: [{ image: string }];
  timeRange?: ITimeRange[];
}

export interface IAreaListState {
  error?: Error;
  status: 'INVALID' | 'REQUESTING' | 'FAILURE' | 'SUCCESS';
  list?: IArea[];
}

export interface IAreaListRequestingAction {
  type: 'AREA_LIST_REQUESTING';
}

export interface IAreaListFailureAction {
  type: 'AREA_LIST_FAILURE';
  error: Error;
}

export interface IAreaListSuccessAction {
  type: 'AREA_LIST_SUCCESS';
  list: IArea[];
}

export type AreaListAction = IAreaListRequestingAction | IAreaListFailureAction | IAreaListSuccessAction;
