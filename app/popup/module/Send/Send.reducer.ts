import { Reducer } from "redux";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { ISendState, TypeSend, SendActions } from "@module/Send/Send.types";
import { SendActionTypes } from "@module/Send/Send.constant";
const { PRVIDSTR } = require("incognito-chain-web-js/build/web/wallet");

const MAX_FEE_PER_TX = 100;

const _initialState: ISendState = {
  isFetching: false,
  isFetched: false,

  init: false,
  screen: TypeSend.SEND,

  networkFee: MAX_FEE_PER_TX,
  networkFeeText: `${MAX_FEE_PER_TX}`,
  networkFeeToken: PRVIDSTR,

  burnFee: 0,
  burnFeeText: "0",
  burnFeeToken: "",
};

export const initialState: ISendState = { ..._initialState };

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
