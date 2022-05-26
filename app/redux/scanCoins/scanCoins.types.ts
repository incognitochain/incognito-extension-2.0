import { Action } from "redux";
import { ScanCoinsActionType } from "@redux/scanCoins/scanCoins.constants";

//----------------------------------------------
// Reducer Payload
//----------------------------------------------
export interface ScanCoinsState {
  isFetching: boolean;
}

//----------------------------------------------
// Payload Definition here!
//----------------------------------------------
export interface ScanCoinsFetchingPayload {
  isFetching: boolean;
}

export interface ScanCoinsFirstTimePayload {
  isScanning: boolean;
  otaKey: string;
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------
export interface ScanCoinsFetchingAction extends Action {
  type: ScanCoinsActionType.FETCHING;
  payload: ScanCoinsFetchingPayload;
}

export interface ScanCoinsFirstTimeAction extends Action {
  type: ScanCoinsActionType.FIRST_TIME_SCAN_COINS;
  payload: ScanCoinsFirstTimePayload;
}

//-----------------------------------
export type ScanCoinsActions = ScanCoinsFetchingAction | ScanCoinsFirstTimeAction;
