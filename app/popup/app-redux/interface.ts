import { IConfigsState } from '@popup/configs';
import { IThemeState } from '@popup/theme';

export interface IAction {
  type: string;
  payload: any;
}

export interface IRootState {
  configs: IConfigsState;
  theme: IThemeState;
}
