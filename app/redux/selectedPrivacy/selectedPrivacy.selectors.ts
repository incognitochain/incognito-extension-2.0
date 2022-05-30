import CONSTANT_COMMONS from "@constants/common";
import { BIG_COINS, PRIORITY_LIST } from "@constants/dexV2";
import SelectedPrivacyModel from "@model/SelectedPrivacyModel";
import { defaultAccount } from "@redux/account/account.selectors";
import { followTokensWalletSelector } from "@redux/follow/follow.selectors";
import { RootState } from "@redux/reducers/index";
import { internalTokens, pTokens, tokensFollowedSelector } from "@redux/token/token.selectors";
import { ExHandler } from "@services/exception";
import { getPrice } from "@utils/selectedPrivacy";
import toLower from "lodash/toLower";
import memoize from "memoize-one";
import { createSelector } from "reselect";

export const selectedPrivacyTokenID = createSelector(
  (state: RootState) => state.selectedPrivacy?.tokenID,
  (tokenId) => tokenId,
);

export const getPrivacyDataByTokenID = createSelector(
  defaultAccount,
  internalTokens,
  pTokens,
  tokensFollowedSelector,
  followTokensWalletSelector,
  (account, internalTokens, pTokens, followed, tokenFollowWallet) =>
    memoize((tokenID: any) => {
      let data = {};
      if (!tokenID) {
        return data;
      }
      // 880ea0787f6c1555e59e3958a595086b7802fc7a38276bcd80d4525606557fbc
      console.log(pTokens, internalTokens);
      try {
        tokenID = toLower(tokenID);
        const internalTokenData =
          internalTokens?.find((t: any) => t?.id !== CONSTANT_COMMONS.PRV_TOKEN_ID && t?.id === tokenID) || {};
        const pTokenData = pTokens?.find((t: any) => t?.tokenId === tokenID);
        const followedTokenData = followed.find((t: any) => t?.id === tokenID) || {};
        const isExistTokenFollowInWallet = tokenFollowWallet.some((t: any) => t?.id === tokenID);
        if (!internalTokenData && !pTokenData && tokenID !== CONSTANT_COMMONS.PRV_TOKEN_ID) {
          console.log(`Can not find coin with id ${tokenID}`);
        }
        const token = new SelectedPrivacyModel(
          account,
          { ...internalTokenData, ...followedTokenData },
          pTokenData,
          tokenID,
        );
        const tokenUSDT = pTokens.find((token: any) => token?.tokenId === BIG_COINS.USDT);
        const price = getPrice({ token, tokenUSDT });
        let priority = PRIORITY_LIST.indexOf(tokenID) > -1 ? PRIORITY_LIST.indexOf(tokenID) : PRIORITY_LIST.length + 1;
        data = {
          ...token,
          ...price,
          amount: followedTokenData.amount,
          isFollowed: isExistTokenFollowInWallet,
          priority,
        };
      } catch (e) {
        console.log("error", tokenID, e);
      }
      return data;
    }),
);

export const getPrivacyDataBaseOnAccount = createSelector(
  internalTokens,
  pTokens,
  tokensFollowedSelector,
  selectedPrivacyTokenID,
  (_internalTokens, _pTokens, _followed, tokenID) => (account: any) => {
    try {
      // 'PRV' is not a token
      const internalTokenData =
        _internalTokens?.find((t: any) => t?.id !== CONSTANT_COMMONS.PRV_TOKEN_ID && t?.id === tokenID) || {};
      const pTokenData = _pTokens?.find((t: any) => t?.tokenId === tokenID);
      const followedTokenData = _followed.find((t: any) => t?.id === tokenID) || {};
      if (!internalTokenData && !pTokenData && tokenID !== CONSTANT_COMMONS.PRV_TOKEN_ID) {
        console.log(`Can not find coin with id ${tokenID}`);
      }
      return new SelectedPrivacyModel(account, { ...internalTokenData, ...followedTokenData }, pTokenData, tokenID);
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
