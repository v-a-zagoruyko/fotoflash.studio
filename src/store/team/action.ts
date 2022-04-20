import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ITeam, ITeamListRequestingAction, ITeamListFailureAction, ITeamListSuccessAction } from './types';

export const fetchTeamList: ActionCreator<ThunkAction<
  Promise<ITeamListSuccessAction | ITeamListFailureAction>,
  null,
  null,
  ITeamListSuccessAction | ITeamListFailureAction
>> = () => async (dispatch: Dispatch) => {
  const teamRequest: ITeamListRequestingAction = {
    type: 'TEAM_LIST_REQUESTING',
  };
  dispatch(teamRequest);

  try {
    const { data }: { data: ITeam[] } = await axios.get('http://194.67.121.29/api/staff/');

    const teamSuccess: ITeamListSuccessAction = {
      list: data,
      type: 'TEAM_LIST_SUCCESS',
    };

    return dispatch(teamSuccess);
  } catch (error) {
    const teamFailure: ITeamListFailureAction = {
      error,
      type: 'TEAM_LIST_FAILURE',
    };

    return dispatch(teamFailure);
  }
};
