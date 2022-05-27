import { Action } from "redux";

export enum TokenActionType {
  SET = `TOKEN/SET`,
  SET_BULK = `TOKEN/SET_BULK`,

  GET_BALANCE = `TOKEN/GET_BALANCE`,
  GET_BALANCE_FINISH = `TOKEN/GET_BALANCE_FINISH`,

  REMOVE_BY_ID = `TOKEN/REMOVE_BY_ID`,
  SET_LIST = `TOKEN/SET_LIST`,

  SET_PTOKEN_LIST = `TOKEN/SET_PTOKEN_LIST`,
  SET_INTERNAL_LIST = `TOKEN/SET_INTERNAL_LIST`,

  ADD_FOLLOW_TOKEN_FETCHING = `TOKEN/ADD_FOLLOW_TOKEN_FETCHING`,
  ADD_FOLLOW_TOKEN_SUCCESS = `TOKEN/ADD_FOLLOW_TOKEN_SUCCESS`,

  ADD_FOLLOW_TOKEN_FAIL = `TOKEN/ADD_FOLLOW_TOKEN_FAIL`,
  ACTION_FETCHING_HISTORY = `TOKEN/ACTION_FETCHING_HISTORY`,

  ACTION_FETCHED_HISTORY = `TOKEN/ACTION_FETCHED_HISTORY`,
  ACTION_FETCH_FAIL_HISTORY = `TOKEN/ACTION_FETCH_FAIL_HISTORY`,

  ACTION_FREE_HISTORY = `TOKEN/ACTION_FREE_HISTORY`,
  ACTION_TOGGLE_UNVERIFIED_TOKEN = `TOKEN/ACTION_TOGGLE_UNVERIFIED_TOKEN`,

  ACTION_FETCHING_RECEIVE_HISTORY = `TOKEN/ACTION_FETCHING_RECEIVE_HISTORY`,
  ACTION_FETCHED_RECEIVE_HISTORY = `TOKEN/ACTION_FETCHED_RECEIVE_HISTORY`,

  ACTION_FETCH_FAIL_RECEIVE_HISTORY = `TOKEN/ACTION_FETCH_FAIL_RECEIVE_HISTORY`,
  ACTION_FREE_RECEIVE_HISTORY = `TOKEN/ACTION_FREE_RECEIVE_HISTORY`,
}

interface TokenSetAction extends Action {
  type: TokenActionType.SET;
  payload: any;
}

interface TokenSetBulkAction extends Action {
  type: TokenActionType.SET_BULK;
  payload: any;
}

interface TokenGetBalanceAction extends Action {
  type: TokenActionType.GET_BALANCE;
  payload: any;
}

interface TokenGetBalanceFinishAction extends Action {
  type: TokenActionType.GET_BALANCE_FINISH;
  payload: any;
}

interface TokenRemoveByIdAction extends Action {
  type: TokenActionType.REMOVE_BY_ID;
  payload: any;
}

interface TokenSetListAction extends Action {
  type: TokenActionType.SET_LIST;
  payload: any;
}

interface TokenSetPTokenListAction extends Action {
  type: TokenActionType.SET_PTOKEN_LIST;
  payload: any;
}

interface TokenSetInternalListAction extends Action {
  type: TokenActionType.SET_INTERNAL_LIST;
  payload: any;
}

interface TokenAddFollowTokenFetchingAction extends Action {
  type: TokenActionType.ADD_FOLLOW_TOKEN_FETCHING;
  payload: any;
}
interface TokenAddFollowTokenSuccessAction extends Action {
  type: TokenActionType.ADD_FOLLOW_TOKEN_SUCCESS;
  payload: any;
}
interface TokenAddFollowTokenFailAction extends Action {
  type: TokenActionType.ADD_FOLLOW_TOKEN_FAIL;
  payload: any;
}

interface TokenFetchingHistoryAction extends Action {
  type: TokenActionType.ACTION_FETCHING_HISTORY;
  payload: any;
}

interface TokenFetchedHistoryAction extends Action {
  type: TokenActionType.ACTION_FETCHED_HISTORY;
  payload: any;
}

interface TokenFetchFailHistoryAction extends Action {
  type: TokenActionType.ACTION_FETCH_FAIL_HISTORY;
  payload: any;
}

interface TokenFreeHistoryAction extends Action {
  type: TokenActionType.ACTION_FREE_HISTORY;
  payload: any;
}

interface TokenToggleUnverifiedTokenAction extends Action {
  type: TokenActionType.ACTION_TOGGLE_UNVERIFIED_TOKEN;
  payload: any;
}

interface TokenFetchingReceiveHistoryAction extends Action {
  type: TokenActionType.ACTION_FETCHING_RECEIVE_HISTORY;
  payload: any;
}

interface TokenFetchedReceiveHistoryAction extends Action {
  type: TokenActionType.ACTION_FETCHED_RECEIVE_HISTORY;
  payload: any;
}

interface TokenFetchFailReceiveHistoryAction extends Action {
  type: TokenActionType.ACTION_FETCH_FAIL_RECEIVE_HISTORY;
  payload: any;
}

interface TokenFreeReceiveHistoryAction extends Action {
  type: TokenActionType.ACTION_FREE_RECEIVE_HISTORY;
  payload: any;
}

export type TokenActions =
  | TokenSetAction
  | TokenSetBulkAction
  | TokenGetBalanceAction
  | TokenGetBalanceFinishAction
  | TokenRemoveByIdAction
  | TokenSetListAction
  | TokenSetPTokenListAction
  | TokenSetInternalListAction
  | TokenAddFollowTokenFetchingAction
  | TokenAddFollowTokenSuccessAction
  | TokenAddFollowTokenFailAction
  | TokenFetchingHistoryAction
  | TokenFetchedHistoryAction
  | TokenFetchFailHistoryAction
  | TokenFreeHistoryAction
  | TokenToggleUnverifiedTokenAction
  | TokenFetchingReceiveHistoryAction
  | TokenFetchedReceiveHistoryAction
  | TokenFetchFailReceiveHistoryAction
  | TokenFreeReceiveHistoryAction;
