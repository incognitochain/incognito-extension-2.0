import { Action } from "redux";

export enum FollowActionType {
  ACTION_FETCHING_BALANCE = `FOLLOW/ACTION_FETCHING_BALANCE`,
  ACTION_FETCHED_BALANCE = `FOLLOW/ACTION_FETCHED_BALANCE`,
  ACTION_FETCHED_TOKEN_BALANCE = `FOLLOW/ACTION_FETCHED_TOKEN_BALANCE`,
  ACTION_UPDATE_TOKEN_LIST = `FOLLOW/ACTION_UPDATE_TOKEN_LIST`,
}

interface FollowFetchingBalanceAction extends Action {
  type: FollowActionType.ACTION_FETCHING_BALANCE;
  payload: any;
}

interface FollowFetchedBalanceAction extends Action {
  type: FollowActionType.ACTION_FETCHED_BALANCE;
  payload: any;
}

interface FollowFetchedTokenBalanceAction extends Action {
  type: FollowActionType.ACTION_FETCHED_TOKEN_BALANCE;
  payload: any;
}

interface FollowUpdateTokenListAction extends Action {
  type: FollowActionType.ACTION_UPDATE_TOKEN_LIST;
  payload: any;
}

export type FollowActions =
  | FollowFetchingBalanceAction
  | FollowFetchedBalanceAction
  | FollowFetchedTokenBalanceAction
  | FollowUpdateTokenListAction;
