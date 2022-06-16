import { Action } from "redux";
import { ScanCoinsActionType } from "@redux/scanCoins/scanCoins.constants";

//----------------------------------------------
// Reducer Payload
//----------------------------------------------
export interface IScanStatus {
  [key: string]: {
    isScanning: boolean;
    otaKey: string;
  };
}

export interface IScanCoinsState {
  isFetching: boolean;
  scanStatus: IScanStatus;
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

export interface RescanCoinsPayload {
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

export interface ReScanCoinsAction extends Action {
  type: ScanCoinsActionType.RESCAN_COINS;
  payload: RescanCoinsPayload;
}

//-----------------------------------
export type ScanCoinsActions = ScanCoinsFetchingAction | ScanCoinsFirstTimeAction | ReScanCoinsAction;
