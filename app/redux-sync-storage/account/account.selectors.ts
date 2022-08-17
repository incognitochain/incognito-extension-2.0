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

export const getPaymentAddress = createSelector(
  getAccountDefaultName,
  getAccountList,
  (accDefaultName, accountList) => {
    return accountList.find((acc) => acc.name === accDefaultName)?.paymentAddress || "";
  },
);

export default {
  getAccountDefaultName,
  getCurrentAccount,
  getAccountList,
  getPaymentAddress,
};
