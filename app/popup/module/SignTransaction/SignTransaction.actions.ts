import {
  SignTransactionSetDataAction,
  SignTransactionSetDataPayload,
} from "@module/SignTransaction/SignTransaction.types";
import { SignTransactionActionTypes } from "@module/SignTransaction/SignTransaction.constant";

const actionSetSignTransactionData = (payload: SignTransactionSetDataPayload): SignTransactionSetDataAction => ({
  type: SignTransactionActionTypes.SetData,
  payload,
});

export { actionSetSignTransactionData };
