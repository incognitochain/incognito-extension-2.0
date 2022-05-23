import { Action } from "redux";

export enum WalletActionType {
  SET = `WALLET/SET`,
  REMOVE = `WALLET/REMOVE`,
}

export interface WalletSetAction extends Action {
  type: WalletActionType.SET;
  data: any;
}

export interface WalletRemoveAction extends Action {
  type: WalletActionType.REMOVE;
}

export type WalletAction = WalletSetAction | WalletRemoveAction;
