import { createSelector } from "reselect";
import { RootState } from "@redux/reducers";

const scanCoinsReducerSelector = createSelector(
  (state: RootState) => state.scanCoinsReducer,
  (scanCoinsReducer) => scanCoinsReducer,
);

const isFetching = createSelector(scanCoinsReducerSelector, ({ isFetching }) => isFetching);

export { isFetching };
