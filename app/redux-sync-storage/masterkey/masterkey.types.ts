import { Action } from "redux";

export type MasterKeyActiveType = "Masterkey" | "Masterless";

export enum MasterKeyActionType {
  SET = "REDUX_SYNC_STORAGE/MASTERKEY/SET",
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------

export interface SetMasterKeyActiveAction extends Action {
  type: MasterKeyActionType.SET;
  payload: {
    masterKeyActiveType: MasterKeyActiveType;
  };
}

//----------------------------------------------

export type MasterKeyActions = SetMasterKeyActiveAction;

export default {};
