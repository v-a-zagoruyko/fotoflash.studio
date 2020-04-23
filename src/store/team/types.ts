export interface ITeam {
  id: number;
  kind: string;
  user: string;
  text: string;
  instagram?: string;
  rentCost: number;
  isStaff: boolean;
  headshot: string;
  gallery?: [{ image: string }];
}

export interface ITeamListState {
  error?: Error;
  status: 'INVALID' | 'REQUESTING' | 'FAILURE' | 'SUCCESS';
  list?: ITeam[];
}

export interface ITeamListRequestingAction {
  type: 'TEAM_LIST_REQUESTING';
}

export interface ITeamListFailureAction {
  type: 'TEAM_LIST_FAILURE';
  error: Error;
}

export interface ITeamListSuccessAction {
  type: 'TEAM_LIST_SUCCESS';
  list: ITeam[];
}

export type TeamListAction = ITeamListRequestingAction | ITeamListFailureAction | ITeamListSuccessAction;
