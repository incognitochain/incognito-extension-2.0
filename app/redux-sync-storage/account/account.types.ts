import { Action } from "redux";

export type AccountInfo = {
  name: string;
  paymentAddress: string;
};

export enum AccountActionType {
  SET_DEFAULT_NAME = "REDUX_SYNC_STORAGE/ACCOUNT/SET_DEFAULT_NAME",

  SET_CURRENT_ACCOUNT = "REDUX_SYNC_STORAGE/ACCOUNT/SET_CURRENT_ACCOUNT",

  SET_ACCOUNT_LIST = "REDUX_SYNC_STORAGE/ACCOUNT/SET_ACCOUNT_LIST",

  ADD_ACCOUNT = "REDUX_SYNC_STORAGE/ACCOUNT/ADD_ACCOUNT",
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------

export interface SetAccountAction extends Action {
  type: AccountActionType.SET_DEFAULT_NAME;
  payload: {
    name: string;
  };
}
export interface SetCurrentAccountAction extends Action {
  type: AccountActionType.SET_CURRENT_ACCOUNT;
  payload: {
    currentAccount: AccountInfo;
  };
}

export interface SetAccountListAction extends Action {
  type: AccountActionType.SET_ACCOUNT_LIST;
  payload: {
    accountList: AccountInfo[];
  };
}

export interface AddAccountAction extends Action {
  type: AccountActionType.ADD_ACCOUNT;
  payload: {
    newAccount: AccountInfo;
  };
}

//----------------------------------------------

export type AccountActions = SetAccountAction | SetCurrentAccountAction | SetAccountListAction | AddAccountAction;

export default {};
