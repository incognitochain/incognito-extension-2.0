import { Reducer } from "redux";
import { SelectedPrivacyActions, SelectedPrivacyActionType } from "./selectedPrivacy.types";

export interface SelectedPrivacyState {
  tokenID: any;
}

const initialState: SelectedPrivacyState = { tokenID: null };

export const reducer: Reducer<SelectedPrivacyState, SelectedPrivacyActions> = (
  state = initialState,
  action: SelectedPrivacyActions,
): SelectedPrivacyState => {
  switch (action.type) {
    case SelectedPrivacyActionType.SET:
      return {
        ...state,
        tokenID: action.payload,
      };
    case SelectedPrivacyActionType.CLEAR:
      return {
        ...state,
        tokenID: null,
      };

    default:
      return state;
  }
};

export default reducer;
