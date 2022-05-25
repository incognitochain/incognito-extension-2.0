import MasterKeyModel from "@/model/MasterKeyModel";
// import typesAccount from "@src/redux/types/account";
// import LocalDatabase from "@src/utils/LocalDatabase";
import storage from "@services/storage";
import accountServices from "@services/wallet/accountService";
import _ from "lodash";
import { Reducer } from "redux";
import { MasterKeyActions, MasterKeyActionType } from "./masterKey.types";

export interface MasterKeyState {
  list: MasterKeyModel[];
  accounts: any[];
  switching: boolean;
  initial: {
    loading: boolean;
    masterKeyList: any[];
  };
  loadingAll: boolean;
}

export const initialState: MasterKeyState = {
  list: [],
  accounts: [],
  switching: false,
  initial: {
    loading: true,
    masterKeyList: [],
  },
  loadingAll: false,
};

function createMasterKey(newMasterKey: any, list: any[]) {
  const newList = _.uniqBy([...list, newMasterKey], (item) => item.name);
  // LocalDatabase.setMasterKeyList(newList);
  return newList;
}

function updateMasterKey(newMasterKey: any, list: any[]) {
  const newList = list.map((item) => {
    const found = item.name === newMasterKey.name;
    if (found) {
      return newMasterKey;
    }
    return item;
  });
  // LocalDatabase.setMasterKeyList(newList);
  return newList;
}

function switchMasterKey(masterKeyName: string, list: any[]) {
  const newList = list.map((item) => {
    item.isActive = item.name === masterKeyName;
    return item;
  });
  //   LocalDatabase.setMasterKeyList(newList);
  return newList;
}

function removeMasterKey(name: string, list: any[]) {
  const newList = _.remove(list, (item) => item.name !== name);
  list.forEach(async (item) => {
    try {
      const wallet = await item.loadWallet();
      const measureStorageWallet = await wallet.getKeyMeasureStorage();
      await wallet.clearWalletStorage({ key: measureStorageWallet });
      const listAccount = await wallet.listAccount();
      let task = listAccount.map((account: any) => accountServices.removeCacheBalance(account, wallet));
      await Promise.all(task);
    } catch (error) {
      console.log("ERROR remove master key", error);
    }

    await storage.removeItem(item.getStorageName());
  });
  // LocalDatabase.setMasterKeyList(newList);
  return newList;
}

// function saveMasterKeys(list) {
//   LocalDatabase.setMasterKeyList(list);
// }

export const reducer: Reducer<MasterKeyState, MasterKeyActions> = (
  state = initialState,
  action: MasterKeyActions,
): MasterKeyState => {
  switch (action.type) {
    case MasterKeyActionType.LOADING_INITIAL: {
      return {
        ...state,
        initial: {
          ...state.initial,
          ...action.payload,
        },
      };
    }
    case MasterKeyActionType.LOAD_ALL:
      return {
        ...state,
        list: action.payload,
      };
    case MasterKeyActionType.INIT: {
      return {
        ...state,
        list: action.payload,
      };
    }
    case MasterKeyActionType.IMPORT:
    case MasterKeyActionType.CREATE: {
      return {
        ...state,
        list: createMasterKey(action.payload, state.list),
      };
    }
    case MasterKeyActionType.SWITCH:
      return {
        ...state,
        list: switchMasterKey(action.payload, state.list),
      };
    case MasterKeyActionType.UPDATE:
      return {
        ...state,
        list: updateMasterKey(action.payload, state.list),
      };
    case MasterKeyActionType.REMOVE:
      return {
        ...state,
        list: removeMasterKey(action.payload, state.list),
      };
    case MasterKeyActionType.LOAD_ALL_ACCOUNTS:
      return {
        ...state,
        accounts: [...action.payload],
      };
    case MasterKeyActionType.SWITCHING: {
      return {
        ...state,
        switching: action.payload,
      };
    }
    case MasterKeyActionType.LOADING_ALL_ACCOUNTS: {
      return {
        ...state,
        loadingAll: action.payload,
      };
    }
    // case MasterKeyActionType.REMOVE_BY_PRIVATE_KEY: {
    //   const { accounts: oldAccounts } = state;
    //   const privateKey = action.data;
    //   const accounts = oldAccounts.filter((account) => account?.PrivateKey !== privateKey);
    //   return {
    //     ...state,
    //     accounts,
    //   };
    // }
    default:
      return state;
  }
};
