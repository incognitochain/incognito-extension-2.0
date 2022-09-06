import { Action } from "redux";

export enum VersionActionType {
  SET = "REDUX_SYNC_STORAGE/VERSION/SET",
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------

export interface SetVersionAction extends Action {
  type: VersionActionType.SET;
  payload: {
    version: string;
  };
}

//----------------------------------------------

export type VersionActions = SetVersionAction;

export default {};
