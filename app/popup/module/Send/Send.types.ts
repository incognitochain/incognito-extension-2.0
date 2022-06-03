import { Action } from "redux";
import { SendActionTypes } from "@module/Send/Send.constant";

//----------------------------------------------
// Reducer Payload
//----------------------------------------------
export enum TypeSend {
  SEND = "SEND",
  UNSHIELD = "UNSHIELD",
}

export interface ISendState {
  isFetching: boolean;
  isFetched: boolean;
  init: boolean;

  typeSend: TypeSend;

  // Fee
  isUseFeePRV: boolean;
  feePRV: number;
  feePRVStr: string;
  feePToken: number;
  feePTokenStr: string;

  // Amount
  minAmount: number;
  minAmountText: string;
  maxAmount: number;
  maxAmountText: string;
}

//----------------------------------------------
// Payload Definition here!
//----------------------------------------------
export interface SendFetchingPayload {
  isFetching: boolean;
}

export interface SendSetMaxPRVFeePayload {
  maxFeePrv: number;
  maxFeePrvText: string;
}

export interface SendSetMaxPTokenFeePayload {
  amount: number;
  amountText: string;
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------
export interface SendFetchingAction extends Action {
  type: SendActionTypes.FETCHING;
  payload: SendFetchingPayload;
}

export interface SendFetchedAction extends Action {
  type: SendActionTypes.FETCHED;
}

export interface SendSetMaxPRVFeeAction extends Action {
  type: SendActionTypes.SET_MAX_NATIVE_FEE;
  payload: SendSetMaxPRVFeePayload;
}

export interface SendSetMaxPTokenFeeAction extends Action {
  type: SendActionTypes.SET_MAX_PTOKEN_FEE;
  payload: SendSetMaxPTokenFeePayload;
}

export interface SendInitAction extends Action {
  type: SendActionTypes.INIT;
}

//-----------------------------------
export type SendActions =
  | SendFetchingAction
  | SendFetchedAction
  | SendSetMaxPRVFeeAction
  | SendSetMaxPTokenFeeAction
  | SendInitAction;
