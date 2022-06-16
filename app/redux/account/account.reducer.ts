import AccountModel from "@model/account";
import { AccountActions, AccountActionType } from "@redux/account/account.types";
import { cloneDeep, remove } from "lodash";
import { Reducer } from "redux";

export interface AccountState {
  list: AccountModel[];
  defaultAccountName?: string;
  isGettingBalance?: string[];
  switch?: boolean;
  create?: boolean;
  import?: boolean;
  signPublicKeyEncode?: string;
  burnerAddress?: string;
  isFetchingNFT?: boolean;
  toggleModalMintMoreNFT?: boolean;
  nft: {
    nftToken?: string;
    initNFTToken?: boolean;
    list?: AccountModel[];
  };
}

const initialState: AccountState = {
  list: [],
  defaultAccountName: "",
  isGettingBalance: [],
  switch: false,
  create: false,
  import: false,
  signPublicKeyEncode: "",
  burnerAddress: "",
  isFetchingNFT: false,
  toggleModalMintMoreNFT: false,
  nft: {
    nftToken: "",
    initNFTToken: true,
    list: [],
  },
};

const setAccount = (list: AccountModel[], account: AccountModel) => {
  let newList = [...list];
  try {
    const foundIndex = newList.findIndex((a) => {
      return a.PaymentAddress === account.PaymentAddress;
    });
    if (foundIndex >= 0) {
      newList[foundIndex] = account;
    }
  } catch (e) {
    console.error(e);
  }
  return newList;
};

const removeByPrivateKey = (list: AccountModel[], privateKey: any) => {
  const newList = [...list];
  try {
    remove(newList, (_item) => _item.PrivateKey === privateKey);
  } catch (e) {
    console.error(e);
  }
  return newList;
};

const setGettingBalance = (list: string[] = [], accountName: string) => {
  const newList = [...list];
  return newList.includes(accountName) ? newList : [...newList, accountName];
};

const removeGettingBalance = (list: string[] = [], accountName: string) => {
  const newList = [...list];
  remove(newList, (item) => item === accountName);
  return newList;
};

export const reducer: Reducer<AccountState, AccountActions> = (
  state = initialState,
  action: AccountActions,
): AccountState => {
  let newList = [];

  switch (action.type) {
    case AccountActionType.SET: {
      newList = setAccount(state.list, action.payload);
      return {
        ...state,
        list: newList,
      };
    }
    case AccountActionType.SET_LIST: {
      return {
        ...state,
        list: cloneDeep(action.payload),
      };
    }

    case AccountActionType.REMOVE_BY_PRIVATE_KEY:
      newList = removeByPrivateKey(state.list, action.payload);
      return {
        ...state,
        list: newList,
      };
    case AccountActionType.GET_BALANCE:
      return {
        ...state,
        isGettingBalance: setGettingBalance(state.isGettingBalance, action.payload),
      };
    case AccountActionType.GET_BALANCE_FINISH:
      return {
        ...state,
        isGettingBalance: removeGettingBalance(state.isGettingBalance, action.payload),
      };
    case AccountActionType.SET_DEFAULT_ACCOUNT:
      return {
        ...state,
        defaultAccountName: action.payload?.name,
      };
    case AccountActionType.ACTION_SWITCH_ACCOUNT_FETCHING: {
      return {
        ...state,
        switch: true,
      };
    }
    case AccountActionType.ACTION_SWITCH_ACCOUNT_FETCHED: {
      return {
        ...state,
        switch: false,
      };
    }
    case AccountActionType.ACTION_SWITCH_ACCOUNT_FETCH_FAIL: {
      return {
        ...state,
        switch: false,
      };
    }
    case AccountActionType.ACTION_FETCHING_CREATE_ACCOUNT: {
      return {
        ...state,
        create: true,
      };
    }
    case AccountActionType.ACTION_FETCHED_CREATE_ACCOUNT: {
      return {
        ...state,
        create: false,
      };
    }
    case AccountActionType.ACTION_FETCH_FAIL_CREATE_ACCOUNT: {
      return {
        ...state,
        create: false,
      };
    }
    case AccountActionType.ACTION_FETCHING_IMPORT_ACCOUNT: {
      return {
        ...state,
        import: true,
      };
    }
    case AccountActionType.ACTION_FETCHED_IMPORT_ACCOUNT: {
      return {
        ...state,
        import: false,
      };
    }
    case AccountActionType.ACTION_FETCH_FAIL_IMPORT_ACCOUNT: {
      return {
        ...state,
        import: false,
      };
    }
    case AccountActionType.SET_SIGN_PUBLIC_KEY_ENCODE: {
      const signPublicKeyEncode = action.payload;
      return {
        ...state,
        signPublicKeyEncode,
      };
    }
    case AccountActionType.ACTION_GET_BURNER_ADDRESS: {
      return {
        ...state,
        burnerAddress: action.payload,
      };
    }
    case AccountActionType.ACTION_FETCHED_NFT: {
      return {
        ...state,
        nft: { ...action.payload },
        isFetchingNFT: false,
      };
    }
    case AccountActionType.ACTION_FETCHING_NFT: {
      return {
        ...state,
        isFetchingNFT: true,
      };
    }
    case AccountActionType.ACTION_TOGGLE_MODAL_MINT_MORE_NFT: {
      return {
        ...state,
        toggleModalMintMoreNFT: action.payload,
      };
    }
    case AccountActionType.ACTION_LOGOUT: {
      return {
        ...cloneDeep(initialState),
      };
    }
    default:
      return state;
  }
};
