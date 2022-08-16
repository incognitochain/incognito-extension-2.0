import { Reducer } from "redux";
import { AccountActions, AccountActionType } from "./account.types";
export interface AccountState {
  defaultAccountName?: string;
  currentAccount?: any;
  accountList: string[];
}

const initialState: AccountState = {
  defaultAccountName: "",
  currentAccount: "",
  accountList: [],
};

export const reducer: Reducer<AccountState, AccountActions> = (
  state = initialState,
  action: AccountActions,
): AccountState => {
  switch (action.type) {
    case AccountActionType.SET: {
      return { ...state, defaultAccountName: action.payload.name };
    }
    default:
      return state;
  }
};
