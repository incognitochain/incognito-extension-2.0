import { createSelector } from "reselect";
import { RootState } from "@redux/reducers";
import { otaKeyOfDefaultAccountSelector } from "@redux/account/account.selectors";

const assetsReducerSelector = createSelector(
  (state: RootState) => state.assetsReducer,
  (assetsReducer) => assetsReducer,
);

const isFetchingAssetsSelector = createSelector(assetsReducerSelector, ({ isFetching }) => isFetching);

const followsTokenAssetsSelector = createSelector(
  assetsReducerSelector,
  otaKeyOfDefaultAccountSelector,
  ({ data }, OTAKey) => data[OTAKey] || [],
);

export { isFetchingAssetsSelector, followsTokenAssetsSelector };
