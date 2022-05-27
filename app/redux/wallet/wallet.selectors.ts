import { RootState } from "@redux/reducers/index";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { WalletState } from "./wallet.reducer";

export const walletSelector = createSelector(
  (state: RootState) => state.wallet,
  (wallet) => wallet,
);
