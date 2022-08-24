import { createSelector } from "reselect";
// import { RootState } from "@redux/reducers";
// import { keyDefineAccountSelector } from "@redux/account/account.selectors";
import { RootState } from "@redux-sync-storage/reducers/index";
import { getKeyDefineAccountSelector } from "@redux-sync-storage/account/account.selectors";

const assetsReducerSelector = createSelector(
  (state: RootState) => state.assetsReducer,
  (assetsReducer) => assetsReducer,
);

const isFetchingAssetsSelector = createSelector(assetsReducerSelector, ({ isFetching }) => isFetching);

const followsTokenAssetsSelector = createSelector(assetsReducerSelector, getKeyDefineAccountSelector, ({ data }, key) =>
  key ? data[key] || [] : [],
);

export { isFetchingAssetsSelector, followsTokenAssetsSelector };
