import { Action } from "redux";
import { ConfigsActionType } from "@popup/configs/Configs.constants";

export interface IConfigsState {
  language: string;
  network: string;
}

export interface ConfigNetworkPayload {
  network: string;
}

export interface ConfigNetworkAction extends Action {
  type: ConfigsActionType.UPDATE_NETWORK;
  payload: ConfigNetworkPayload;
}

export type NetworkActions = ConfigNetworkAction;
