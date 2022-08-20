import { Reducer } from "redux";
import { NetworkActionType, NetworkActions } from "./network.types";
import { MAIN_NET_SERVER, ServerModel } from "@services/wallet/Server";

export interface NetworkReducerState {
  currentNetwork: ServerModel;
}

const initialState: NetworkReducerState = {
  currentNetwork: MAIN_NET_SERVER,
};

export const reducer: Reducer<NetworkReducerState, NetworkActions> = (
  state = initialState,
  action: NetworkActions,
): NetworkReducerState => {
  switch (action.type) {
    case NetworkActionType.CHANGE: {
      return { ...state, currentNetwork: action.payload.currentNetwork };
    }
    default:
      return state;
  }
};
