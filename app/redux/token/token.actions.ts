import { defaultAccountWalletSelector } from "@redux/account/account.selectors";
import { AppGetState, AppThunkDispatch } from "@redux/store";
import { getTokenList } from "@services/api/token";
import { EXPIRED_TIME } from "@services/cache";
import { uniqBy } from "lodash";
import { TokenActionType } from "@redux/token/token.types";
import PTokenModel from "@model/pTokenModel";
import { followsTokenAssetsSelector } from "@module/Assets";
import { IBalance } from "@core/types";
const { PRVIDSTR } = require("incognito-chain-web-js/build/web/wallet");

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
  async (dispatch: AppThunkDispatch) => {
    try {
      const [pTokens] = await Promise.all([await getTokenList({ expiredTime })]);
      const tokens = uniqBy([...pTokens], "tokenId");
      dispatch(setListPToken(tokens));
      return tokens;
    } catch (e) {
      throw e;
    }
  };

const actionAddFollowToken =
  ({ tokenID }: { tokenID: string }) =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    try {
      const state = getState();
      const accountSender = defaultAccountWalletSelector(state);
      if (!accountSender) return;
      const followed: IBalance[] = followsTokenAssetsSelector(state);
      const newFollowed = followed.concat([
        {
          id: tokenID,
          amount: "0",
          swipable: tokenID !== PRVIDSTR,
        },
      ]);
      await accountSender.addListFollowingToken({
        tokenIDs: newFollowed.map(({ id }) => id),
      });
    } catch (error) {
      throw error;
    }
  };

export { actionAddFollowToken };
