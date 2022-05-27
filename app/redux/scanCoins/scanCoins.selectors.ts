import { createSelector } from "reselect";
import { RootState } from "@redux/reducers";

const scanCoinsReducerSelector = createSelector(
  (state: RootState) => state.scanCoinsReducer,
  (scanCoinsReducer) => scanCoinsReducer,
);

const statusScanCoinsSelector = createSelector(scanCoinsReducerSelector, ({ scanStatus }) => scanStatus);

const isFetchingScanCoinsSelector = createSelector(scanCoinsReducerSelector, ({ isFetching }) => isFetching);

export { scanCoinsReducerSelector, isFetchingScanCoinsSelector, statusScanCoinsSelector };
