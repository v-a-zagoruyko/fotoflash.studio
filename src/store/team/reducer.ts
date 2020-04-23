import { Reducer } from 'redux';
import { ITeamListState, TeamListAction } from './types';

const initialState: ITeamListState = {
  error: undefined,
  list: undefined,
  status: 'INVALID',
};

const neverReached = (_never: never) => {
  return null;
};

export const teamListReducer: Reducer<ITeamListState, TeamListAction> = (
  state = initialState,
  action: TeamListAction
) => {
  switch (action.type) {
    case 'TEAM_LIST_REQUESTING':
      return {
        ...state,
        status: 'REQUESTING',
      };
    case 'TEAM_LIST_FAILURE':
      return {
        ...state,
        error: action.error,
        status: 'FAILURE',
      };
    case 'TEAM_LIST_SUCCESS':
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
