import CONSTANT_COMMONS from "@constants/common";
import { BIG_COINS } from "@constants/dexV2";
import { defaultAccountName, defaultAccountSelector } from "@redux/account/account.selectors";
import { RootState } from "@redux/reducers";
import { getPrivacyDataByTokenID } from "@redux/selectedPrivacy/selectedPrivacy.selectors";
import { walletSelector } from "@redux/wallet/wallet.selectors";
import { getAccountWallet } from "@services/wallet/wallet.shared";
import convert from "@utils/convert";
import format from "@utils/format";
import { createSelector } from "reselect";
import orderBy from "lodash/orderBy";
import SelectedPrivacyModel from "@model/SelectedPrivacyModel";
import { followsTokenAssetsSelector } from "@module/Assets/Assets.selector";
import BigNumber from "bignumber.js";
const { PRVIDSTR } = require("incognito-chain-web-js/build/web/wallet");

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
    ).filter(({ symbol }) => !!symbol);
  },
);

const followTokensUSDAmountSelector = createSelector(followTokensFormatedSelector, (followed) => {
  let amount = (followed || []).reduce((prevValue: any, currentValue) => {
    const { formatBalanceByUsd } = currentValue;
    return new BigNumber(convert.toString({ text: formatBalanceByUsd || "0" })).plus(prevValue);
  }, new BigNumber(0));
  amount = format.amountVer2({
    originalAmount: amount.toString(),
    decimals: 0,
  });
  return amount;
});

export default {
  isGettingBalance,
  getDefaultAccountWalletSelector,
  followTokensFormatedSelector,
  followTokensUSDAmountSelector,
};
