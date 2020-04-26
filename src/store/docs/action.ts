import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IDocs, IDocsListRequestingAction, IDocsListFailureAction, IDocsListSuccessAction } from './types';

export const fetchDocsList: ActionCreator<ThunkAction<
  Promise<IDocsListSuccessAction | IDocsListFailureAction>,
  null,
  null,
  IDocsListSuccessAction | IDocsListFailureAction
>> = () => async (dispatch: Dispatch) => {
  const docsRequest: IDocsListRequestingAction = {
    type: 'DOCS_LIST_REQUESTING',
  };
  dispatch(docsRequest);

  try {
    const { data }: { data: IDocs[] } = await axios.get('http://admin.fotoflash.studio/api/docs/');
    const docsSuccess: IDocsListSuccessAction = {
      list: data,
      type: 'DOCS_LIST_SUCCESS',
    };

    return dispatch(docsSuccess);
  } catch (error) {
    const docsFailure: IDocsListFailureAction = {
      error,
      type: 'DOCS_LIST_FAILURE',
    };

    return dispatch(docsFailure);
  }
};
