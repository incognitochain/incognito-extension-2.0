import { RootState } from "@redux-sync-storage/reducers/index";
import { createSelector } from "reselect";

export const getAccountDefaultName = createSelector(
  (state: RootState) => state.account,
  (account) => account.defaultAccountName || "",
);

export const getCurrentAccount = createSelector(
  (state: RootState) => state,
  (state) => state.account.currentAccount || undefined,
);

export const getAccountList = createSelector(
  (state: RootState) => state,
  (state) => state.account.accountList || [],
);

export default {
  getAccountDefaultName,
  getCurrentAccount,
  getAccountList,
};
