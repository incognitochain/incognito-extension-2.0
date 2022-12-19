import MasterKeyModel from "@model/MasterKeyModel";
import { Action } from "redux";

export enum MasterKeyActionType {
  LOAD_ALL = `MASTER_KEY/LOAD_ALL`,
  SWITCH = `MASTER_KEY/SWITCH`,
  CREATE = `MASTER_KEY/CREATE`,
  REMOVE = `MASTER_KEY/REMOVE`,
  UPDATE = `MASTER_KEY/UPDATE`,
  IMPORT = `MASTER_KEY/IMPORT`,
  INIT = `MASTER_KEY/INIT`,
  LOAD_ALL_ACCOUNTS = `MASTER_KEY/LOAD_ALL_ACCOUNTS`,
  SWITCHING = `MASTER_KEY/SWITCHING`,
  LOADING_INITIAL = `MASTER_KEY/LOADING_INITIAL`,
  SYNC_ACCOUNT_SUCCESS = `MASTER_KEY/SYNC_ACCOUNT_SUCCESS`,
  LOADING_ALL_ACCOUNTS = `MASTER_KEY/LOADING_ALL_ACCOUNTS`,
  SWITCH_NETWORK = `MASTER_KEY/SWITCH_NETWORK`,
}

//----------------------------------------------
// Payload Definition here!
//----------------------------------------------

export interface InitMasterKeyPayload {
  masterKeyName: string;
  mnemonic: string;
  password: string;
  createNewWallet?: boolean;
}

export interface ImportMasterKeyPayload {
  masterKeyName: string;
  mnemonic: string;
  password: string;
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------

export interface InitMasterKeySuccessAction extends Action {
  type: MasterKeyActionType.INIT;
  payload: MasterKeyModel[];
}

export interface CreateMasterKeySuccessAction extends Action {
  type: MasterKeyActionType.CREATE;
  payload: any;
}
export interface MasterKeyLoadingInitAction extends Action {
  type: MasterKeyActionType.LOADING_INITIAL;
  payload: any;
}

export interface MasterKeyLoadAllAction extends Action {
  type: MasterKeyActionType.LOAD_ALL;
  payload: any;
}
export interface MasterKeySwitchingAction extends Action {
  type: MasterKeyActionType.SWITCHING;
  payload: boolean;
}
export interface MasterKeySwitchAction extends Action {
  type: MasterKeyActionType.SWITCH;
  payload: string;
}
export interface MasterKeyRemoveAction extends Action {
  type: MasterKeyActionType.REMOVE;
  payload: any;
}
export interface MasterKeyUpdateAction extends Action {
  type: MasterKeyActionType.UPDATE;
  payload: any;
}
export interface MasterKeyImportAction extends Action {
  type: MasterKeyActionType.IMPORT;
  payload: any;
}
export interface MasterKeyLoadAllAccoutsAction extends Action {
  type: MasterKeyActionType.LOAD_ALL_ACCOUNTS;
  payload: any;
}

export interface MasterKeyLoadingAllAccountAction extends Action {
  type: MasterKeyActionType.LOADING_ALL_ACCOUNTS;
  payload: any;
}

export interface MasterKeySwitchNetworkAction extends Action {
  type: MasterKeyActionType.SWITCH_NETWORK;
  payload: any;
}

//-----------------------------------

export type MasterKeyActions =
  | InitMasterKeySuccessAction
  | CreateMasterKeySuccessAction
  | MasterKeyLoadingInitAction
  | MasterKeyLoadAllAction
  | MasterKeySwitchingAction
  | MasterKeySwitchAction
  | MasterKeyRemoveAction
  | MasterKeyUpdateAction
  | MasterKeyImportAction
  | MasterKeyLoadAllAccoutsAction
  | MasterKeyLoadingAllAccountAction
  | MasterKeySwitchNetworkAction;
