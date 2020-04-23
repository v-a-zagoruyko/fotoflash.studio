export interface INews {
  id: number;
  author: string;
  title: string;
  text: string;
  source?: string;
  link?: string;
  cover: string;
  createdAt: string;
}

export interface INewsListState {
  error?: Error;
  status: 'INVALID' | 'REQUESTING' | 'FAILURE' | 'SUCCESS';
  list?: INews[];
}

export interface INewsListRequestingAction {
  type: 'NEWS_LIST_REQUESTING';
}

export interface INewsListFailureAction {
  type: 'NEWS_LIST_FAILURE';
  error: Error;
}

export interface INewsListSuccessAction {
  type: 'NEWS_LIST_SUCCESS';
  list: INews[];
}

export type NewsListAction = INewsListRequestingAction | INewsListFailureAction | INewsListSuccessAction;
