import { Reducer } from "redux";
import { FollowTokenActionType, FollowTokenActions, SelectedPrivacy } from "./followTokens.types";
import PTokenModel from "@model/pTokenModel";

export interface FollowTokenState {
  followTokens?: SelectedPrivacy[];
  pTokens: PTokenModel[];
}

const initialState: FollowTokenState = {
  followTokens: [],
  pTokens: [],
};

export const reducer: Reducer<FollowTokenState, FollowTokenActions> = (
  state = initialState,
  action: FollowTokenActions,
): FollowTokenState => {
  switch (action.type) {
    case FollowTokenActionType.SET: {
      return { ...state, followTokens: action.payload.followTokenList };
    }
    case FollowTokenActionType.SET_PTOKEN: {
      return { ...state, pTokens: action.payload.pTokens };
    }
    default:
      return state;
  }
};
