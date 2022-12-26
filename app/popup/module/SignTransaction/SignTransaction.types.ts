import { Action } from "redux";
import { SignTransactionActionTypes } from "@module/SignTransaction/SignTransaction.constant";
import SelectedPrivacy from "@model/SelectedPrivacyModel";

export interface IPaymentInfo {
  PaymentAddress: string;
  Amount: string;
  Message: string;
}

export interface ISignTransactionState {
  networkFee?: number;
  tokenID: string;
  txType?: number;

  prvPayments: IPaymentInfo[];
  tokenPayments: IPaymentInfo[];

  metadata?: any;
  info: string;
  isSignAndSendTransaction: boolean;
}

export interface ISignTransactionParams extends ISignTransactionState {
  receiverAddress: string;
}

export interface ISignTransactionData extends ISignTransactionState {
  receiverAddress: string;

  tokenSendOriginalAmount: number;
  tokenSendAmountText: string;

  prvSendOriginalAmount: number;
  prvSendAmountText: string;
  networkFeeText: string;

  inputOriginalAmount: number;
  inputAmountText: string;
  maxInputOriginalAmount: number;
  maxInputAmountText: string;

  selectedPrivacy: SelectedPrivacy;

  disabledForm: boolean;

  errorMessage: string;

  feeTokenData?: SelectedPrivacy;
  feeTokenAmount: number;
  feeTokenAmountStr: string;
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------

export interface SignTransactionSetDataPayload extends ISignTransactionState {}

export interface SignTransactionSetDataAction extends Action {
  type: SignTransactionActionTypes.SetData;
  payload: SignTransactionSetDataPayload;
}

export interface SignTransactionFreeDataAction extends Action {
  type: SignTransactionActionTypes.FreeData;
}

//-----------------------------------
export type SignTransactionActions = SignTransactionSetDataAction | SignTransactionFreeDataAction;
