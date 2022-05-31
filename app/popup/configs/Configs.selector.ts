import { IConfigsState } from "@popup/configs";
import { translateByLanguage } from "@popup/i18";
import { createSelector } from "reselect";
import { RootState } from "@redux/reducers";

export const configsSelector = createSelector(
  (state: RootState) => state.configReducer,
  (configs: IConfigsState) => configs,
);

export const translateSelector = createSelector(configsSelector, (configs) => translateByLanguage(configs.language));
