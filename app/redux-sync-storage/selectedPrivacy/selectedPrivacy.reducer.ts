import { Reducer } from "redux";
import { SelectedPrivacyActions, SelectedPrivacyActionType, ISelectedPrivacyState } from "./selectedPrivacy.types";
const { PRVIDSTR } = require("incognito-chain-web-js/build/web/wallet");

export const initialState: ISelectedPrivacyState = {
  tokenID: PRVIDSTR,
};

export const reducer: Reducer<ISelectedPrivacyState, SelectedPrivacyActions> = (
  state = initialState,
  action: SelectedPrivacyActions,
) => {
  switch (action.type) {
    case SelectedPrivacyActionType.SET:
      const { tokenID } = action.payload;
      return {
        ...state,
        tokenID,
      };
    case SelectedPrivacyActionType.CLEAR:
      return {
        ...state,
        tokenID: PRVIDSTR,
      };
    default:
      return state;
  }
};

export default reducer;
