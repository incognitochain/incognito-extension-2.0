import { WalletSDK } from "@core/types";
import StorageService from "@services/storage";
import { getPassphrase } from "@services/wallet/passwordService";
import Server from "@services/wallet/Server";
import WalletServices from "@services/wallet/walletService";
import { isEqual, toLower } from "lodash";
import { BaseModel } from "./BaseModel";
const { loadBackupKey, parseStorageBackup } = require("incognito-chain-web-js/build/web/wallet");

export interface MasterKeyModelProps {
  name: string;
  isActive?: boolean;
  passphrase?: string;
  mnemonic?: string;
  deletedAccountIds?: string[];
  isMasterless?: boolean;
  wallet?: any | undefined;
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

export interface MasterKeyModelActions {
  getAccounts(deserialize: boolean): void;
  loadWallet(): Promise<any>;
}

class MasterKeyModel extends BaseModel implements MasterKeyModelActions {
  //---------------------------
  static network = "mainnet";
  //---------------------------
  isActive?: boolean | undefined;
  passphrase?: string | undefined;
  mnemonic?: string | undefined;
  deletedAccountIds?: string[] | undefined;
  isMasterless?: boolean | undefined;
  name: string;
  wallet: any | undefined;

  constructor(data: MasterKeyModelProps = MasterKeyModelInit) {
    super();
    this.name = data.name;
    this.mnemonic = data.mnemonic;
    this.passphrase = data.passphrase;
    this.isActive = !!data.isActive;
    this.deletedAccountIds = data.deletedAccountIds || [];
    this.isMasterless = isEqual(toLower(this.name), "masterless") || isEqual(toLower(this.name), "unlinked");
  }

  //[NetworkName]-master-[MasterKeyName]  (default is `name = wallet`)]
  //Ex: $mainnet-master-ABCDE, $mainnet-master-wallet
  static getStorageName(name: string = "wallet") {
    return `$${MasterKeyModel.network}-master-${name.toLowerCase()}`;
  }

  getStorageName() {
    return MasterKeyModel.getStorageName(this.name);
  }

  async getBackupMasterKeys() {
    const [network, passphrase] = await Promise.all([Server.getNetwork(), getPassphrase()]);
    const storageKey = loadBackupKey(network);
    const backupStr = (await StorageService.getItem(storageKey)) || "";
    return parseStorageBackup({ passphrase, backupStr }) || [];
  }

  /**
   * Load wallet from storage
   * @returns {Promise<Wallet>}
   */
  async loadWallet(): Promise<WalletSDK> {
    const rootName = this.name;
    const storageName = this.getStorageName();
    const rawData = await StorageService.getItem(storageName);
    const passphrase = await getPassphrase();

    
    let wallet: WalletSDK;
    if (rawData) {
      console.log("[loadWallet] INSTANCE MasterKeyModel: => ", this);
      console.log("[loadWallet] LOAD WALLET co trong LOCAL STORAGE: => ");
      wallet = await WalletServices.loadWallet(passphrase, storageName, rootName);
    } else if (this.mnemonic) {
      console.log("[loadWallet] INIT WALLET voi Mnemonic: => ");
      wallet = await WalletServices.importWallet(this.mnemonic, rootName);
    } else {
      console.log("[loadWallet] INIT WALLET default trong SDK: => ");
      wallet = await WalletServices.initWallet(storageName, rootName);
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
    return wallet;
  }

  get noOfKeychains() {
    return this.wallet?.MasterAccount?.child.length || 0;
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
