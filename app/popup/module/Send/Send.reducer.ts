import { Reducer } from "redux";
import { ISendState, TypeSend, SendActions } from "@module/Send/Send.types";
import { SendActionTypes } from "@module/Send/Send.constant";
const { PRVIDSTR, ACCOUNT_CONSTANT } = require("incognito-chain-web-js/build/web/wallet");

const _initialState: ISendState = {
  init: true,
  screen: TypeSend.SEND,

  networkFee: ACCOUNT_CONSTANT.MAX_FEE_PER_TX,
  networkFeeToken: PRVIDSTR,

  burnFee: 0,
  burnFeeToken: "",

  burnAmount: "0",
  burnFeeID: "",
  burnToken: "",
  estimatedBurnAmount: 0,
  estimatedExpectedAmount: 0,
  feeAddress: "",
  isUnified: false,
  receiverAddress: "",
  receiverTokenID: "",
  isFetching: false,
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
    case SendActionTypes.SET_NETWORK_FEE: {
      const { networkFee, networkFeeToken } = action.payload;
      return {
        ...state,
        networkFee,
        networkFeeToken,
      };
    }
    case SendActionTypes.SET_BURN_FEE: {
      const { burnFee, burnFeeToken } = action.payload;
      return {
        ...state,
        burnFee,
        burnFeeToken,
      };
    }
    case SendActionTypes.SET_INIT_FORM: {
      const { init } = action.payload;
      return {
        ...state,
        init,
      };
    }
    case SendActionTypes.UNSHIELD: {
      const payload = action.payload;
      return {
        ...state,
        ...payload,
      };
    }
    case SendActionTypes.FREE_DATA: {
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
