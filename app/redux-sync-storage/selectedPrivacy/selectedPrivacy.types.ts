import { Action } from "redux";

export interface ISelectedPrivacyState {
  tokenID: string;
}

export enum SelectedPrivacyActionType {
  SET = `REDUX_SYNC_STORAGE/SELECTED_PRIVACY/SET`,
  CLEAR = `REDUX_SYNC_STORAGE/SELECTED_PRIVACY/CLEAR`,
}

export interface SelectedPrivacySetPayload {
  tokenID: string;
}

export interface SelectedPrivacySetAction extends Action {
  type: SelectedPrivacyActionType.SET;
  payload: SelectedPrivacySetPayload;
}

export interface SelectedPrivacyClearAction extends Action {
  type: SelectedPrivacyActionType.CLEAR;
}

export type SelectedPrivacyActions = SelectedPrivacySetAction | SelectedPrivacyClearAction;
