import { Reducer } from "redux";
import { FollowTokenActionType, FollowTokenActions, SelectedPrivacy } from "./followTokens.types";

export interface FollowTokenState {
  followTokens?: SelectedPrivacy[];
}

const initialState: FollowTokenState = {
  followTokens: [],
};

export const reducer: Reducer<FollowTokenState, FollowTokenActions> = (
  state = initialState,
  action: FollowTokenActions,
): FollowTokenState => {
  switch (action.type) {
    case FollowTokenActionType.SET: {
      return { ...state, followTokens: action.payload.followTokenList };
    }
    default:
      return state;
  }
};
