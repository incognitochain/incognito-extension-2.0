import toLower from "lodash/toLower";
import trim from "lodash/trim";
import { formValueSelector } from "redux-form";
import { createSelector } from "reselect";
import { FORM_CONFIGS } from "./Header.searchBox";
import { RootState } from "@redux/reducers";

export const keySearchSelector = createSelector(
  (state: RootState) => state,
  (state) => {
    const selector = formValueSelector(FORM_CONFIGS.formName);
    const searchBoxValue = selector(state, FORM_CONFIGS.searchBox);
    return trim(toLower(searchBoxValue)) || "";
  },
);

export const headerSelector = createSelector(
  (state: RootState) => state,
  (state) => state.headerReducer,
);

export const refreshHeaderSelector = createSelector(headerSelector, (header) => header.refresh);
