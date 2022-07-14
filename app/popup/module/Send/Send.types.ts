import { Action } from "redux";
import { SendActionTypes } from "@module/Send/Send.constant";
import SelectedPrivacy from "@model/SelectedPrivacyModel";

export enum TypeSend {
  SEND = "SEND",
  CONFIRM_UNSHIELD = "CONFIRM_UNSHIELD",
}

export interface ISendData {
  maxAmount: number;
  maxAmountText: string;
  minAmount: number;
  minAmountText: string;
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
  networkFeeToken: SelectedPrivacy;
  accountBalanceStr: string;

  burnFee: string;
  burnFeeText: string;
  burnFeeToken: SelectedPrivacy;
  burnFeeSymbol: string;

  isUnified: boolean;
  burnFeeID: string;
  receiverTokenID: string;
  receiverAddress: string;
  feeAddress: string;

  estimatedBurnAmount: number;
  estimatedExpectedAmount: number;

  buyToken: SelectedPrivacy;
}

export interface IUnshield {
  // Native Token -> PRV
  networkFee: number;
  networkFeeToken: string;

  // Token | PRV
  burnFee: number;
  burnFeeToken: string;

  isUnified: boolean;

  burnFeeID: string;

  burnAmount: string;
  burnToken: string;

  receiverAddress: string;
  feeAddress: string;

  receiverTokenID: string;

  estimatedBurnAmount: number;
  estimatedExpectedAmount: number;
  screen: TypeSend;
}

export interface ISendState extends IUnshield {
  isFetching: boolean;

  init: boolean;
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

export interface SendSetUnshieldPayload extends IUnshield {}

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

export interface SendSetUnshieldAction extends Action {
  type: SendActionTypes.UNSHIELD;
  payload: SendSetUnshieldPayload;
}

//-----------------------------------
export type SendActions =
  | SendFetchingAction
  | SendFetchedAction
  | SendSetNetworkFeeAction
  | SendSetBurnFeeAction
  | SendSetInitFormAction
  | SendFreeDataAction
  | SendSetUnshieldAction;
