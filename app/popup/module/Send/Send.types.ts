import { Action } from "redux";
import { SendActionTypes } from "@module/Send/Send.constant";

export enum TypeSend {
  SEND = "SEND",
  UNSHIELD = "UNSHIELD",
}

export interface ISendData {
  maxAmount: number;
  maxAmountText: string;
  screen: TypeSend;
}

export interface ISendFormData {
  amount: string;
  memo?: string;
  toAddress: string;
}

export interface ISendState {
  isFetching: boolean;
  isFetched: boolean;

  init: boolean;
  screen: TypeSend;

  // Native Token -> PRV
  networkFee: number;
  networkFeeText: string;
  networkFeeToken: string;

  // Token | PRV
  burnFee: number;
  burnFeeText: string;
  burnFeeToken: string;
}

//----------------------------------------------
// Payload Definition here!
//----------------------------------------------
export interface SendFetchingPayload {
  isFetching: boolean;
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

//-----------------------------------
export type SendActions = SendFetchingAction | SendFetchedAction;
