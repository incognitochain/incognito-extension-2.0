import { colors } from "@theme/Theme";
import { createSelector } from "reselect";

import { IThemeState } from "./Theme.reducer";
import { RootState } from "@redux/reducers";

export const themeSelector = createSelector(
  (state: RootState) => state.themeReducer,
  (theme: IThemeState) => theme,
);

export const darkModeSelector = createSelector(themeSelector, (theme) => theme.darkMode);

export const colorsSelector = createSelector(darkModeSelector, (darkMode) => colors(darkMode));
