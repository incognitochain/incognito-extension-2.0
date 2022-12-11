/* eslint-disable no-unused-vars */
import MasterKeyModel, { DEFAULT_MASTER_KEY, MASTERLESS } from "@model/MasterKeyModel";
import {
  currentMasterKeySelector,
  masterlessKeyChainSelector,
  noMasterLessSelector,
} from "@redux/masterKey/masterKey.selectors";
import { ImportMasterKeyPayload, InitMasterKeyPayload } from "@redux/masterKey/masterKey.types";
import { AppGetState, AppThunk, AppThunkDispatch } from "@redux/store";
import { reloadWallet, setWallet } from "@redux/wallet/wallet.actions";
import { getWalletAccounts } from "@services/api/masterKey";
import { login } from "@services/authService";
import { clearWalletCaches } from "@services/cache";
import { ExHandler } from "@services/exception";
import Storage from "@services/storage";
import {
  cachePassword,
  getPassphrase,
  getPassphraseNoCache,
  savePasspharseToStorage,
} from "@services/wallet/passwordService";
import serverService from "@services/wallet/Server";
import WalletServices from "@services/wallet/walletService";
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
import { loadMasterKeysRawData } from "./masterKey.reducer";
import { walletSelector } from "@redux/wallet/wallet.selectors";
import { WalletSDK } from "@core/types";

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

export const loadAllMasterKeysSuccess = (payload: MasterKeyModel[]): MasterKeyLoadAllAction => ({
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

export const importMasterKeySuccess = (payload: MasterKeyModel): MasterKeyImportAction => ({
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
  const currentServer = await serverService.getDefault();
  const isMainnet = currentServer.id === "mainnet";
  MasterKeyModel.network = isMainnet ? "mainnet" : "testnet";
};

export const updateMasterKey = (masterKey: any) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  dispatch(updateMasterKeySuccess(masterKey));
};

export const masterKeySwitchNetwork = (): AppThunk => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  await updateNetwork();
  // await login();
  const masterKey = currentMasterKeySelector(getState());
  const wallet = masterKey.wallet || {};
  // TO DO (after)

  // await dispatch(loadAllMasterKeys());
  // const masterKey = currentMasterKeySelector(getState());
  // const wallet: any = masterKey.wallet || {};
  // const listAccounts: any = await wallet.listAccountNoCache();

  // let masterAccountInfo = await wallet.MasterAccount.getDeserializeInformationNoCache();

  // const serverAccounts = await getWalletAccounts(masterAccountInfo.PublicKeyCheckEncode);
  // console.log(" masterAccountInfo ", masterAccountInfo);
  // console.log(" serverAccounts ", serverAccounts);
  // for (const account of wallet.MasterAccount.child) {
  //   const accountInfo = await account.getDeserializeInformationNoCache();
  //   console.log("accountInfo ", accountInfo);
  // }
  // const listAccount = (await wallet.listAccount()) || [];

  // batch(() => {
  //   dispatch(setWallet(wallet));
  //   dispatch(setListAccount(listAccounts));
  //   dispatch(setAccount(listAccounts[0]));
  //   dispatch(setDefaultAccount(listAccounts[0]));
  // });
  // batch(async () => {
  //   await dispatch(importMasterKeySuccess(masterKey));
  // });
  return wallet;
};

export const unlockMasterKey =
  (password: string): AppThunk =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    await cachePassword(password);
    await getPassphrase();
    await updateNetwork();

    const servers = await serverService.getServerList();
    if (!servers || servers?.length === 0) {
      await serverService.setDefaultList();
    }
    await dispatch(actionLoadDefaultWallet());
    await dispatch(loadAllMasterKeyAccounts());
    const wallet = walletSelector(getState());
    return wallet;
  };

// Action Init first time for wallet (Only one!)

export const initMasterKey =
  (payload: InitMasterKeyPayload): AppThunk =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    const { masterKeyName, mnemonic, password } = payload;
    await cachePassword(password);
    await getPassphrase();
    await updateNetwork();
    // await login();

    const defaultMasterKey = new MasterKeyModel(DEFAULT_MASTER_KEY);
    defaultMasterKey.name = masterKeyName;
    defaultMasterKey.mnemonic = mnemonic;
    const masterKeyWallet: WalletSDK = await WalletServices.importWallet(mnemonic, defaultMasterKey.getStorageName());
    masterKeyWallet.RootName = masterKeyName;

    const masterlessMasterKey = new MasterKeyModel(MASTERLESS);
    const masterlessWallet: WalletSDK = await masterlessMasterKey.loadWallet();
    masterlessWallet.MasterAccount.child = [];

    defaultMasterKey.wallet = masterKeyWallet;

    // console.log("defaultMasterKey : ", defaultMasterKey)
    // console.log("masterlessMasterKey : ", masterlessMasterKey)

    const masterKeysList = [defaultMasterKey, masterlessMasterKey];

    await WalletServices.saveWallet(masterKeyWallet);
    await WalletServices.saveWallet(masterlessWallet);
    // await WalletServices.loadListAccount(masterKeyWallet);
    const { aesKey } = await getPassphraseNoCache();
    await savePasspharseToStorage(aesKey, mnemonic, password);
    dispatch(setWallet(masterKeyWallet));
    batch(async () => {
      await dispatch(initMasterKeySuccess(masterKeysList));
      await dispatch(switchMasterKeySuccess(defaultMasterKey.name));
      await dispatch(reloadWallet());
    });
    return masterKeyWallet;
  };

export const importMasterKey =
  (data: ImportMasterKeyPayload) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    const { masterKeyName, mnemonic, password } = data;

    let wallet: WalletSDK;
    await updateNetwork();
    await cachePassword(password);
    await getPassphrase();

    const { aesKey } = await getPassphraseNoCache();

    try {
      const newMasterKey = new MasterKeyModel({
        name: masterKeyName,
        mnemonic,
      });
      wallet = await WalletServices.importWallet(mnemonic, newMasterKey.getStorageName());
      // await WalletServices.loadListAccount(wallet);

      newMasterKey.wallet = wallet;
      newMasterKey.mnemonic = wallet.Mnemonic;
      wallet.RootName = newMasterKey.name;

      const masterlessMasterKey = new MasterKeyModel(MASTERLESS);
      const masterlessWallet: WalletSDK = await masterlessMasterKey.loadWallet();
      masterlessWallet.MasterAccount.child = [];

      await savePasspharseToStorage(aesKey, mnemonic, password);

      const masterKeysList = [newMasterKey, masterlessMasterKey];

      await WalletServices.saveWallet(wallet);
      await WalletServices.saveWallet(masterlessWallet);

      await dispatch(setWallet(wallet));
      batch(async () => {
        await dispatch(initMasterKeySuccess(masterKeysList));
        await dispatch(importMasterKeySuccess(newMasterKey));
        await dispatch(switchMasterKeySuccess(data.masterKeyName));
        await dispatch(loadAllMasterKeyAccounts());
        await dispatch(reloadWallet());
      });
    } catch (error) {
      throw error;
    }
    console.timeEnd("TOTAL_TIME_IMPORT_MASTER_KEY");
    return wallet;
  };

export const loadWallet = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  try {
    // await login();
    const servers = await serverService.getServerList();
    if (!servers || servers?.length === 0) {
      await serverService.setDefaultList();
    }
    await dispatch(actionLoadDefaultWallet());
  } catch (error) {
    console.log("[loadWallet]", error);
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
    const masterKeyRawDataList = await loadMasterKeysRawData();
    let masterKeyInstanceList: MasterKeyModel[] = masterKeyRawDataList.map((item) => new MasterKeyModel(item));
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
  (masterKeyName: string, accountName?: string, ignoreReloadWallet = false) =>
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
    wallet = await WalletServices.importWallet(data.mnemonic, newMasterKey.getStorageName());
    newMasterKey.wallet = wallet;
    newMasterKey.mnemonic = wallet.Mnemonic;
    wallet.RootName = newMasterKey.name;
    await WalletServices.saveWallet(wallet);
    batch(async () => {
      await dispatch(createMasterKeySuccess(newMasterKey));
      await dispatch(switchMasterKeySuccess(data.name));
      dispatch(reloadWallet());
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
    const masterKeysList = [...noMasterLessSelector(state), masterlessKeyChainSelector(state)];
    let accounts: any = [];
    const tasks: any = [];
    for (const masterKey of masterKeysList) {
      try {
        // await dispatch(actionSyncAccountMasterKey(masterKey));
        const masterKeyAccounts = await masterKey?.getAccounts(true);
        accounts = [...accounts, ...masterKeyAccounts];
        const wallet = masterKey?.wallet;
        if (wallet) {
          // dispatch(actionRequestAirdropNFTForListAccount(wallet));
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
      await WalletServices.configsWallet(wallet);
      let masterAccountInfo = await wallet.MasterAccount.getDeserializeInformation();
      console.log("[actionSyncAccountMasterKey] - masterAccountInfo ", masterAccountInfo);
      const serverAccounts = await getWalletAccounts(masterAccountInfo.PublicKeyCheckEncode);
      console.log("[actionSyncAccountMasterKey] - serverAccounts ", serverAccounts);
      const accountIds: any = [];
      for (const account of wallet.MasterAccount.child) {
        const accountInfo = await account.getDeserializeInformation();

        console.log("[actionSyncAccountMasterKey] - accountInfo ", accountInfo);

        accountIds.push(accountInfo.ID);
      }

      console.log("[actionSyncAccountMasterKey] - serverAccounts ", serverAccounts);
      console.log("[actionSyncAccountMasterKey] - accountIds ", serverAccounts);

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
