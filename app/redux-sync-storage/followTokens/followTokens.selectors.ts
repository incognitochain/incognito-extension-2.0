import { RootState } from "@redux-sync-storage/reducers/index";
import { createSelector } from "reselect";

export const getFollowTokenList = createSelector(
  (state: RootState) => state,
  (state) => state.followTokens,
);

export default {
  getFollowTokenList,
};
