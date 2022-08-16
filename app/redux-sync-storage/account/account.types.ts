import { Action } from "redux";

export enum AccountActionType {
  SET = "REDUX_SYNC_STORAGE/ACCOUNT_INFO/SET",
  GET = "REDUX_SYNC_STORAGE/ACCOUNT_INFO/GET",
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------

export interface GetAccountAction extends Action {
  type: AccountActionType.GET;
}

export interface SetAccountAction extends Action {
  type: AccountActionType.SET;
  payload: {
    name: string;
  };
}

//----------------------------------------------

export type AccountActions = SetAccountAction | GetAccountAction;

export default {};
