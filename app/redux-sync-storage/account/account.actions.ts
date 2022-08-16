import { AccountActionType, AccountInfo } from "./account.types";

const setAccountDefaultName = (name: string) => ({
  type: AccountActionType.SET_DEFAULT_NAME,
  payload: {
    name,
  },
});

const setCurrentAccount = (currentAccount: AccountInfo) => ({
  type: AccountActionType.SET_CURRENT_ACCOUNT,
  payload: {
    currentAccount,
  },
});

const setAccountList = (accountList: AccountInfo[]) => ({
  type: AccountActionType.SET_ACCOUNT_LIST,
  payload: {
    accountList,
  },
});

const addAccount = (newAccount: AccountInfo[]) => ({
  type: AccountActionType.ADD_ACCOUNT,
  payload: {
    newAccount,
  },
});

export { setAccountDefaultName, setCurrentAccount, setAccountList, addAccount };
