import { Reducer } from "redux";
import { VersionActions, VersionActionType } from "./version.types";

export interface VersionState {
  version: string;
}

const initialState: VersionState = {
  version: "1.0",
};

export const reducer: Reducer<VersionState, VersionActions> = (
  state = initialState,
  action: VersionActions,
): VersionState => {
  switch (action.type) {
    case VersionActionType.SET: {
      return { ...state, version: action.payload.version };
    }
    default:
      return state;
  }
};
