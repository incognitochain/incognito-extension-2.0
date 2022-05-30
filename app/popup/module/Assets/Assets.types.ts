import { Action } from "redux";
import { AssetsActionType } from "@module/Assets/Assets.constant";
import { IBalance } from "@core/types";

//----------------------------------------------
// Reducer Payload
//----------------------------------------------
interface IAssetsData {
  [key: string]: IBalance[];
}

export interface IAssetsState {
  isFetching: boolean;
  data: IAssetsData;
}

//----------------------------------------------
// Payload Definition here!
//----------------------------------------------
export interface AssetsFetchingPayload {
  isFetching: boolean;
}

export interface AssetsFetchedPayload {
  balance: IBalance[];
  OTAKey: string;
}

export interface AssetsFreePayload {
  OTAKey: string;
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------
export interface AssetsFetchingAction extends Action {
  type: AssetsActionType.FETCHING;
  payload: AssetsFetchingPayload;
}

export interface AssetsFetchedAction extends Action {
  type: AssetsActionType.FETCHED;
  payload: AssetsFetchedPayload;
}

export interface AssetsFreeAction extends Action {
  type: AssetsActionType.FREE_DATA;
  payload: AssetsFreePayload;
}

//-----------------------------------
export type AssetsActions = AssetsFetchingAction | AssetsFetchedAction | AssetsFreeAction;
