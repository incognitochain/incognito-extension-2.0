import {
  AccountActionType,
  AccountInfo,
  SetCurrentAccountAction,
  SetAccountDefaultNameAction,
  SetAccountListAction,
  AddAccountAction,
} from "./account.types";

const setAccountDefaultName = (name: string): SetAccountDefaultNameAction => ({
  type: AccountActionType.SET_DEFAULT_NAME,
  payload: {
    name,
  },
});

const setCurrentAccount = (currentAccount: AccountInfo): SetCurrentAccountAction => ({
  type: AccountActionType.SET_CURRENT_ACCOUNT,
  payload: {
    currentAccount,
  },
});

const setAccountList = (accountList: AccountInfo[]): SetAccountListAction => ({
  type: AccountActionType.SET_ACCOUNT_LIST,
  payload: {
    accountList,
  },
});

const addAccount = (newAccount: AccountInfo): AddAccountAction => ({
  type: AccountActionType.ADD_ACCOUNT,
  payload: {
    newAccount,
  },
});

export { setAccountDefaultName, setCurrentAccount, setAccountList, addAccount };
