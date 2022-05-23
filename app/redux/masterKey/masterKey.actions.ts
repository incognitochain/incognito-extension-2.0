/* eslint-disable no-unused-vars */
import {
  cachePassword,
  getPassphrase,
  getPassphraseNoCache,
  savePasspharseToStorage,
} from "@services/wallet/passwordService";
import MasterKeyModel, { DEFAULT_MASTER_KEY } from "@model/MasterKeyModel";
import { getWalletAccounts } from "@services/api/masterKey";
import { importWallet, loadListAccount, saveWallet, storeWalletAccountIdsOnAPI } from "@services/wallet/walletService";
import { AppGetState, AppThunk, AppThunkDispatch } from "@redux/store";
import { InitMasterKeyPayload, ImportMasterKeyPayload } from "@redux/masterKey/masterKey.types";
import { login } from "@services/authService";
import serverService from "@services/wallet/Server";
// import remove from "lodash/remove";
// import uniqBy from "lodash/uniqBy";
import { setWallet } from "@redux/wallet/wallet.actions";

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

export const initMasterKey =
  (payload: InitMasterKeyPayload): AppThunk =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    console.log(" [initMasterKey] payload ", payload);
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
    await saveWallet(wallet);
    await loadListAccount(wallet);
    const { aesKey } = await getPassphraseNoCache();
    await savePasspharseToStorage(aesKey, mnemonic, password);
    await storeWalletAccountIdsOnAPI(wallet);
    await dispatch(setWallet(wallet));

    console.log(getState());
    return wallet;
  };

export const syncServerAccounts = async (wallet: any) => {
  try {
    const masterAccountInfo = await wallet.MasterAccount.getDeserializeInformation();
    console.log("masterAccountInfo ", masterAccountInfo);

    const accounts = await getWalletAccounts(masterAccountInfo.PublicKeyCheckEncode);
    console.log("accounts ", accounts);
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
    console.log("importMasterKey .... ");
    console.time("TOTAL_TIME_IMPORT_MASTER_KEY");
    const { masterKeyName, mnemonic, password } = data;
    await updateNetwork();
    await cachePassword(password);
    await getPassphrase();
    await login();
    try {
      const newMasterKey = new MasterKeyModel({
        name: masterKeyName,
        mnemonic,
      });
      let wallet = await importWallet(mnemonic, newMasterKey.getStorageName());
      await login();
      await syncServerAccounts(wallet);

      console.log("syncServerAccounts .... ", wallet);
      newMasterKey.wallet = wallet;
      newMasterKey.mnemonic = wallet.Mnemonic;
      wallet.RootName = newMasterKey.name;
      await saveWallet(wallet);
      const { aesKey } = await getPassphraseNoCache();
      await savePasspharseToStorage(aesKey, mnemonic, password);
      await dispatch(setWallet(wallet));
      // batch(async () => {
      //   await dispatch(importMasterKeySuccess(newMasterKey));
      //   await dispatch(switchMasterKeySuccess(data.name));
      //   !!ignoreReloadWallet && dispatch(reloadWallet());
      //   dispatch(actionSubmitOTAKeyForListAccount(wallet));
      //   dispatch(actionRequestAirdropNFTForListAccount(wallet));
      //   dispatch(syncUnlinkWithNewMasterKey(newMasterKey));
      //   dispatch(loadAllMasterKeyAccounts());
      // });
    } catch (error) {
      throw error;
    }
    console.timeEnd("TOTAL_TIME_IMPORT_MASTER_KEY");
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
    // await dispatch(loadAllMasterKeys());
  } catch (error) {
    throw error;
  }
};

export const loadAllMasterKeys = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  try {
    const abc = 1;
  } catch (error) {
    throw error;
  }
};
