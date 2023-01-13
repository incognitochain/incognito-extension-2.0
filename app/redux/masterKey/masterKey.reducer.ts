import { KEYS } from "@constants/keys";
import MasterKeyModel from "@model/MasterKeyModel";
import StorageService from "@services/storage";
import accountServices from "@services/wallet/accountService";
import { getPassphrase } from "@services/wallet/passwordService";
import algorithms from "@utils/algorithms";
import lodash from "lodash";
import { Reducer } from "redux";
import { MasterKeyActions, MasterKeyActionType } from "./masterKey.types";

// Remove Wallet when Save Local Storage!
interface MasterKeyRawData {
  isActive?: boolean | undefined;
  passphrase?: string | undefined;
  mnemonic?: string | undefined;
  deletedAccountIds?: string[] | undefined;
  isMasterless?: boolean | undefined;
  name: string;
}

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

function createMasterKey(newMasterKey: MasterKeyModel, list: MasterKeyModel[]) {
  const newList = lodash.uniqBy([...list, newMasterKey], (item) => item.name);
  return newList;
}

function updateMasterKey(newMasterKey: MasterKeyModel, list: MasterKeyModel[]) {
  const newList = list.map((item) => {
    const found = item.name === newMasterKey.name;
    if (found) {
      return newMasterKey;
    }
    return item;
  });
  saveMasterKeys(newList);
  return newList;
}

function switchMasterKey(masterKeyName: string, list: MasterKeyModel[]) {
  const newList = list.map((item) => {
    item.isActive = item.name === masterKeyName;
    return item;
  });
  saveMasterKeys(newList);
  return newList;
}

function removeMasterKey(name: string, list: any[]) {
  const newList = lodash.remove(list, (item) => item.name !== name);
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

    await StorageService.removeItem(item.getStorageName());
  });
  saveMasterKeys(newList);
  return newList;
}

function masterKeysListRemoveWalletInstacne(masterKeyList: MasterKeyModel[]) {
  try {
    return masterKeyList.map((item) => ({ ...item, wallet: undefined })) || [];
  } catch (error) {
    console.log("masterKeysListRemoveWalletInstacne error: ", error);
    return [];
  }
}

export async function saveMasterKeys(masterKeyList: MasterKeyModel[]) {
  let newMasterKeyListRawData: any[] = [];
  try {
    newMasterKeyListRawData = masterKeysListRemoveWalletInstacne(masterKeyList);
  } catch (error) {
    console.log("saveMasterKeys error: ", error);
    return;
  }
  const masterKeyListJSON = JSON.stringify(newMasterKeyListRawData);
  const { aesKey } = await getPassphrase();
  const masterKeyListEncryped = algorithms.encryptData(masterKeyListJSON, aesKey);
  await StorageService.setItem(KEYS.MASTER_KEY_LIST, masterKeyListEncryped);
  return;
}

export async function loadMasterKeysRawData(): Promise<MasterKeyRawData[]> {
  const { aesKey } = await getPassphrase();
  const masterKeyListEncryped = await StorageService.getItem(KEYS.MASTER_KEY_LIST);
  const masterKeyListDecryped = await algorithms.decryptData(masterKeyListEncryped, aesKey);
  const masterKeyRawDataList: MasterKeyRawData[] = JSON.parse(masterKeyListDecryped);
  return masterKeyRawDataList;
}

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
      const masterKeyList = action.payload;
      return {
        ...state,
        list: masterKeyList,
      };
    case MasterKeyActionType.INIT: {
      const masterKeyList = action.payload;
      saveMasterKeys(masterKeyList);
      return {
        ...state,
        list: masterKeyList,
      };
    }
    case MasterKeyActionType.IMPORT:
    case MasterKeyActionType.CREATE: {
      const newMasterKey = action.payload;
      const currentMasterKeyList = state.list;
      const newMasterKeyList = createMasterKey(newMasterKey, currentMasterKeyList);
      saveMasterKeys(newMasterKeyList);
      return {
        ...state,
        list: newMasterKeyList,
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
    default:
      return state;
  }
};
