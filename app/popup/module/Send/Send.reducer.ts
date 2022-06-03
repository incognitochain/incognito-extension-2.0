import { Reducer } from "redux";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { ISendState, TypeSend, SendActions } from "@module/Send/Send.types";
import { SendActionTypes } from "@module/Send/Send.constant";
// const { MAX_FEE_PER_TX } = require("incognito-chain-web-js/build/web/wallet");
import COINS from "@constants/coin";

const MAX_FEE_PER_TX = 100;

export const initialState: ISendState = {
  isFetching: false,
  isFetched: false,
  minFeePrv: 0,
  minFeePrvText: "0",
  feePrv: 0,
  feePrvText: "0",
  maxFeePrv: 0,
  maxFeePrvText: "0",
  feePToken: 0,
  feePTokenText: "0",
  feeBurnPToken: 0,
  feeBurnPTokenText: "0",
  minFeePToken: 0,
  minFeePTokenText: "0",
  maxFeePToken: 0,
  maxFeePTokenText: "0",
  amount: 0,
  amountText: "0",
  minAmount: 0,
  minAmountText: "0",
  init: false,
  screen: TypeSend.SEND,
  types: [
    {
      tokenId: COINS.PRV.id,
      symbol: COINS.PRV.symbol,
    },
  ],
  actived: COINS.PRV.id,
  rate: 1,
  isAddressValidated: true,
  isValidETHAddress: true,
  userFees: {
    isFetching: false,
    isFetched: false,
    data: null,
    hasMultiLevel: false,
    isMemoRequired: false,
  },
  isValidating: false,
  fast2x: false,
  totalFeePrv: 0,
  totalFeePrvText: "0",
  userFeePrv: "0",
  totalFeePToken: 0,
  totalFeePTokenText: "0",
  userFeePToken: "0",
  sending: false,
  errorMessage: "",
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
    case SendActionTypes.SET_MAX_NATIVE_FEE: {
      const { maxFeePrv, maxFeePrvText } = action.payload;
      return {
        ...state,
        maxFeePrv,
        maxFeePrvText,
      };
    }
    case SendActionTypes.SET_MAX_PTOKEN_FEE: {
      const { amount, amountText } = action.payload;
      return {
        ...state,
        amount,
        amountText,
        maxFeePToken: amount,
        maxFeePTokenText: amountText,
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
