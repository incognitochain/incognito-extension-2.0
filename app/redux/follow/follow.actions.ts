import CONSTANT_CONFIGS from "@constants/config";
import { setAccount } from "@redux/account/account.actions";
import accountSelector from "@redux/account/account.selectors";
import { isFetchingSelector } from "@redux/follow/follow.selectors";
import { FollowActionType } from "@redux/follow/follow.types";
import { getDefaultAccountWalletSelector } from "@redux/shared/shared.selectors";
import { AppGetState, AppThunkDispatch } from "@redux/store";
import { setListToken, setToken } from "@redux/token/token.actions";
import { walletSelector } from "@redux/wallet/wallet.selectors";
import accountService from "@services/wallet/accountService";
import uniqBy from "lodash/uniqBy";
import { batch } from "react-redux";

const { PrivacyVersion, PRVIDSTR } = require("incognito-chain-web-js/build/wallet");

const actionFetchingBalance = () => ({
  type: FollowActionType.ACTION_FETCHING_BALANCE,
});

const actionFetchedBalance = (payload: any) => ({
  type: FollowActionType.ACTION_FETCHED_BALANCE,
  payload,
});

const actionUpdateTokenList = (payload: any) => ({
  type: FollowActionType.ACTION_UPDATE_TOKEN_LIST,
  payload,
});

const actionFetchedTokenBalance = (payload: any) => ({
  type: FollowActionType.ACTION_FETCHED_TOKEN_BALANCE,
  payload,
});

const actionLoadFollowBalance = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  try {
    const state = getState();
    const isFetching = isFetchingSelector(state);
    if (isFetching) return;
    dispatch(actionFetchingBalance());
    const accountWallet = getDefaultAccountWalletSelector(state);
    const account = accountSelector?.defaultAccountSelector(state);
    const pTokensIDs = CONSTANT_CONFIGS.isMainnet
      ? [
          "3f89c75324b46f13c7b036871060e641d996a24c09b3065835cb1d38b799d6c1",
          "716fd1009e2a1669caacc36891e707bfdf02590f96ebd897548e8963c95ebac0",
          "b832e5d3b1f01a4f0623f7fe91d6673461e1f5d37d91fe78c5c2e6183ff39696",
          "ffd8d42dc40a8d166ea4848baf8b5f6e912ad79875f4373070b59392b1756c8f",
        ]
      : [];
    const { balance } = await accountWallet.getFollowTokensBalance({ defaultTokens: pTokensIDs });
    const _balance = uniqBy(balance, "id");
    const _followTokens = _balance.map(({ id, amount }: any) => ({
      id,
      amount,
      loading: false,
    }));
    const accountMerge = {
      ...account,
      value: balance.find(({ id }: any) => id === PRVIDSTR).amount,
    };
    batch(() => {
      dispatch(actionFetchedBalance({ balance: _balance, OTAKey: account.OTAKey }));
      dispatch(setListToken(_followTokens));
      dispatch(setAccount(accountMerge));
    });
  } catch (e) {
    throw e;
  }
};

const actionLoadTokenBalance =
  ({ tokenID }: any) =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    try {
      const state = getState();
      const isFetching = isFetchingSelector(state);
      if (isFetching) return;
      dispatch(actionFetchingBalance());
      const account = accountSelector?.defaultAccountSelector(state);
      const wallet = walletSelector(state);
      const balance = await accountService.getBalance({
        account,
        wallet,
        tokenID,
        version: PrivacyVersion.ver2,
      });
      const token = {
        id: tokenID,
        amount: balance,
        loading: false,
      };
      await dispatch(setToken(token));
      dispatch(actionFetchedTokenBalance({ token, OTAKey: account.OTAKey }));
    } catch (e) {
      throw e;
    }
  };

export default {
  actionLoadFollowBalance,
  actionLoadTokenBalance,
  actionUpdateTokenList,
  actionFetchedTokenBalance,
};
