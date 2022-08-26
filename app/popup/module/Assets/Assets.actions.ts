import { AssetsActionType } from "@module/Assets/Assets.constant";
import {
  AssetsFetchedAction,
  AssetsFetchedPayload,
  AssetsFetchingAction,
  AssetsFetchingPayload,
  AssetsFreeAction,
  AssetsSetDefaultFollowAction,
} from "@module/Assets/Assets.types";

const actionFetchingFollowBalance = (payload: AssetsFetchingPayload): AssetsFetchingAction => ({
  type: AssetsActionType.FETCHING,
  payload,
});

const actionFetchedFollowBalance = (payload: AssetsFetchedPayload): AssetsFetchedAction => ({
  type: AssetsActionType.FETCHED,
  payload,
});

const actionFreeAssets = (): AssetsFreeAction => ({
  type: AssetsActionType.FREE_DATA,
});

const actionSetFollowBalanceDefault = (payload: AssetsFetchedPayload): AssetsSetDefaultFollowAction => ({
  type: AssetsActionType.SET_DEFAULT,
  payload,
});

export { actionFetchingFollowBalance, actionFetchedFollowBalance, actionFreeAssets, actionSetFollowBalanceDefault };
