import { createSelector } from "reselect";
import { RootState } from "@redux/reducers";
import { otaKeyOfDefaultAccountSelector } from "@redux/account/account.selectors";

const scanCoinsReducerSelector = createSelector(
  (state: RootState) => state.scanCoinsReducer,
  (scanCoinsReducer) => scanCoinsReducer,
);

const statusScanCoinsSelector = createSelector(scanCoinsReducerSelector, ({ scanStatus }) => scanStatus);

const isFetchingScanCoinsSelector = createSelector(scanCoinsReducerSelector, ({ isFetching }) => isFetching);

const isFirstTimeScanCoinsSelector = createSelector(
  statusScanCoinsSelector,
  otaKeyOfDefaultAccountSelector,
  (scanStatus, OTAKey) => {
    if (!OTAKey || !scanStatus[OTAKey]) return false;
    return scanStatus[OTAKey].isScanning;
  },
);

const isShowConfirmScanCoins = createSelector(
  statusScanCoinsSelector,
  otaKeyOfDefaultAccountSelector,
  (scanStatus, OTAKey) => {
    return OTAKey && (!scanStatus || scanStatus[OTAKey] === undefined);
  },
);

export {
  scanCoinsReducerSelector,
  isFetchingScanCoinsSelector,
  statusScanCoinsSelector,
  isFirstTimeScanCoinsSelector,
  isShowConfirmScanCoins,
};
