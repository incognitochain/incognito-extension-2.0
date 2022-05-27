/* eslint-disable no-useless-catch */
import AccountModel from "@model/account";
import { getStorageLoadWalletError, setStorageLoadWalletError } from "@model/storageError";
import { updateWalletAccounts } from "@services/api/masterKey";
import { getToken } from "@services/authService";
import storage from "@services/storage";
import accountService from "@services/wallet/accountService";
import { DEX } from "@utils/dex";
import formatUtil from "@utils/format";
// const { randomBytes } = require("react-native-randombytes");
// import { randomBytes } from "react-native-randombytes";
import { getPassphrase } from "./passwordService";
import Server from "./Server";

const crypto = require("crypto");

const {
  ConfirmedTx: ConfirmedTxWallet,
  FailedTx: FailedTxWallet,
  genImageFromStr: genImageFromStrWallet,
  SuccessTx: SuccessTxWallet,
  Wallet,
  PrivacyVersion,
  setShardNumber,
} = require("incognito-chain-web-js/build/wallet");

Wallet.RandomBytesFunc = crypto.randomBytes;
Wallet.setPrivacyUtilRandomBytesFunc(crypto.randomBytes);

export const genImageFromStr = genImageFromStrWallet;
export const ConfirmedTx = ConfirmedTxWallet;
export const SuccessTx = SuccessTxWallet;
export const FailedTx = FailedTxWallet;

export async function loadListAccount(wallet: any) {
  try {
    const listAccountRaw = (await wallet.listAccount()) || [];
    const accountInstanceList = listAccountRaw.map((account: any) => new AccountModel(account)) || [];
    return accountInstanceList;
  } catch (e) {
    throw e;
  }
}

/**
 *
 * @param {object} wallet
 * @returns [{{string} AccountName, {string} BLSPublicKey, {int} Index}]
 */
export async function loadListAccountWithBLSPubKey(wallet: any) {
  try {
    const listAccountRaw = (await wallet.listAccountWithBLSPubKey()) || [];
    // const listAccount =
    //   listAccountRaw.map(account => new AccountModel(account)) || [];

    return listAccountRaw;
  } catch (e) {
    throw e;
  }
}

export async function loadWallet(passphrase: any, name = "Wallet", rootName = "") {
  try {
    let wallet = new Wallet();
    wallet.Name = name;
    wallet.RootName = rootName;
    await configsWallet(wallet);
    wallet = await wallet.loadWallet(passphrase);
    return wallet?.Name ? wallet : false;
  } catch (error) {
    const errors = await getStorageLoadWalletError();
    errors.push({
      time: formatUtil.formatDateTime(new Date().getTime()),
      name,
      rootName,
      error: JSON.stringify(error),
      function: "LOAD_WALLET_WALLET_SERVICE",
    });
    await setStorageLoadWalletError(errors);
    console.log("ERROR WHEN LOAD WALLET", error);
  }
}

export async function initWallet(walletName: string = "Wallet", rootName: string) {
  try {
    const { aesKey } = await getPassphrase();
    let wallet = new Wallet();
    wallet.RootName = rootName;
    await configsWallet(wallet);
    await wallet.init(aesKey, storage, walletName, "Anon");
    await wallet.save(aesKey);
    return wallet;
  } catch (e) {
    throw e;
  }
}

export async function configsWallet(wallet: any) {
  try {
    if (!wallet) {
      return;
    }
    const server = await Server.getDefault();
    wallet.RpcClient = server.address;
    wallet.RpcCoinService = server?.coinServices;
    wallet.Storage = storage;
    wallet.PrivacyVersion = PrivacyVersion.ver2;
    wallet.UseLegacyEncoding = true;
    wallet.PubsubService = server?.pubsubServices;
    wallet.RpcRequestService = server?.requestServices;
    wallet.AuthToken = await getToken();
    wallet.RpcApiService = server?.apiServices;
    wallet.PortalService = server?.portalServices;
    wallet.Network = server?.id;
    if (typeof setShardNumber === "function") {
      await setShardNumber(server?.shardNumber);
    }
  } catch (error) {
    console.log("CONFIGS_WALLET_ERROR", error);
    throw error;
  }
  return wallet;
}

export async function saveWallet(wallet: any) {
  const { aesKey } = await getPassphrase();
  wallet.Storage = storage;
  await wallet.save(aesKey);
}

export function deleteWallet(wallet: any) {
  wallet.Storage = storage;
  return wallet.deleteWallet();
}

export async function loadHistoryByAccount(wallet: any, accountName: any) {
  wallet.Storage = storage;
  await updateStatusHistory(wallet).catch(() => console.warn("History statuses were not updated"));
  return (await wallet.getHistoryByAccount(accountName)) || [];
}

export async function updateStatusHistory(wallet: any) {
  //TODO: remove
  await wallet.updateStatusHistory();
}

export async function updateHistoryStatus(wallet: any, txId: any) {
  //TODO: remove
  await wallet.updateTxStatus(txId);
}

export async function importWallet(mnemonic: string, name: string) {
  try {
    const { aesKey } = await getPassphrase();
    let wallet = new Wallet();
    await configsWallet(wallet);
    await wallet.import(mnemonic, aesKey, name, storage);
    return wallet;
  } catch (e) {
    throw e;
  }
}

export async function createDefaultAccounts(wallet: any) {
  let isCreatedNewAccount = false;

  let accounts = await wallet.listAccount();

  if (!accounts.find((item: any) => item.AccountName.toLowerCase() === DEX.MAIN_ACCOUNT.toLowerCase())) {
    const newAccount = await accountService.createAccount(DEX.MAIN_ACCOUNT, wallet);
    const newAccountInfo = await newAccount.getDeserializeInformation();
    isCreatedNewAccount = true;
    accounts.push(newAccountInfo);
  }
  if (!accounts.find((item: any) => item.AccountName.toLowerCase() === DEX.WITHDRAW_ACCOUNT.toLowerCase())) {
    accounts = await wallet.listAccount();
    const newAccount = await accountService.createAccount(DEX.WITHDRAW_ACCOUNT, wallet);
    const newAccountInfo = await newAccount.getDeserializeInformation();
    isCreatedNewAccount = true;
    accounts.push(newAccountInfo);
  }

  if (isCreatedNewAccount) {
    const masterAccountInfo = await wallet.MasterAccount.getDeserializeInformation();
    await updateWalletAccounts(
      masterAccountInfo.PublicKeyCheckEncode,
      accounts.map((item: any) => ({
        id: item.ID,
        name: item.AccountName,
      })),
    );
  }

  return isCreatedNewAccount;
}

export async function storeWalletAccountIdsOnAPI(wallet: any) {
  const listAccount = await wallet.listAccount();
  const accounts = listAccount.map((account: any) => ({
    name: account.AccountName,
    id: account.ID,
  }));
  const masterAccountInfo = await wallet.MasterAccount.getDeserializeInformation();
  return updateWalletAccounts(masterAccountInfo.PublicKeyCheckEncode, accounts);
}
