import { createSelector } from "reselect";
import { IModalReducer } from "./Modal.reducer";
import { RootState } from "@redux/reducers";

export const modalSelector = createSelector(
  (state: RootState) => state.modalReducer,
  (modal: IModalReducer) => modal,
);
