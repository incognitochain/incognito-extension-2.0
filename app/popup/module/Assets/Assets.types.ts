import { Action } from "redux";
import { AssetsActionType } from "@module/Assets/Assets.constant";

//----------------------------------------------
// Reducer Payload
//----------------------------------------------
export interface IAssetsState {
  isFetching: boolean;
}

//----------------------------------------------
// Payload Definition here!
//----------------------------------------------
export interface AssetsFetchingPayload {
  isFetching: boolean;
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------
export interface AssetsFetchingAction extends Action {
  type: AssetsActionType.FETCHING;
  payload: AssetsFetchingPayload;
}

//-----------------------------------
export type AssetsActions = AssetsFetchingAction;
