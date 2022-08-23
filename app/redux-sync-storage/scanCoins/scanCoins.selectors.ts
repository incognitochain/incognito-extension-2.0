import { createSelector } from "reselect";
// import { RootState } from "@redux/reducers";
// import { keyDefineAccountSelector } from "@redux/account/account.selectors";

import { RootState } from "@redux-sync-storage/reducers/index";
import { getKeyDefineAccountSelector } from "@redux-sync-storage/account/account.selectors";
import { PopupState } from "@core/types";

const scanCoinsReducerSelector = createSelector(
  (state: RootState) => state.scanCoinsReducer,
  (scanCoinsReducer) => scanCoinsReducer,
);

const statusScanCoinsSelector = createSelector(scanCoinsReducerSelector, ({ scanStatus }) => scanStatus);

const isFetchingScanCoinsSelector = createSelector(scanCoinsReducerSelector, ({ isFetching }) => isFetching);

const isFirstTimeScanCoinsSelector = createSelector(
  statusScanCoinsSelector,
  getKeyDefineAccountSelector,
  (scanStatus, key) => {
    if (!key || !scanStatus[key]) return false;
    return scanStatus[key].isScanning;
  },
);

const isShowConfirmScanCoins = createSelector(
  statusScanCoinsSelector,
  getKeyDefineAccountSelector,
  (scanStatus, key) => (popupState: PopupState | undefined) => {
    if (!popupState || popupState.walletState !== "unlocked") return false;
    return key && (!scanStatus || scanStatus[key] === undefined);
  },
);

export {
  scanCoinsReducerSelector,
  isFetchingScanCoinsSelector,
  statusScanCoinsSelector,
  isFirstTimeScanCoinsSelector,
  isShowConfirmScanCoins,
};
