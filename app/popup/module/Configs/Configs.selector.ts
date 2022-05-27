import result from "lodash/result";
import { createSelector } from "reselect";
import { IConfigsReducer } from "./Configs.reducer";
import { translateByLanguage } from "@/popup/i18";
import { RootState } from "@redux/reducers";

export const configsSelector = createSelector(
  (state: RootState) => state.configReducer,
  (configs: IConfigsReducer) => configs,
);

export const translateSelector = createSelector(configsSelector, (configs) => translateByLanguage(configs.language));

export const errorTranslateSelector = createSelector(translateSelector, (translate) => translate.error);

export const translateByFieldSelector = createSelector(configsSelector, (configs) => (field: string) => {
  const translate = translateByLanguage(configs.language);
  const ts: any = result(translate, field);
  return ts;
});
