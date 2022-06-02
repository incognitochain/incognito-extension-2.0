/* eslint-disable no-unused-vars */
import MasterKeyModel, { DEFAULT_MASTER_KEY } from "@model/MasterKeyModel";
import {
  currentMasterKeySelector,
  masterlessKeyChainSelector,
  noMasterLessSelector,
} from "@redux/masterKey/masterKey.selectors";
import { ImportMasterKeyPayload, InitMasterKeyPayload } from "@redux/masterKey/masterKey.types";
import { AppGetState, AppThunk, AppThunkDispatch } from "@redux/store";
import { actionRequestAirdropNFTForListAccount, reloadWallet, setWallet } from "@redux/wallet/wallet.actions";
import { getWalletAccounts } from "@services/api/masterKey";
import { login } from "@services/authService";
import { clearWalletCaches, getCache } from "@services/cache";
import { ExHandler } from "@services/exception";
import Storage from "@services/storage";
import {
  cachePassword,
  getPassphrase,
  getPassphraseNoCache,
  getPasswordFromCache,
  savePasspharseToStorage,
} from "@services/wallet/passwordService";
import serverService from "@services/wallet/Server";
import {
  configsWallet,
  importWallet,
  loadListAccount,
  saveWallet,
  storeWalletAccountIdsOnAPI,
} from "@services/wallet/walletService";
import { batch } from "react-redux";
import {
  InitMasterKeySuccessAction,
  MasterKeyActionType,
  MasterKeyLoadingInitAction,
  CreateMasterKeySuccessAction,
  MasterKeyLoadAllAction,
  MasterKeyUpdateAction,
  MasterKeyLoadingAllAccountAction,
  MasterKeyLoadAllAccoutsAction,
  MasterKeySwitchingAction,
} from "./masterKey.types";
import { MasterKeySwitchAction } from "@redux/masterKey/masterKey.types";
import accountServices from "@services/wallet/accountService";
import { MasterKeyImportAction, MasterKeyRemoveAction } from ".";
import { uniqBy } from "lodash";
import { loadMasterKeys } from "./masterKey.reducer";
import { walletSelector } from "@redux/wallet/wallet.selectors";
const { Validator } = require("incognito-chain-web-js/build/web/wallet");

//--------------------------------------------------------------------
// Pure Functions (Pure Action)
//--------------------------------------------------------------------

export const initMasterKeySuccess = (payload: MasterKeyModel[]): InitMasterKeySuccessAction => ({
  type: MasterKeyActionType.INIT,
  payload,
});

export const createMasterKeySuccess = (newMasterKey: any): CreateMasterKeySuccessAction => ({
  type: MasterKeyActionType.CREATE,
  payload: newMasterKey,
});

export const loadAllMasterKeysSuccess = (payload: any): MasterKeyLoadAllAction => ({
  type: MasterKeyActionType.LOAD_ALL,
  payload,
});

export const loadingInitMasterKey = (newMasterKey: any): MasterKeyLoadingInitAction => ({
  type: MasterKeyActionType.LOADING_INITIAL,
  payload: newMasterKey,
});

export const switchMasterKeySuccess = (masterKeyName: string): MasterKeySwitchAction => ({
  type: MasterKeyActionType.SWITCH,
  payload: masterKeyName,
});

export const removeMasterKeySuccess = (payload: any): MasterKeyRemoveAction => ({
  type: MasterKeyActionType.REMOVE,
  payload,
});

export const switchingMasterKey = (payload: any): MasterKeySwitchingAction => ({
  type: MasterKeyActionType.SWITCHING,
  payload,
});

export const updateMasterKeySuccess = (masterKey: string): MasterKeyUpdateAction => ({
  type: MasterKeyActionType.UPDATE,
  payload: masterKey,
});

export const importMasterKeySuccess = (payload: any): MasterKeyImportAction => ({
  type: MasterKeyActionType.IMPORT,
  payload,
});

export const actionLoadingAllMasterKeyAccount = (payload: any): MasterKeyLoadingAllAccountAction => ({
  type: MasterKeyActionType.LOADING_ALL_ACCOUNTS,
  payload,
});

export const loadAllMasterKeyAccountsSuccess = (accounts: any): MasterKeyLoadAllAccoutsAction => ({
  type: MasterKeyActionType.LOAD_ALL_ACCOUNTS,
  payload: accounts,
});

//--------------------------------------------------------------------
// Async Functions (Async Action - Thunk )
//--------------------------------------------------------------------

const updateNetwork = async () => {
  // const serverJSONString = await storage.getItem('$servers');
  const serverJSONString = null;
  const servers = JSON.parse(serverJSONString || "[]");
  const currentServer = servers.find((item: any) => item.default) || {
    id: "mainnet",
  };
  const isMainnet = currentServer.id === "mainnet";
  MasterKeyModel.network = isMainnet ? "mainnet" : "testnet";
};

export const updateMasterKey = (masterKey: any) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  dispatch(updateMasterKeySuccess(masterKey));
};

export const migrateData = async () => {
  let isMigratedData = false;
  const data = await Storage.getItem("Wallet");
  if (data) {
    await Storage.setItem(`$${MasterKeyModel.network}-master-masterless`, data);
    // await storage.removeItem('Wallet');
    isMigratedData = true;
  }

  // const dexHistories = await LocalDatabase.getOldDexHistory();

  // console.log('[migrateData] dexHistories ', dexHistories);
  // if (dexHistories.length > 0) {
  //   await Storage.setItem(
  //     `$${MasterKeyModel.network}-master-masterless-dex-histories`,
  //     JSON.stringify(dexHistories),
  //   );
  //   isMigratedData = true;
  // }
  // console.log('[migrateData] isMigratedData ', isMigratedData);
  // return isMigratedData;
};
export const unlockMasterKey =
  (password: string): AppThunk =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    await cachePassword(password);
    await getPassphrase();
    await updateNetwork();
    await login();
    const servers = await serverService.get();
    if (!servers || servers?.length === 0) {
      await serverService.setDefaultList();
    }
    await dispatch(actionLoadDefaultWallet());
    await dispatch(loadAllMasterKeyAccounts());
    const wallet = walletSelector(getState());
    return wallet;
  };

export const initMasterKey =
  (payload: InitMasterKeyPayload): AppThunk =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    const { masterKeyName, mnemonic, password } = payload;
    await cachePassword(password);
    await getPassphrase();
    await updateNetwork();
    await login();
    const defaultMasterKey = new MasterKeyModel(DEFAULT_MASTER_KEY);
    let wallet = await importWallet(mnemonic, defaultMasterKey.getStorageName());
    defaultMasterKey.mnemonic = wallet.Mnemonic;
    defaultMasterKey.wallet = wallet;
    wallet.RootName = masterKeyName;

    const masterKeys = [defaultMasterKey]; //Remove mastereless so far! (!)

    await saveWallet(wallet);
    await loadListAccount(wallet);
    const { aesKey } = await getPassphraseNoCache();
    await savePasspharseToStorage(aesKey, mnemonic, password);
    await storeWalletAccountIdsOnAPI(wallet);
    await dispatch(setWallet(wallet));

    batch(async () => {
      await dispatch(initMasterKeySuccess(masterKeys));
      await dispatch(switchMasterKeySuccess(defaultMasterKey.name));
      dispatch(reloadWallet());
      storeWalletAccountIdsOnAPI(wallet);
      dispatch(actionRequestAirdropNFTForListAccount(wallet));
    });

    return wallet;
  };

export const syncServerAccounts = async (wallet: any) => {
  try {
    const masterAccountInfo = await wallet.MasterAccount.getDeserializeInformation();
    const accounts = await getWalletAccounts(masterAccountInfo.PublicKeyCheckEncode);
    if (accounts.length > 0) {
      wallet.MasterAccount.child = [];
      for (const account of accounts) {
        try {
          await wallet.importAccountWithId(account.id, account.name);
        } catch (error) {
          console.log("IMPORT ACCOUNT WITH ID FAILED", error);
        }
      }
    }
  } catch (error) {
    console.log("syncServerAccounts error", error);
  }
};

export const importMasterKey =
  (data: ImportMasterKeyPayload, ignoreReloadWallet: boolean = false) =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    const { masterKeyName, mnemonic, password } = data;
    let wallet: any;
    await updateNetwork();
    await cachePassword(password);
    await getPassphrase();
    await login();
    try {
      const newMasterKey = new MasterKeyModel({
        name: masterKeyName,
        mnemonic,
      });
      wallet = await importWallet(mnemonic, newMasterKey.getStorageName());
      await login();
      await syncServerAccounts(wallet);

      newMasterKey.wallet = wallet;
      newMasterKey.mnemonic = wallet.Mnemonic;
      wallet.RootName = newMasterKey.name;
      await saveWallet(wallet);
      const { aesKey } = await getPassphraseNoCache();
      await savePasspharseToStorage(aesKey, mnemonic, password);
      await dispatch(setWallet(wallet));
      batch(async () => {
        await dispatch(importMasterKeySuccess(newMasterKey));
        await dispatch(switchMasterKeySuccess(data.masterKeyName));
        !!ignoreReloadWallet && dispatch(reloadWallet());
        dispatch(actionRequestAirdropNFTForListAccount(wallet));
        dispatch(syncUnlinkWithNewMasterKey(newMasterKey));
        dispatch(loadAllMasterKeyAccounts());
        dispatch(reloadWallet());
      });
    } catch (error) {
      throw error;
    }
    console.timeEnd("TOTAL_TIME_IMPORT_MASTER_KEY");
    return wallet;
  };

export const getWalletInstanceByImportMasterKey = async (data: any) => {
  let wallet;
  let newMasterKey;
  try {
    newMasterKey = new MasterKeyModel({
      ...data,
    });
    wallet = await importWallet(data.mnemonic, newMasterKey.getStorageName());
    await syncServerAccounts(wallet);
    newMasterKey.wallet = wallet;
    newMasterKey.mnemonic = wallet.Mnemonic;
    wallet.RootName = newMasterKey.name;
    await saveWallet(wallet);
  } catch (error) {
    console.log("getWalletInstanceByImportMasterKey", error);
  }
  return { wallet, newMasterKey };
};

export const loadWallet = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  try {
    await login();
    const servers = await serverService.get();
    if (!servers || servers?.length === 0) {
      await serverService.setDefaultList();
    }
    await dispatch(actionLoadDefaultWallet());
  } catch (error) {
    console.log("getWalletInstanceByImportMasterKey", error);
  }
};

export const actionLoadDefaultWallet = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  try {
    await dispatch(loadAllMasterKeys());
    const defaultAccountName = await accountServices.getDefaultAccountName();
    await dispatch(reloadWallet(defaultAccountName));
  } catch (error) {
    throw error;
  }
};

export const loadAllMasterKeys = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  try {
    await updateNetwork();
    const masterKeyListRawData = await loadMasterKeys();
    let masterKeyInstanceList: MasterKeyModel[] = masterKeyListRawData.map((item) => new MasterKeyModel(item));
    for (let masterKeyInstance of masterKeyInstanceList) {
      try {
        await masterKeyInstance.loadWallet();
      } catch (error) {
        console.log("LOAD WALLET ERROR", error, masterKeyInstance.name);
      }
    }
    await dispatch(loadAllMasterKeysSuccess(masterKeyInstanceList));
  } catch (error) {
    console.log("loadAllMasterKeys error", error);
    throw error;
  }
};
export const switchhingMasterKey = (payload: any) => ({
  type: MasterKeyActionType.SWITCHING,
  payload,
});

export const switchMasterKey =
  (masterKeyName: string, accountName: string, ignoreReloadWallet = false) =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    try {
      new Validator("switchMasterKey-masterKeyName", masterKeyName).required().string();
      new Validator("switchMasterKey-accountName", accountName).string();
      clearWalletCaches();
      dispatch(switchhingMasterKey(true));
      dispatch(switchMasterKeySuccess(masterKeyName));
      if (ignoreReloadWallet) return;
      await dispatch(reloadWallet(accountName));
    } catch (error) {
      throw error;
    } finally {
      dispatch(switchhingMasterKey(false));
    }
  };

export const createMasterKey = (data: any) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  let newMasterKey: any;
  let wallet: any;

  try {
    newMasterKey = new MasterKeyModel({
      ...data,
    });
    wallet = await importWallet(data.mnemonic, newMasterKey.getStorageName());
    newMasterKey.wallet = wallet;
    newMasterKey.mnemonic = wallet.Mnemonic;
    wallet.RootName = newMasterKey.name;
    await saveWallet(wallet);
    batch(async () => {
      await dispatch(createMasterKeySuccess(newMasterKey));
      await dispatch(switchMasterKeySuccess(data.name));
      dispatch(reloadWallet());
      dispatch(actionRequestAirdropNFTForListAccount(wallet));
      storeWalletAccountIdsOnAPI(wallet);
      dispatch(loadAllMasterKeyAccounts());
    });
  } catch (error) {
    throw error;
  }
};

export const loadAllMasterKeyAccounts = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  console.log("loadAllMasterKeyAccounts.... ");
  await dispatch(actionLoadingAllMasterKeyAccount(true));
  try {
    const state = getState();
    const masterKeys = [...noMasterLessSelector(state)];

    console.log("loadAllMasterKeyAccounts.... masterKeys ", Object.assign({}, masterKeys));
    let accounts: any = [];
    const tasks: any = [];
    for (const masterKey of masterKeys) {
      try {
        await dispatch(actionSyncAccountMasterKey(masterKey));
        const masterKeyAccounts = await masterKey?.getAccounts(true);
        accounts = [...accounts, ...masterKeyAccounts];
        const wallet = masterKey?.wallet;
        if (wallet) {
          dispatch(actionRequestAirdropNFTForListAccount(wallet));
        }
      } catch (error) {
        console.log("ERROR LOAD ACCOUNTS OF MASTER KEYS", error);
      }
    }
    await dispatch(loadAllMasterKeyAccountsSuccess(accounts));
    await Promise.all(tasks);
  } catch (error) {
    new ExHandler(error).showErrorToast();
  } finally {
    // dispatch(actionInitNotification());
  }
  await dispatch(actionLoadingAllMasterKeyAccount(false));
};

export const actionSyncAccountMasterKey =
  (defaultMasterKey?: any) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    try {
      const state = getState();
      let masterKey: MasterKeyModel = defaultMasterKey || currentMasterKeySelector(state);
      if (masterKey.isMasterless) {
        return;
      }
      let wallet = masterKey.wallet;
      await configsWallet(wallet);
      let masterAccountInfo = await wallet.MasterAccount.getDeserializeInformation();
      const serverAccounts = await getWalletAccounts(masterAccountInfo.PublicKeyCheckEncode);
      const accountIds: any = [];
      for (const account of wallet.MasterAccount.child) {
        const accountInfo = await account.getDeserializeInformation();
        accountIds.push(accountInfo.ID);
      }
      const newAccounts = serverAccounts.filter(
        (item: any) => !accountIds.includes(item.id) && !(masterKey.deletedAccountIds || []).includes(item.id),
      );
      if (newAccounts.length > 0) {
        let accounts = [];
        for (const account of newAccounts) {
          try {
            const newAccount = await wallet.importAccountWithId(account.id, account.name);
            if (account?.name) {
              accounts.push(newAccount);
            }
          } catch (error) {
            console.log("IMPORT ACCOUNT WITH ID FAILED", error);
          }
        }
        await wallet.save();
      }
    } catch (error) {
      throw error;
    }
  };

const syncUnlinkWithNewMasterKey = (newMasterKey: any) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  const state = getState();
  const masterless: any = masterlessKeyChainSelector(state);
  const accounts = (await masterless?.getAccounts()) || [];
  const masterLessWallet = masterless?.wallet;
  const wallet = newMasterKey.wallet;
  for (const account of accounts) {
    const findItemWithKey = (item: any) => item.getPrivateKey() === account.PrivateKey;
    const isCreated = await wallet.hasCreatedAccount(account.PrivateKey);
    if (isCreated) {
      const masterAccountIndex = wallet.MasterAccount.child.findIndex(findItemWithKey);
      const masterlessAccount = masterLessWallet.MasterAccount.child.find(findItemWithKey);

      masterLessWallet.MasterAccount.child = masterLessWallet.MasterAccount.child.filter(
        (item: any) => !findItemWithKey(item),
      );
      if (masterAccountIndex > -1) {
        const masterAccount = wallet.MasterAccount.child[masterAccountIndex];
        masterlessAccount.name = masterAccount.name;
        wallet.MasterAccount.child[masterAccountIndex] = masterlessAccount;
      } else {
        wallet.MasterAccount.child.push(masterlessAccount);
      }
      // Found duplicate account name
      if (wallet.MasterAccount.child.filter(findItemWithKey).length > 1) {
        const isDuplicatedNameAccount = wallet.MasterAccount.child.find(findItemWithKey);
        if (isDuplicatedNameAccount) {
          let index = 1;
          let newName = isDuplicatedNameAccount.name + index;
          while (wallet.MasterAccount.child.find((item: any) => item.name === newName)) {
            index++;
            newName = isDuplicatedNameAccount.name + index;
          }
          isDuplicatedNameAccount.name = newName;
        }
      }
    }
  }
  masterLessWallet && (await saveWallet(masterLessWallet));
  masterless && (await dispatch(updateMasterKey(masterless)));
};
