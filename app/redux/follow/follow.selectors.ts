import { defaultAccountSelector } from "@redux/account/account.selectors";
import { RootState } from "@redux/reducers/index";
import orderBy from "lodash/orderBy";
import { createSelector } from "reselect";
const { PRVIDSTR } = require("incognito-chain-web-js/build/wallet");

export const followStateSelector = createSelector(
  (state: RootState) => state.follow,
  (follow) => follow,
);

export const followTokensWalletSelector = createSelector(
  followStateSelector,
  defaultAccountSelector,
  (followList: any, { OTAKey }) => {
    const tokens = orderBy(
      followList.data[OTAKey] || [],
      [(c) => c.id === PRVIDSTR, (c) => Number(c.amount || "0")],
      ["desc", "desc"],
    );
    return tokens;
  },
);

export const followTokenItemSelector = createSelector(followTokensWalletSelector, (tokens) => (tokenId: any) => {
  return tokens.find((item) => item.id === tokenId);
});

export const isFetchingSelector = createSelector(followStateSelector, (followState: any) => followState?.isFetching);

export default {
  followTokensWalletSelector,
};
