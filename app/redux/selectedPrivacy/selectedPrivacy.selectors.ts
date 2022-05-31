import CONSTANT_COMMONS from "@constants/common";
import { BIG_COINS } from "@constants/dexV2";
import SelectedPrivacyModel from "@model/SelectedPrivacyModel";
import { defaultAccount } from "@redux/account/account.selectors";
import { RootState } from "@redux/reducers";
import { internalTokens, pTokens, tokensFollowedSelector } from "@redux/token/token.selectors";
import { ExHandler } from "@services/exception";
// import { getPrice } from "@utils/selectedPrivacy";
import toLower from "lodash/toLower";
import memoize from "memoize-one";
import { createSelector } from "reselect";
import { followsTokenAssetsSelector } from "@module/Assets/Assets.selector";
const { PRVIDSTR } = require("incognito-chain-web-js/build/web/wallet");

export const selectedPrivacyTokenID = createSelector(
  (state: RootState) => state.selectedPrivacy?.tokenID,
  (tokenId) => tokenId,
);

export const getPrivacyDataByTokenID = createSelector(followsTokenAssetsSelector, pTokens, (followTokens, pTokens) =>
  memoize((tokenID: any): SelectedPrivacyModel => {
    let data: any = {};
    if (!tokenID) return data;
    try {
      tokenID = toLower(tokenID);
      const pTokenData = pTokens?.find((t: any) => t?.tokenId === tokenID);
      if (!pTokenData && tokenID !== PRVIDSTR) {
        console.log(`Can not find coin with id ${tokenID}`);
      }
      const token = new SelectedPrivacyModel(pTokenData, tokenID, followTokens);
      // const tokenUSDT = pTokens.find((token: any) => token?.tokenId === BIG_COINS.USDT);
      // const price = getPrice({ token, tokenUSDT });
      // let priority = PRIORITY_LIST.indexOf(tokenID) > -1 ? PRIORITY_LIST.indexOf(tokenID) : PRIORITY_LIST.length + 1;
      // data = {
      //   ...token,
      //   ...price,
      //   amount: followedTokenData.amount,
      //   isFollowed: isExistTokenFollowInWallet,
      //   priority,
      // };
      return token;
    } catch (e) {
      console.log("error", tokenID, e);
    }
    return data;
  }),
);

export const getPrivacyDataBaseOnAccount = createSelector(
  pTokens,
  followsTokenAssetsSelector,
  selectedPrivacyTokenID,
  (_pTokens, _followed, tokenID) => (account: any) => {
    try {
      const pTokenData = _pTokens?.find((t: any) => t?.tokenId === tokenID);
      // const followedTokenData = _followed.find((t: any) => t?.id === tokenID) || {};
      if (!pTokenData && tokenID !== PRVIDSTR) {
        console.log(`Can not find coin with id ${tokenID}`);
      }
      return new SelectedPrivacyModel(pTokenData, tokenID, _followed);
    } catch (e) {
      new ExHandler(e);
    }
  },
);

export const selectedPrivacy = createSelector(
  selectedPrivacyTokenID,
  getPrivacyDataByTokenID,
  (selectedSymbol, getFn) => {
    return getFn(selectedSymbol);
  },
);

export const selectedPrivacyByFollowedSelector = createSelector(
  selectedPrivacy,
  tokensFollowedSelector,
  (selected: any, followed: any) => followed.find((token: any) => token?.id === selected?.tokenId),
);

export const findTokenFollowedByIdSelector = createSelector(
  tokensFollowedSelector,
  (followed) => (tokenID: any) => followed.find((token: any) => token?.id === tokenID),
);

export default {
  getPrivacyDataByTokenID,
  selectedPrivacyTokenID,
  selectedPrivacy,
  getPrivacyDataBaseOnAccount,
  selectedPrivacyByFollowedSelector,
  findTokenFollowedByIdSelector,
};
