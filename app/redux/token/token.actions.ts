import { defaultAccountWalletSelector } from "@redux/account/account.selectors";
import { AppGetState, AppThunkDispatch } from "@redux/store";
import { getTokenList, getTokensInfo } from "@services/api/token";
import { EXPIRED_TIME } from "@services/cache";
import { uniqBy } from "lodash";
import { TokenActionType } from "@redux/token/token.types";
import PTokenModel from "@model/pTokenModel";
import { followsTokenAssetsSelector } from "@module/Assets/Assets.selector";
import { IBalance } from "@core/types";
import { actionHandler, getReduxSyncStorage } from "@redux-sync-storage/store/store";
import { setPToken } from "@redux-sync-storage/followTokens/followTokens.actions";
import serverService from "@services/wallet/Server";

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
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    try {
      const state = getState();
      // const network = networkSelector(state);
      const currentNetwork = await serverService.getDefault();
      const accountSender = defaultAccountWalletSelector(state);
      const followTokens = await accountSender.getListFollowingTokens();

      const [pTokens, tokensInfo] = await Promise.all([
        await getTokenList({ expiredTime, network: currentNetwork.address }),
        await getTokensInfo({ tokenIDs: followTokens }),
      ]);

      const tokens = uniqBy([...pTokens, ...tokensInfo], "tokenId");
      // dispatch(setListPToken(tokens));
      await actionHandler(setPToken(tokens));
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
      const { reduxSyncStorage: reduxSyncStorageInstance } = await getReduxSyncStorage();
      const accountSender = defaultAccountWalletSelector(state);
      if (!accountSender) return;
      const followed: IBalance[] = followsTokenAssetsSelector(reduxSyncStorageInstance.getState());
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
