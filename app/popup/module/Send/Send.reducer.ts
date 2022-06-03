import { Reducer } from "redux";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { ISendState, TypeSend, SendActions } from "@module/Send/Send.types";
import { SendActionTypes } from "@module/Send/Send.constant";
const { MAX_FEE_PER_TX } = require("incognito-chain-web-js/build/web/wallet");

export const initialState: ISendState = {
  isFetching: false,
  isFetched: false,
  init: false,

  typeSend: TypeSend.SEND,

  // Fee
  isUseFeePRV: true,
  feePRV: MAX_FEE_PER_TX,
  feePRVStr: MAX_FEE_PER_TX.toString(),
  feePToken: 0,
  feePTokenStr: "0",

  // Amount
  minAmount: 0,
  minAmountText: "0",

  // Unshield need max amount
  maxAmount: 0,
  maxAmountText: "0",
};

const reducer: Reducer<ISendState, SendActions> = (state = initialState, action: SendActions) => {
  switch (action.type) {
    case SendActionTypes.FETCHING: {
      const { isFetching } = action.payload;
      return {
        ...state,
        isFetching,
      };
    }
    case SendActionTypes.FETCHED: {
      return {
        ...state,
        isFetching: false,
      };
    }
    default:
      return state;
  }
};

const persistConfig: any = {
  key: "sendReducer",
  storage: storage,
  whitelist: [""],
  stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, reducer);
