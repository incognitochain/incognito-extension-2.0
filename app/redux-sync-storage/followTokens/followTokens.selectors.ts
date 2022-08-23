import { RootState } from "@redux-sync-storage/reducers/index";
import { createSelector } from "reselect";

export const getFollowTokenList = createSelector(
  (state: RootState) => state,
  (state) => state.followTokensReducer,
);

export const getPTokenList = createSelector(
  (state: RootState) => state.followTokensReducer,
  (followTokensReducer) => followTokensReducer.pTokens,
);

export default {
  getFollowTokenList,
  getPTokenList,
};
