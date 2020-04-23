export interface IStock {
  id: number;
  kind: string;
  title: string;
  text: string;
  qty?: number;
  rentQty?: number;
  cost: number;
  rentCostPerHour: number;
  rentCostPerDay: number;
  cover: string;
}

export interface IStockListState {
  error?: Error;
  status: 'INVALID' | 'REQUESTING' | 'FAILURE' | 'SUCCESS';
  list?: IStock[];
}

export interface IStockListRequestingAction {
  type: 'STOCK_LIST_REQUESTING';
}

export interface IStockListFailureAction {
  type: 'STOCK_LIST_FAILURE';
  error: Error;
}

export interface IStockListSuccessAction {
  type: 'STOCK_LIST_SUCCESS';
  list: IStock[];
}

export interface IRentListState {
  error?: Error;
  status: 'INVALID' | 'REQUESTING' | 'FAILURE' | 'SUCCESS';
  list?: IStock[];
}

export interface IRentListRequestingAction {
  type: 'RENT_LIST_REQUESTING';
}

export interface IRentListFailureAction {
  type: 'RENT_LIST_FAILURE';
  error: Error;
}

export interface IRentListSuccessAction {
  type: 'RENT_LIST_SUCCESS';
  list: IStock[];
}

export interface IServicesListState {
  error?: Error;
  status: 'INVALID' | 'REQUESTING' | 'FAILURE' | 'SUCCESS';
  list?: IStock[];
}

export interface IServicesListRequestingAction {
  type: 'SERVICES_LIST_REQUESTING';
}

export interface IServicesListFailureAction {
  type: 'SERVICES_LIST_FAILURE';
  error: Error;
}

export interface IServicesListSuccessAction {
  type: 'SERVICES_LIST_SUCCESS';
  list: IStock[];
}

export type StockListAction = IStockListRequestingAction | IStockListFailureAction | IStockListSuccessAction;
export type RentListAction = IRentListRequestingAction | IRentListFailureAction | IRentListSuccessAction;
export type ServicesListAction =
  | IServicesListRequestingAction
  | IServicesListFailureAction
  | IServicesListSuccessAction;
