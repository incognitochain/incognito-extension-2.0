import { Action } from "redux";
import { SendActionTypes } from "@module/Send/Send.constant";

export enum TypeSend {
  SEND = "SEND",
  UNSHIELD = "UNSHIELD",
}

export interface ISendData {
  feePrv: number;
  feePToken: number;
  fee: number;
  feeText: string;
  feeUnitByTokenId: string;
  feePDecimals: number;
  feeSymbol: string;
  totalFee: number;
  totalFeeText: string;
  maxFee: number;
  maxFeeText: string;
  minAmount: number;
  minAmountText: string;
  maxAmount: number;
  maxAmountText: string;
  isUsedPRVFee: boolean;
  isUseTokenFee: boolean;
  isUnShield: boolean;
  isSend: boolean;
  hasMultiLevel: boolean;
  inputAmount: string;
  inputMemo: string;
  inputAddress: string;
  titleBtnSubmit: string;
  forceSendTitleBtnSubmit: string;
  disabledForm: boolean;
  isIncognitoAddress: boolean;
  isExternalAddress: boolean;
  userFee: string;
  originalFee: number;
  nativeFee: string;
  privacyFee: string;
  incognitoAmount: string;
  requestedAmount: string;
  paymentAddress: string;
  memo: string;
  userFeeLevel: number;
  userFeeSelection: number;
  symbol: string;
  amountFormatedNoClip: string;
  totalFeeFormatedNoClip: string;
  feeError: string;
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

export interface ISendFormData {
  amount: string;
  memo?: string;
  toAddress: string;
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
