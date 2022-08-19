import {
  SignTransactionSetDataAction,
  SignTransactionSetDataPayload,
  SignTransactionActionTypes,
} from "@module/SignTransaction";

const actionSetSignTransactionData = (payload: SignTransactionSetDataPayload): SignTransactionSetDataAction => ({
  type: SignTransactionActionTypes.SetData,
  payload,
});

export { actionSetSignTransactionData };
