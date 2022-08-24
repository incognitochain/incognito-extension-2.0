import SelectedPrivacyModel from "@model/SelectedPrivacyModel";
import { RootState } from "@redux-sync-storage/reducers";
// import { pTokens } from "@redux/token/token.selectors";
import toLower from "lodash/toLower";
import memoize from "memoize-one";
import { createSelector } from "reselect";
import { followsTokenAssetsSelector } from "@module/Assets/Assets.selector";
import { getPTokenList } from "@redux-sync-storage/followTokens/followTokens.selectors";
const { PRVIDSTR } = require("incognito-chain-web-js/build/web/wallet");

const selectedPrivacySelector = createSelector(
  (state: RootState) => state.selectedPrivacyReducer,
  (selectedPrivacyReducer) => selectedPrivacyReducer,
);

export const selectedPrivacyTokenID = createSelector(selectedPrivacySelector, ({ tokenID }) => tokenID);

export const getPrivacyDataByTokenID = createSelector(
  followsTokenAssetsSelector,
  getPTokenList,
  (followTokens, pTokens) =>
    memoize((tokenID: string): SelectedPrivacyModel => {
      let data: any = {};
      if (!tokenID) return data;
      try {
        tokenID = toLower(tokenID);
        const pTokenData = pTokens?.find((t: any) => t?.tokenId === tokenID);
        if (!pTokenData && tokenID !== PRVIDSTR) {
          console.log(`Can not find coin with id ${tokenID}`);
        }
        return new SelectedPrivacyModel(pTokenData, tokenID, followTokens);
      } catch (e) {
        console.log("error", tokenID, e);
      }
      return data;
    }),
);

export const selectedPrivacyToken = createSelector(
  selectedPrivacyTokenID,
  getPrivacyDataByTokenID,
  (tokenID, getFn) => {
    return getFn(tokenID);
  },
);

export const selectedPrivacyNativeToken = createSelector(getPrivacyDataByTokenID, (getFn) => {
  return getFn(PRVIDSTR);
});

export default {
  getPrivacyDataByTokenID,
  selectedPrivacyTokenID,
  selectedPrivacyToken,
  selectedPrivacyNativeToken,
};
