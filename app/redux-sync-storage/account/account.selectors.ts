import { RootState } from "@redux-sync-storage/reducers/index";

export const getAccountDefaultName = (state: RootState): any => state.account.defaultAccountName || "";
export const getCurrentAccount = (state: RootState): any => state.account.currentAccount || undefined;
export const getAccountList = (state: RootState): any => state.account.accountList || [];

export default {
  getAccountDefaultName,
  getCurrentAccount,
  getAccountList,
};
