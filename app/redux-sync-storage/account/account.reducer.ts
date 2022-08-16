import { Reducer } from "redux";
import { AccountActions, AccountActionType, AccountInfo } from "./account.types";

export interface AccountState {
  defaultAccountName?: string;
  currentAccount?: AccountInfo;
  accountList: AccountInfo[];
}

const initialState: AccountState = {
  defaultAccountName: "12345",
  currentAccount: undefined,
  accountList: [],
};

export const reducer: Reducer<AccountState, AccountActions> = (
  state = initialState,
  action: AccountActions,
): AccountState => {
  switch (action.type) {
    case AccountActionType.SET_DEFAULT_NAME: {
      return { ...state, defaultAccountName: action.payload.name };
    }
    case AccountActionType.SET_CURRENT_ACCOUNT: {
      return { ...state, currentAccount: action.payload.currentAccount };
    }
    case AccountActionType.SET_ACCOUNT_LIST: {
      return { ...state, accountList: action.payload.accountList };
    }
    case AccountActionType.ADD_ACCOUNT: {
      return { ...state, accountList: [...state.accountList, action.payload.newAccount] };
    }
    default:
      return state;
  }
};
