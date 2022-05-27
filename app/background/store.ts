import { createLogger } from "@core/utils";
// import { Wallet } from "./lib/wallet";

import { DEFAULT_NETWORK, Network, SecretBox, StoredData, WalletState } from "@core/types";
import { decryptPasspharse } from "@/services/wallet/passwordService";

export const initialState: StoredData = {
  secretBox: undefined,
  accountCount: 1, // this is important the default wallet should create an account
  selectedNetwork: DEFAULT_NETWORK,
  selectedAccount: "",
  authorizedOrigins: [],
};

const log = createLogger("incognito:bg:store");

export class Store {
  public popIsOpen: boolean;

  public wallet: any | null;
  private initialAccountCount: number;

  // persisted information
  public secretBox: SecretBox | null;
  public selectedNetwork: Network;
  public selectedAccount: string;
  public authorizedOrigins: string[];

  constructor(initialStore: StoredData) {
    const { secretBox, accountCount, selectedNetwork, selectedAccount, authorizedOrigins } = initialStore;
    this.popIsOpen = false;

    // We should always have at-least 1 account at all time
    this.initialAccountCount = accountCount ?? 1;
    this.selectedNetwork = selectedNetwork || DEFAULT_NETWORK;
    this.selectedAccount = selectedAccount;
    this.wallet = null;
    this.secretBox = null;

    if (secretBox) {
      this.secretBox = secretBox;
    }

    this.authorizedOrigins = authorizedOrigins || [];
  }

  isLocked(): boolean {
    return !!this.secretBox;
  }

  isUnlocked(): boolean {
    return !!this.wallet;
  }

  getWalletState = (): WalletState => {
    let state: WalletState = "uninitialized";
    if (this.hasSecretBox()) {
      state = "locked";
    }
    if (this.hasWallet()) {
      state = "unlocked";
    }
    return state;
  };

  lockSecretBox() {
    this.wallet = null;
    this.selectedAccount = "";
  }

  setWallet(wallet: any) {
    this.wallet = wallet;
  }

  setSecretBox(secretBox: SecretBox) {
    this.secretBox = secretBox;
  }

  hasSecretBox() {
    return !!this.secretBox;
  }

  hasWallet() {
    return !!this.wallet;
  }

  async unlockSecretBox(password: string) {
    if (!this.secretBox) {
      throw new Error("Cannot find secret box in storage");
    }
    if (this.wallet) {
      log("Assets already exists in memory.. don't do anything");
      return;
    }

    this.setSecretBox({
      ...this.secretBox,
      passphraseEncrypted: await decryptPasspharse(password),
    });
  }

  addAuthorizedOrigin(origin: string) {
    log("Authorized this origin %s", origin);
    this.authorizedOrigins = [...this.authorizedOrigins, origin];
  }

  removeAuthorizedOrigin(originToRemove: string) {
    this.authorizedOrigins = this.authorizedOrigins.filter(function (origin) {
      return origin !== originToRemove;
    });
  }

  isOriginAuthorized(origin: string): boolean {
    const found = this.authorizedOrigins.includes(origin);

    if (found) {
      log("origin is already authorized:", origin);
      return true;
    }

    log("origin not authorized", origin);
    return false;
  }
}
