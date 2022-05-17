import { createSelector } from "reselect";
import { RootState } from "@redux/reducers";
import { AppStateExample } from "./app";

export const appSelectors = (state: RootState): AppStateExample => state.app;

// export const appSelectorABC: AppStateExample = createSelector(appSelectors, (app) => app);
