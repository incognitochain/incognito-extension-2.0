import { Action } from "redux";

export enum AccountActionType {
  SET = `ACCOUNT/SET`,
  SET_LIST = `ACCOUNT/SET_LIST`,
  REMOVE_BY_PRIVATE_KEY = `ACCOUNT/REMOVE_BY_PRIVATE_KEY`,
  GET_BALANCE = `ACCOUNT/GET_BALANCE`,
  GET_BALANCE_FINISH = `ACCOUNT/GET_BALANCE_FINISH`,
  SET_DEFAULT_ACCOUNT = `ACCOUNT/SET_DEFAULT_ACCOUNT`,
  SET_SIGN_PUBLIC_KEY_ENCODE = `ACCOUNT/SET_SIGN_PUBLIC_KEY_ENCODE`,
  ACTION_SWITCH_ACCOUNT_FETCHING = `ACCOUNT/ACTION_SWITCH_ACCOUNT_FETCHING`,
  ACTION_SWITCH_ACCOUNT_FETCHED = `ACCOUNT/ACTION_SWITCH_ACCOUNT_FETCHED`,
  ACTION_SWITCH_ACCOUNT_FETCH_FAIL = `ACCOUNT/ACTION_SWITCH_ACCOUNT_FETCH_FAIL`,
  ACTION_FETCHING_CREATE_ACCOUNT = `ACCOUNT/ACTION_FETCHING_CREATE_ACCOUNT`,
  ACTION_FETCHED_CREATE_ACCOUNT = `ACCOUNT/ACTION_FETCHED_CREATE_ACCOUNT`,
  ACTION_FETCH_FAIL_CREATE_ACCOUNT = `ACCOUNT/ACTION_FETCH_FAIL_CREATE_ACCOUNT`,
  ACTION_FETCHING_IMPORT_ACCOUNT = `ACCOUNT/ACTION_FETCHING_IMPORT_ACCOUNT`,
  ACTION_FETCHED_IMPORT_ACCOUNT = `ACCOUNT/ACTION_FETCHED_IMPORT_ACCOUNT`,
  ACTION_FETCH_FAIL_IMPORT_ACCOUNT = `ACCOUNT/ACTION_FETCH_FAIL_IMPORT_ACCOUNT`,
  ACTION_GET_BURNER_ADDRESS = `ACCOUNT/ACTION_GET_BURNER_ADDRESS`,
  ACTION_FETCHING_NFT = `ACCOUNT/ACTION_FETCHING_NFT`,
  ACTION_FETCHED_NFT = `ACCOUNT/ACTION_FETCHED_NFT`,
  ACTION_TOGGLE_MODAL_MINT_MORE_NFT = `ACCOUNT/ACTION_TOGGLE_MODAL_MINT_MORE_NFT`,
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------

export interface AccountSetAction extends Action {
  type: AccountActionType.SET;
  payload: any;
}

export interface AccountSetListAction extends Action {
  type: AccountActionType.SET_LIST;
  payload: any;
}

export interface AccountRemoveByPrivateKeyAction extends Action {
  type: AccountActionType.REMOVE_BY_PRIVATE_KEY;
  payload: any;
}

export interface AccountGetBalanceAction extends Action {
  type: AccountActionType.GET_BALANCE;
  payload: any;
}

export interface AccountGetBalanceFinishAction extends Action {
  type: AccountActionType.GET_BALANCE_FINISH;
  payload: any;
}
export interface AccountSetSignPublicKeyEncodeAction extends Action {
  type: AccountActionType.SET_SIGN_PUBLIC_KEY_ENCODE;
  payload: any;
}

export interface AccountSetDefaultAccountAction extends Action {
  type: AccountActionType.SET_DEFAULT_ACCOUNT;
  payload: any;
}

export interface AccountSwitchAccountFetchingAction extends Action {
  type: AccountActionType.ACTION_SWITCH_ACCOUNT_FETCHING;
  payload: any;
}

export interface AccountSwitchAccountFetchedAction extends Action {
  type: AccountActionType.ACTION_SWITCH_ACCOUNT_FETCHED;
  payload: any;
}

export interface AccountSwitchAccountFetchFailAction extends Action {
  type: AccountActionType.ACTION_SWITCH_ACCOUNT_FETCH_FAIL;
  payload: any;
}

export interface AccountFetchingCreateAccountAction extends Action {
  type: AccountActionType.ACTION_FETCHING_CREATE_ACCOUNT;
  payload: any;
}

export interface AccountFetchedCreateAccountAction extends Action {
  type: AccountActionType.ACTION_FETCHED_CREATE_ACCOUNT;
  payload: any;
}

export interface AccountFetchFailCreateAccountAction extends Action {
  type: AccountActionType.ACTION_FETCH_FAIL_CREATE_ACCOUNT;
  payload: any;
}

export interface AccountFetchingImportAccountAction extends Action {
  type: AccountActionType.ACTION_FETCHING_IMPORT_ACCOUNT;
  payload: any;
}

export interface AccountFetchedImportAccountAction extends Action {
  type: AccountActionType.ACTION_FETCHED_IMPORT_ACCOUNT;
  payload: any;
}

export interface AccountFetchFailImportAccountAction extends Action {
  type: AccountActionType.ACTION_FETCH_FAIL_IMPORT_ACCOUNT;
  payload: any;
}

export interface AccounGetBurnerAddressAction extends Action {
  type: AccountActionType.ACTION_GET_BURNER_ADDRESS;
  payload: any;
}

export interface AccounFetchingNFTAction extends Action {
  type: AccountActionType.ACTION_FETCHING_NFT;
  payload: any;
}

export interface AccounToggleModalMintMoreNFTAction extends Action {
  type: AccountActionType.ACTION_TOGGLE_MODAL_MINT_MORE_NFT;
  payload: any;
}
export interface AccounFetchedNFTAction extends Action {
  type: AccountActionType.ACTION_FETCHED_NFT;
  payload: any;
}

//-----------------------------------

export type AccountActions =
  | AccountSetAction
  | AccountSetListAction
  | AccountRemoveByPrivateKeyAction
  | AccountGetBalanceAction
  | AccountGetBalanceFinishAction
  | AccountSetDefaultAccountAction
  | AccountSetSignPublicKeyEncodeAction
  | AccountSwitchAccountFetchingAction
  | AccountSwitchAccountFetchedAction
  | AccountSwitchAccountFetchFailAction
  | AccountFetchingCreateAccountAction
  | AccountFetchedCreateAccountAction
  | AccountFetchFailCreateAccountAction
  | AccountFetchingImportAccountAction
  | AccountFetchedImportAccountAction
  | AccountFetchFailImportAccountAction
  | AccounGetBurnerAddressAction
  | AccounFetchingNFTAction
  | AccounToggleModalMintMoreNFTAction
  | AccounFetchedNFTAction;

export default {};
