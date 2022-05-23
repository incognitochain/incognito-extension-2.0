import { Reducer } from "redux";
import { WalletActionType, WalletAction } from "./wallet.types";

const initialState = null;

export const reducer: Reducer<any> = (state = initialState, action: WalletAction): any => {
  switch (action.type) {
    case WalletActionType.SET:
      return action.data;
    case WalletActionType.REMOVE:
      return initialState;
    default:
      return state;
  }
};
