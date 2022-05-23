import { RootState } from "@redux/reducers";
import { AppStateExample } from "./app.reducer";

export const appSelectors = (state: RootState): AppStateExample => state.appReducer;
