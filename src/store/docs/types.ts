export interface IDocs {
  id: number;
  title: string;
  text: string;
}

export interface IDocsListState {
  error?: Error;
  status: 'INVALID' | 'REQUESTING' | 'FAILURE' | 'SUCCESS';
  list?: IDocs[];
}

export interface IDocsListRequestingAction {
  type: 'DOCS_LIST_REQUESTING';
}

export interface IDocsListFailureAction {
  type: 'DOCS_LIST_FAILURE';
  error: Error;
}

export interface IDocsListSuccessAction {
  type: 'DOCS_LIST_SUCCESS';
  list: IDocs[];
}

export type DocsListAction = IDocsListRequestingAction | IDocsListFailureAction | IDocsListSuccessAction;
