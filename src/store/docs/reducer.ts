import { Reducer } from 'redux';
import { IDocsListState, DocsListAction } from './types';

const initialState: IDocsListState = {
  error: undefined,
  list: undefined,
  status: 'INVALID',
};

const neverReached = (_never: never) => {
  return null;
};

export const docsListReducer: Reducer<IDocsListState, DocsListAction> = (
  state = initialState,
  action: DocsListAction
) => {
  switch (action.type) {
    case 'DOCS_LIST_REQUESTING':
      return {
        ...state,
        status: 'REQUESTING',
      };
    case 'DOCS_LIST_FAILURE':
      return {
        ...state,
        error: action.error,
        status: 'FAILURE',
      };
    case 'DOCS_LIST_SUCCESS':
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
