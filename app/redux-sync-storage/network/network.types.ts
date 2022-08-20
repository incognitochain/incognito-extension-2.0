import { Action } from "redux";
import { ServerModel } from "@services/wallet/Server";

export type NetworkInfo = {
  currentNetwork: ServerModel;
};

export enum NetworkActionType {
  CHANGE = "REDUX_SYNC_STORAGE/NETWORK/CHANGE",
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------

export interface ChangeNetworkAction extends Action {
  type: NetworkActionType.CHANGE;
  payload: {
    currentNetwork: ServerModel;
  };
}

//----------------------------------------------

export type NetworkActions = ChangeNetworkAction;

export default {};
