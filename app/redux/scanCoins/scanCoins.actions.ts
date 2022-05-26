import { ScanCoinsActionType } from "@redux/scanCoins/scanCoins.constants";
import {
  ScanCoinsFetchingAction,
  ScanCoinsFetchingPayload,
  ScanCoinsFirstTimeAction,
  ScanCoinsFirstTimePayload,
} from "@redux/scanCoins/scanCoins.types";

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

export { actionFetchingScanCoins, actionFistTimeScanCoins };
