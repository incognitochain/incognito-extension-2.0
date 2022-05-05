import { IRootState } from '@popup//app-redux/interface';
import { IConfigsState } from '@popup/configs';
import { translateByLanguage } from '@popup/i18';
import { createSelector } from 'reselect';

export const configsSelector = createSelector(
  (state: IRootState) => state.configs,
  (configs: IConfigsState) => configs,
);

export const translateSelector = createSelector(configsSelector, (configs) =>
  translateByLanguage(configs.language),
);
