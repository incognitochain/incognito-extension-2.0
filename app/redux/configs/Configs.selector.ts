import { IConfigsState } from "@redux/configs";
import { createSelector } from "reselect";
import { RootState } from "@redux/reducers";

export const configsSelector = createSelector(
  (state: RootState) => state.configReducer,
  (configs: IConfigsState) => configs,
);

// export const translateSelector = createSelector(configsSelector, (configs) => translateByLanguage(configs.language));

export const networkSelector = createSelector(configsSelector, (configs) => configs.network);
