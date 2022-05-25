// import { getStorageLoadWalletError, setStorageLoadWalletError } from '@models/storageError';
import { loadWallet } from "@services/wallet/walletService";
import { getWalletInstanceByImportMasterKey } from "@redux/masterKey";
import storage from "@services/storage";
import { getPassphrase } from "@services/wallet/passwordService";
import Server from "@services/wallet/Server";
// import { initWallet } from "@services/wallet/walletService";
import formatUtil from "@utils/format";
import { isEqual, reverse, toLower, trim } from "lodash";
import { BaseModel } from "./BaseModel";
// import { getWalletInstanceByImportMasterKey } from '@src/redux/actions/masterKey';
// import formatUtil from '@utils/format';
const { loadBackupKey, parseStorageBackup } = require("incognito-chain-web-js/build/wallet");

export interface MasterKeyModelProps {
  name: string;
  isActive?: boolean;
  passphrase?: string;
  mnemonic?: string;
  deletedAccountIds?: string[];
  isMasterless?: boolean;
  wallet?: any;
}

export const MasterKeyModelInit: MasterKeyModelProps = {
  name: "",
  isActive: false,
  passphrase: "",
  deletedAccountIds: [],
  mnemonic: "",
  isMasterless: false,
  wallet: {},
};

export const DEFAULT_MASTER_KEY = {
  name: "Wallet",
  isActive: true,
};

export const MASTERLESS = {
  name: "Masterless",
  isActive: false,
};

export interface MasterKeyModelActions {}

class MasterKeyModel extends BaseModel {
  //---------------------------
  static network = "mainnet";
  //---------------------------
  isActive?: boolean | undefined;
  passphrase?: string | undefined;
  mnemonic?: string | undefined;
  deletedAccountIds?: string[] | undefined;
  isMasterless?: boolean | undefined;
  name: string;
  wallet: any;

  constructor(data: MasterKeyModelProps = MasterKeyModelInit) {
    super();
    this.name = data.name;
    this.mnemonic = data.passphrase;
    this.passphrase = data.passphrase;
    this.isActive = !!data.isActive;
    this.deletedAccountIds = data.deletedAccountIds || [];
    this.isMasterless = isEqual(toLower(this?.name), "masterless") || isEqual(toLower(this?.name), "unlinked");
  }

  static getStorageName(name: string = "wallet") {
    return `$${MasterKeyModel.network}-master-${name.toLowerCase()}`;
  }

  getStorageName() {
    return MasterKeyModel.getStorageName(this.name);
  }

  async getBackupMasterKeys() {
    const [network, passphrase] = await Promise.all([Server.getNetwork(), getPassphrase()]);
    const storageKey = loadBackupKey(network);
    const backupStr = (await storage.getItem(storageKey)) || "";
    return parseStorageBackup({ passphrase, backupStr }) || [];
  }

  /**
   * Load wallet from storage
   * @returns {Promise<Wallet>}
   */
  async loadWallet(password: string, mnemonic: string, callback: any) {
    const rootName = this.name;
    const storageName = this.getStorageName();
    // const rawData = await storage.getItem(storageName);
    const rawData = null;
    const passphrase = await getPassphrase();

    let backupMasterKeys = [];
    let wallet;
    if (rawData) {
      wallet = await loadWallet(passphrase, storageName, rootName);
    }
    if (!wallet) {
      // backupMasterKeys = reverse((await this.getBackupMasterKeys()) || []);
      // /** foundMasterKey = { name, mnemonic, isMasterless }
      //  * handle cant load wallet
      //  * load list backup in wallet and reimport again
      //  **/
      // const foundMasterKey = backupMasterKeys.find(
      //   ({ name }: { name: string }) => name === rootName,
      // );
      // if (foundMasterKey && !foundMasterKey?.isMasterless) {
      //   const name = trim(foundMasterKey.name);
      //   const mnemonic = trim(foundMasterKey.mnemonic);
      //   wallet = (await getWalletInstanceByImportMasterKey({ name, mnemonic }))?.wallet;
      //   // const errors = await getStorageLoadWalletError();
      //   // errors.push({
      //   //   time: formatUtil.formatDateTime(new Date().getTime()),
      //   //   name,
      //   //   storageName,
      //   //   rootName,
      //   //   rawData: !!rawData,
      //   //   wallet: !!wallet,
      //   //   function: "LOAD_WALLET_MASTER_KEY",
      //   // });
      //   // await setStorageLoadWalletError(errors);
      //   typeof callback === "function" && callback(backupMasterKeys);
      // }
    }

    //   /** Cant load wallet -> create new wallet */
    if (!wallet) {
      // wallet = await initWallet(storageName, rootName, mnemonic);
    }
    this.mnemonic = wallet.Mnemonic;
    this.wallet = wallet;
    wallet.deletedAccountIds = this.deletedAccountIds || [];
    if (toLower(this.name) === "unlinked") {
      this.name = "Masterless";
      wallet.Name = this.getStorageName();
      await wallet.save();
    }
    wallet.Name = this.getStorageName();
    console.time("TIME_LOAD_WALLET_FROM_STORAGE");
    return wallet;

    // get noOfKeychains() {
    //   return this.wallet?.MasterAccount?.child.length || 0;
    // }

    // async getAccounts(deserialize = true) {
    //   if (!deserialize) {
    //     return this.wallet.MasterAccount.child;
    //   }

    //   const accountInfos = [];

    //   for (const account of this.wallet.MasterAccount.child) {
    //     const accountInfo = await account.getDeserializeInformation();
    //     accountInfo.Assets = this.wallet;
    //     accountInfo.MasterKey = this;
    //     accountInfo.FullName = `${this.name}-${accountInfo.AccountName}`;
    //     accountInfos.push(accountInfo);
    //     accountInfo.MasterKeyName = this.name;
    //   }

    //   return accountInfos;
  }

  async getAccounts(deserialize = true) {
    if (!deserialize) {
      return this.wallet.MasterAccount.child;
    }

    const accountInfos = [];

    for (const account of this.wallet.MasterAccount.child) {
      const accountInfo = await account.getDeserializeInformation();
      accountInfo.Wallet = this.wallet;
      accountInfo.MasterKey = this;
      accountInfo.FullName = `${this.name}-${accountInfo.AccountName}`;
      accountInfos.push(accountInfo);
      accountInfo.MasterKeyName = this.name;
    }

    return accountInfos;
  }
}

export default MasterKeyModel;
