import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IArea, IAreaListRequestingAction, IAreaListFailureAction, IAreaListSuccessAction } from './types';

export const fetchAreaList: ActionCreator<ThunkAction<
  Promise<IAreaListSuccessAction | IAreaListFailureAction>,
  null,
  null,
  IAreaListSuccessAction | IAreaListFailureAction
>> = () => async (dispatch: Dispatch) => {
  const areaRequest: IAreaListRequestingAction = {
    type: 'AREA_LIST_REQUESTING',
  };
  dispatch(areaRequest);

  try {
    const { data }: { data: IArea[] } = await axios.get('http://194.67.121.29/api/area/');
    const areaSucess: IAreaListSuccessAction = {
      list: data,
      type: 'AREA_LIST_SUCCESS',
    };

    return dispatch(areaSucess);
  } catch (error) {
    const areaFailure: IAreaListFailureAction = {
      error,
      type: 'AREA_LIST_FAILURE',
    };

    return dispatch(areaFailure);
  }
};
