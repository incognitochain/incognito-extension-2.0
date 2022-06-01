import accountSelector from "@redux/account/account.selectors";
import { AppGetState, AppThunkDispatch } from "@redux/store/index";
import { getTokenList, getTokensInfo } from "@services/api/token";
import { EXPIRED_TIME } from "@services/cache";
import { uniqBy } from "lodash";
import { TokenActionType } from "@redux/token/token.types";
import { walletSelector } from "@redux/wallet/wallet.selectors";
import accountService from "@services/wallet/accountService";
import { batch } from "react-redux";
import FollowSelector from "@redux/follow/follow.selectors";
import FollowAction from "@redux/follow/follow.actions";
import PTokenModel from "@model/pTokenModel";

const { PrivacyVersion, Validator } = require("incognito-chain-web-js/build/wallet");

export const getBalanceStart = (tokenSymbol: any) => ({
  type: TokenActionType.GET_BALANCE,
  data: tokenSymbol,
});

export const getBalanceFinish = (tokenSymbol: any) => ({
  type: TokenActionType.GET_BALANCE_FINISH,
  data: tokenSymbol,
});

export const setListPToken = (tokens: PTokenModel[]) => {
  if (!tokens) {
    throw new TypeError("Tokens must be an array");
  }
  return {
    type: TokenActionType.SET_PTOKEN_LIST,
    payload: tokens,
  };
};

export const getPTokenList =
  ({ expiredTime = EXPIRED_TIME } = {}) =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    try {
      // const state = getState();
      // const accountWallet = accountSelector.defaultAccountWalletSelector(state);
      // const keyInfo = (await accountWallet.getKeyInfo({ version: PrivacyVersion.ver2 })) || {};
      // const coinsIndex = Object.keys(keyInfo.coinindex || {}) || [];
      const [pTokens] = await Promise.all([
        // await getTokensInfo(coinsIndex),
        await getTokenList({ expiredTime }),
      ]);
      console.log(pTokens);
      const tokens = uniqBy([...pTokens], "tokenId");
      dispatch(setListPToken(tokens));
      return tokens;
    } catch (e) {
      throw e;
    }
  };

export const getBalance = (tokenId: any) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  new Validator("getTokenBalance-tokenId", tokenId).required().string();
  const state = getState();
  const wallet = walletSelector(state);
  const account = accountSelector.defaultAccountSelector(state);
  let balance = 0;
  try {
    await dispatch(getBalanceStart(tokenId));
    // await dispatch(actionAddFollowToken(tokenId));
    balance = await accountService.getBalance({
      account,
      wallet,
      tokenID: tokenId,
      version: PrivacyVersion.ver2,
    });
    const token = {
      id: tokenId,
      amount: balance,
      loading: false,
    };
    batch(() => {
      dispatch(setToken(token));
      dispatch(
        FollowAction.actionFetchedTokenBalance({
          token,
          OTAKey: account.OTAKey,
        }),
      );
    });
  } catch (e) {
    dispatch(
      setToken({
        id: tokenId,
        amount: 0,
      }),
    );
    throw e;
  } finally {
    dispatch(getBalanceFinish(tokenId));
  }
  return balance ?? 0;
};

export const setListToken = (tokens: any) => {
  if (tokens && tokens.constructor !== Array) {
    throw new TypeError("Tokens must be an array");
  }
  return {
    type: TokenActionType.SET_LIST,
    data: tokens,
  };
};

export const setToken = (token: any) => ({
  type: TokenActionType.SET,
  data: token,
});