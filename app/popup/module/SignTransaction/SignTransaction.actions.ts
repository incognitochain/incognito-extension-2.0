import {
  SignTransactionFreeDataAction,
  SignTransactionSetDataAction,
  SignTransactionSetDataPayload,
} from "@module/SignTransaction/SignTransaction.types";
import { SignTransactionActionTypes } from "@module/SignTransaction/SignTransaction.constant";

const actionSetSignTransactionData = (payload: SignTransactionSetDataPayload): SignTransactionSetDataAction => ({
  type: SignTransactionActionTypes.SetData,
  payload,
});

const actionFreeSignTransactionData = (): SignTransactionFreeDataAction => ({
  type: SignTransactionActionTypes.FreeData,
});

export { actionSetSignTransactionData, actionFreeSignTransactionData };
