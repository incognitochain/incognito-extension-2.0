import { RootState } from "@redux-sync-storage/reducers/index";
import { createSelector } from "reselect";

const getCurrentNetworkSelector = createSelector(
  (state: RootState) => state.networkReducer,
  (networkReducer) => networkReducer.currentNetwork,
);

export { getCurrentNetworkSelector };
