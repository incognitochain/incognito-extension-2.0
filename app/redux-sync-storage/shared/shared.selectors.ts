import SelectedPrivacyModel from "@model/SelectedPrivacyModel";
import { followsTokenAssetsSelector } from "@module/Assets/Assets.selector";
import { getPrivacyDataByTokenID } from "@redux-sync-storage/selectedPrivacy/selectedPrivacy.selectors";
import convert from "@utils/convert";
import format from "@utils/format";
import BigNumber from "bignumber.js";
import orderBy from "lodash/orderBy";
import { createSelector } from "reselect";
const { PRVIDSTR } = require("incognito-chain-web-js/build/web/wallet");

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
        (c) => c.amount || 0,
      ],
      ["desc", "desc", "desc"],
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
  followTokensFormatedSelector,
  followTokensUSDAmountSelector,
};
