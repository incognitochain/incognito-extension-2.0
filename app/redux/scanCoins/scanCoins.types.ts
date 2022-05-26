import { Action } from "redux";
import { ScanCoinsActionType } from "@redux/scanCoins/scanCoins.constants";

//----------------------------------------------
// Reducer Payload
//----------------------------------------------
interface ScanStatus {
  [key: string]: {
    isScanning: boolean;
    otaKey: string;
  };
}

export interface ScanCoinsState {
  isFetching: boolean;
  scanStatus: ScanStatus;
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
