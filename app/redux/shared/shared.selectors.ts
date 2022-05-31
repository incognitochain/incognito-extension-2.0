import CONSTANT_COMMONS from "@constants/common";
import { BIG_COINS } from "@constants/dexV2";
import { defaultAccountName, defaultAccountSelector } from "@redux/account/account.selectors";
import FollowSelector from "@redux/follow/follow.selectors";
import { RootState } from "@redux/reducers/index";
import selectedPrivacySelector, { getPrivacyDataByTokenID } from "@redux/selectedPrivacy/selectedPrivacy.selectors";
import { internalTokensSelector, pTokensSelector } from "@redux/token/token.selectors";
import { walletSelector } from "@redux/wallet/wallet.selectors";
// import { currencySelector, decimalDigitsSelector } from "@screens/Setting";
// import { formatAmount } from "@components/Token";
import { PRV } from "@services/wallet/tokenService";
import { getAccountWallet } from "@services/wallet/wallet.shared";
import convert from "@utils/convert";
import format from "@utils/format";
import { compact, fromPairs, isNaN, uniqBy } from "lodash";
import { createSelector } from "reselect";
import orderBy from "lodash/orderBy";
import SelectedPrivacyModel from "@model/SelectedPrivacyModel";
import { followsTokenAssetsSelector } from "@module/Assets/Assets.selector";
const { PRVIDSTR } = require("incognito-chain-web-js/build/web/wallet");

export const formatPrice = (price: any, toNumber = false) => {
  // const pDecimals = 9;
  // const originalAmount = convert.toOriginalAmount({ humanAmount: price, decimals: pDecimals, round: false }) || 0;
  // const result = format.amountVer2(originalAmount, pDecimals);
  // return toNumber
  //   ? convert.toNumber({
  //       text: result,
  //       autoCorrect: true,
  //     })
  //   : result;
};

export const formatAmount = (
  price: any,
  amount: any,
  pDecimals: any,
  togglePDecimals: any,
  decimalDigits: any,
  toNumber = false,
) => {
  // // format Amount to origin
  // const priceFormat = formatPrice(price, true) || 0;
  //
  // // format amount with has decimalDigits
  // // const formatAmount = format.amount(amount, pDecimals, true, decimalDigits);
  // const formatAmount = format.amountVer2(amount, pDecimals);
  //
  // const totalAmountNumber = convert.toNumber(formatAmount, true) * priceFormat;
  //
  // const amountOriginalFormat = convert.toOriginalAmount(totalAmountNumber, togglePDecimals, true) || 0;
  //
  // const amountBaseToggle = format.amount(amountOriginalFormat, togglePDecimals, true, decimalDigits);
  //
  // return toNumber ? convert.toNumber(amountBaseToggle, true) : amountBaseToggle;
};

export const currencySelector = createSelector(
  (state: RootState) => state,
  () => true,
);

export const decimalDigitsSelector = createSelector(
  (state: RootState) => state,
  () => true,
);

export const isGettingBalance = createSelector(
  (state: RootState) => state?.token?.isGettingBalance,
  (state: RootState) => state?.account?.isGettingBalance,
  defaultAccountName,
  (tokens, accounts, defaultAccountName) => {
    const isLoadingAccountBalance = accounts?.includes(defaultAccountName);
    const result = [...tokens];
    return isLoadingAccountBalance ? [...result, CONSTANT_COMMONS.PRV.id] : result;
  },
);

export const availableTokensSelector = createSelector(
  pTokensSelector,
  internalTokensSelector,
  FollowSelector.followTokensWalletSelector,
  selectedPrivacySelector.getPrivacyDataByTokenID,
  (pTokens, internalTokens, followedTokens, getPrivacyDataByTokenID) => {
    const followedTokenIds = followedTokens.map((t: any) => t?.id) || [];
    const allTokenIds = Object.keys(
      fromPairs([...internalTokens?.map((t: any) => [t?.id]), ...pTokens?.map((t: any) => [t?.tokenId])]),
    );
    const tokens: any = [];
    allTokenIds?.forEach((tokenId) => {
      const token: any = getPrivacyDataByTokenID(tokenId);
      if (token?.name && token?.symbol && token.tokenId) {
        let _token = { ...token };
        if (followedTokenIds.includes(token.tokenId)) {
          _token.isFollowed = true;
        }
        tokens.push(_token);
      }
    });
    const excludeRPV = (token: any) => token?.tokenId !== CONSTANT_COMMONS.PRV.id;
    return uniqBy(tokens.filter(excludeRPV), "tokenId") || [];
  },
);

export const marketTokens = createSelector(
  pTokensSelector,
  internalTokensSelector,
  FollowSelector.followTokensWalletSelector,
  selectedPrivacySelector.getPrivacyDataByTokenID,
  (pTokens, internalTokens, followedTokens, getPrivacyDataByTokenID) => {
    const followedTokenIds = followedTokens.map((t: any) => t?.id) || [];
    const allTokenIds = Object.keys(
      fromPairs([...internalTokens?.map((t: any) => [t?.id]), ...pTokens?.map((t: any) => [t?.tokenId])]),
    );
    const tokens: any = [];
    allTokenIds?.forEach((tokenId) => {
      const token: any = getPrivacyDataByTokenID(tokenId);
      if (token?.name && token?.symbol && token.tokenId) {
        let _token = { ...token };
        if (followedTokenIds.includes(token.tokenId)) {
          _token.isFollowed = true;
        }
        tokens.push(_token);
      }
    });
    return uniqBy(tokens, "tokenId") || [];
  },
);

export const pTokenSelector = createSelector(
  selectedPrivacySelector.getPrivacyDataByTokenID,
  currencySelector,
  (getPrivacyDataByTokenID, isToggleUSD) => {
    const decimalDigit = getPrivacyDataByTokenID(isToggleUSD ? BIG_COINS.USDT : BIG_COINS.PRV);
    return {
      pToken: decimalDigit,
      isToggleUSD,
    };
  },
);

export const prefixCurrency = createSelector(currencySelector, (isToggleUSD) => {
  return isToggleUSD ? CONSTANT_COMMONS.USD_SPECIAL_SYMBOL : CONSTANT_COMMONS.PRV_SPECIAL_SYMBOL;
});

export const totalShieldedTokensSelector = createSelector(
  selectedPrivacySelector.getPrivacyDataByTokenID,
  FollowSelector.followTokensWalletSelector,
  pTokenSelector,
  decimalDigitsSelector,
  (getPrivacyDataByTokenID, followTokens, currency, decimalDigits) => {
    // const { isToggleUSD } = currency;
    // followTokens = followTokens.map(({ id, amount }: any) => {
    //   const { priceUsd, pricePrv, pDecimals }: any = getPrivacyDataByTokenID(id);
    //   return {
    //     priceUsd,
    //     pricePrv,
    //     balance: amount,
    //     pDecimals,
    //   };
    // });
    // const totalShielded = compact([...followTokens]).reduce((prevValue, currentValue) => {
    //   const totalShielded = prevValue;
    //   const pDecimals = currentValue?.pDecimals || 0;
    //   const amount = currentValue?.balance || 0;
    //   const price = isToggleUSD ? currentValue?.priceUsd : currentValue?.pricePrv || 0;
    //   let currentAmount = formatAmount(price, amount, pDecimals, pDecimals, decimalDigits, true);
    //
    //   if (isNaN(currentAmount)) {
    //     currentAmount = 0;
    //   }
    //   return currentAmount + totalShielded;
    // }, 0);
    // return convert.toOriginalAmount(totalShielded, PRV.pDecimals, true);
  },
);

export const unFollowTokensSelector = createSelector(availableTokensSelector, (tokens) =>
  tokens.filter((token: any) => !(token?.isFollowed === true)),
);

export const getDefaultAccountWalletSelector = createSelector(
  defaultAccountSelector,
  walletSelector,
  (account, wallet) => getAccountWallet(account, wallet),
);

const followTokensFormatedSelector = createSelector(
  getPrivacyDataByTokenID,
  followsTokenAssetsSelector,
  (getPrivacyDataByToken, tokens) => {
    const _token = tokens.map(({ id: tokenID }) => getPrivacyDataByToken(tokenID));
    return orderBy(
      _token,
      [
        (c: SelectedPrivacyModel) => c.tokenId === PRVIDSTR,
        (c) =>
          convert.toString({
            text: c.formatBalanceByUsd || "0",
          }),
      ],
      ["desc", "desc"],
    );
  },
);

export default {
  isGettingBalance,
  getDefaultAccountWalletSelector,
  followTokensFormatedSelector,
};
