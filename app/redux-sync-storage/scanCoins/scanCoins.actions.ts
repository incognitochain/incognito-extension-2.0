import { ScanCoinsActionType } from "@redux-sync-storage/scanCoins/scanCoins.constants";
import {
  ReScanCoinsAction,
  RescanCoinsPayload,
  ScanCoinsFetchingAction,
  ScanCoinsFetchingPayload,
  ScanCoinsFirstTimeAction,
  ScanCoinsFirstTimePayload,
  ScanCoinsFreeDataAction,
} from "@redux-sync-storage/scanCoins/scanCoins.types";

// Flag support check status scan coins
// Ignore next schedule event scan coins if isFetching = true
const actionFetchingScanCoins = (payload: ScanCoinsFetchingPayload): ScanCoinsFetchingAction => ({
  type: ScanCoinsActionType.FETCHING,
  payload,
});

// Store status scan coins, if first time, show loading on UX
const actionFistTimeScanCoins = (payload: ScanCoinsFirstTimePayload): ScanCoinsFirstTimeAction => ({
  type: ScanCoinsActionType.FIRST_TIME_SCAN_COINS,
  payload,
});

// Store status scan coins, if first time, show loading on UX
const actionReScanCoins = (payload: RescanCoinsPayload): ReScanCoinsAction => ({
  type: ScanCoinsActionType.RESCAN_COINS,
  payload,
});

const actionFreeScanCoins = (): ScanCoinsFreeDataAction => ({
  type: ScanCoinsActionType.FREE_DATA,
});

export { actionFetchingScanCoins, actionFistTimeScanCoins, actionReScanCoins, actionFreeScanCoins };
