import { RootState } from "@redux/reducers/index";
import { createSelector } from "reselect";

export const walletSelector = createSelector(
  (state: RootState) => state.wallet,
  (wallet) => wallet,
);
