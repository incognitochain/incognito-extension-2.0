import { RootState } from "@redux-sync-storage/reducers/index";
import { createSelector } from "reselect";

const getMasterKeyActiveTypeSelector = createSelector(
  (state: RootState) => state.masterkeyReducer,
  (masterkeyReducer) => masterkeyReducer.masterKeyActiveType,
);

export { getMasterKeyActiveTypeSelector };
