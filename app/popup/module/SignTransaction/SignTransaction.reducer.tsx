import { Reducer } from "redux";
import { ISignTransactionState, SignTransactionActions } from "@module/SignTransaction/SignTransaction.types";
import { SignTransactionActionTypes } from "@module/SignTransaction/SignTransaction.constant";
const { ACCOUNT_CONSTANT } = require("incognito-chain-web-js/build/web/wallet");

const _initialState: ISignTransactionState = {
  networkFee: ACCOUNT_CONSTANT.MAX_FEE_PER_TX,
  tokenID: "",
  txType: undefined,

  prvPayments: [],
  tokenPayments: [],

  metadata: undefined,
  info: "",

  isSignAndSendTransaction: true,
};

export const initialState: ISignTransactionState = { ..._initialState };

const reducer: Reducer<ISignTransactionState, SignTransactionActions> = (
  state = initialState,
  action: SignTransactionActions,
) => {
  switch (action.type) {
    case SignTransactionActionTypes.SetData: {
      const { payload } = action;
      return {
        ...{
          ...payload,
        },
      };
    }
    case SignTransactionActionTypes.FreeData: {
      return {
        ...{
          ..._initialState,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
