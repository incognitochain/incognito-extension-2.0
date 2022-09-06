import { RootState } from "@redux-sync-storage/reducers/index";
import { createSelector } from "reselect";

const getCurrentVersionSelector = createSelector(
  (state: RootState) => state.versionReducer,
  (versionReducer) => versionReducer.version,
);

export { getCurrentVersionSelector };
