import { Action } from "redux";
import { SendActionTypes } from "@module/Send/Send.constant";
import SelectedPrivacy from "@model/SelectedPrivacyModel";

export enum TypeSend {
  SEND = "SEND",
  UNSHIELD = "UNSHIELD",
}

export interface ISendData {
  maxAmount: number;
  maxAmountText: string;
  screen: TypeSend;
  networkFeeText: string;
  networkFeeAmount: number;
  networkFeeSymbol: string;
  headerTitle: string;
  showMemo: boolean;
  btnSubmit: string;
  selectedPrivacy: SelectedPrivacy;
  isSend: boolean;
  disabledForm: boolean;
  init: boolean;
  isFetching: boolean;
  isIncognitoAddress: boolean;
  isExternalAddress: boolean;
  inputAmount: string;
  inputAddress: string;
  inputMemo: string;
  inputOriginalAmount: string;
  isMainCrypto: boolean;
}

export interface ISendState {
  isFetching: boolean;

  init: boolean;
  screen: TypeSend;

  // Native Token -> PRV
  networkFee: number;
  networkFeeToken: string;

  // Token | PRV
  burnFee: number;
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

export interface SendSetNetworkFeePayload {
  networkFee: number;
  networkFeeToken: string;
}

export interface SendSetBurnFeePayload {
  burnFee: number;
  burnFeeToken: string;
}

export interface SendSetInitFormPayload {
  init: boolean;
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

export interface SendSetNetworkFeeAction extends Action {
  type: SendActionTypes.SET_NETWORK_FEE;
  payload: SendSetNetworkFeePayload;
}

export interface SendSetBurnFeeAction extends Action {
  type: SendActionTypes.SET_BURN_FEE;
  payload: SendSetBurnFeePayload;
}

export interface SendSetInitFormAction extends Action {
  type: SendActionTypes.SET_INIT_FORM;
  payload: SendSetInitFormPayload;
}

export interface SendFreeDataAction extends Action {
  type: SendActionTypes.FREE_DATA;
}

//-----------------------------------
export type SendActions =
  | SendFetchingAction
  | SendFetchedAction
  | SendSetNetworkFeeAction
  | SendSetBurnFeeAction
  | SendSetInitFormAction
  | SendFreeDataAction;
