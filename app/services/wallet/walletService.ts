import AccountModel from "@model/account";
import { getStorageLoadWalletError, setStorageLoadWalletError } from "@model/storageError";
import storage from "@services/storage";
import formatUtil from "@utils/format";
import { getPassphrase } from "./passwordService";
import Server from "./Server";
import { WalletSDK } from "../../core/types";

const crypto = require("crypto");

const { Wallet, PrivacyVersion, setShardNumber } = require("incognito-chain-web-js/build/web/wallet");

Wallet.RandomBytesFunc = crypto.randomBytes;
Wallet.setPrivacyUtilRandomBytesFunc(crypto.randomBytes);

async function loadListAccount(wallet: any) {
  try {
    if (!wallet) return;
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
async function loadListAccountWithBLSPubKey(wallet: any) {
  try {
    const listAccountRaw = (await wallet.listAccountWithBLSPubKey()) || [];
    // const listAccount =
    //   listAccountRaw.map(account => new AccountModel(account)) || [];

    return listAccountRaw;
  } catch (e) {
    throw e;
  }
}

async function loadWallet(passphrase: any, name = "Wallet", rootName = "") {
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
      time: formatUtil.formatDateTime({ dateTime: new Date().getTime() }),
      name,
      rootName,
      error: JSON.stringify(error),
      function: "LOAD_WALLET_WALLET_SERVICE",
    });
    await setStorageLoadWalletError(errors);
    console.log("ERROR WHEN LOAD WALLET", error);
  }
}

async function initWallet(walletName: string = "Wallet", rootName: string) {
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

async function configsWallet(wallet: any) {
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
    // wallet.AuthToken = await getToken();
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

async function saveWallet(wallet: WalletSDK) {
  try {
    const { aesKey } = await getPassphrase();
    wallet.Storage = storage;
    await wallet.save(aesKey);
  } catch (e) {
    console.log("[saveWallet] ", e);
  }
}

async function importWallet(mnemonic: string, name: string): Promise<WalletSDK> {
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

const WalletServices = {
  loadListAccount,
  loadListAccountWithBLSPubKey,
  loadWallet,
  initWallet,
  configsWallet,
  saveWallet,
  importWallet,
};

export default WalletServices;
