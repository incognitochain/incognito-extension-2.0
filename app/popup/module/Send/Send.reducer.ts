import { Reducer } from "redux";
import { ISendState, TypeSend, SendActions } from "@module/Send/Send.types";
import { SendActionTypes } from "@module/Send/Send.constant";

const _initialState: ISendState = {
  isFetching: false,

  init: false,
  screen: TypeSend.SEND,

  networkFee: 0,
  networkFeeToken: "",

  burnFee: 0,
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
