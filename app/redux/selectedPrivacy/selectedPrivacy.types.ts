import { Action } from "redux";

export enum SelectedPrivacyActionType {
  SET = `SELECTED_PRIVACY/SET`,
  CLEAR = `SELECTED_PRIVACY/CLEAR`,
}

interface SelectedPrivacySetAction extends Action {
  type: SelectedPrivacyActionType.SET;
  payload: any;
}

interface SelectedPrivacyClearAction extends Action {
  type: SelectedPrivacyActionType.CLEAR;
  payload: any;
}

export type SelectedPrivacyActions = SelectedPrivacySetAction | SelectedPrivacyClearAction;
