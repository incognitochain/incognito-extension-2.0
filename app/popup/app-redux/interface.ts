import { IConfigsState } from "@popup/configs";
import { IThemeState } from "@theme/Theme.reducer";

export interface IAction {
  type: string;
  payload: any;
}

export interface IRootState {
  configs: IConfigsState;
  theme: IThemeState;
}
