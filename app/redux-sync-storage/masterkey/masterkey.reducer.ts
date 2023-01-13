import { Reducer } from "redux";
import { MasterKeyActionType, MasterKeyActions, MasterKeyActiveType } from "./masterkey.types";

export interface MasterKeyState {
  masterKeyActiveType: MasterKeyActiveType;
}

const initialState: MasterKeyState = {
  masterKeyActiveType: "Masterkey",
};

export const reducer: Reducer<MasterKeyState, MasterKeyActions> = (
  state = initialState,
  action: MasterKeyActions,
): MasterKeyState => {
  switch (action.type) {
    case MasterKeyActionType.SET: {
      return { ...state, masterKeyActiveType: action.payload.masterKeyActiveType };
    }
    default:
      return state;
  }
};
