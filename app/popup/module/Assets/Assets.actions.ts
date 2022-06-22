import { AssetsActionType } from "@module/Assets/Assets.constant";
import {
  AssetsFetchedAction,
  AssetsFetchedPayload,
  AssetsFetchingAction,
  AssetsFetchingPayload,
  AssetsFreeAction,
} from "@module/Assets/Assets.types";
// import { createLogger } from "@core/utils";
// const log = createLogger("assets:actions");

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

export { actionFetchingFollowBalance, actionFetchedFollowBalance, actionFreeAssets };
