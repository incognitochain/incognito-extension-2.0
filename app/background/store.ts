import { createLogger } from "@core/utils";
import { Wallet } from "./lib/wallet";
import { randomBytes, secretbox } from "tweetnacl";
import bs58 from "bs58";
import { pbkdf2 } from "crypto";

import {
  DEFAULT_NETWORK,
  Network,
  SecretBox,
  StoredData,
  WalletState,
} from "@core/types";

const log = createLogger("incognito:bg:store");

export class Store {
  public popIsOpen: boolean;

  public wallet: Wallet | null;
  private initialAccountCount: number;

  // persisted information
  public secretBox: SecretBox | null;
  public selectedNetwork: Network;
  public selectedAccount: string;
  public authorizedOrigins: string[];
  public salt: string | null;

  constructor(initialStore: StoredData) {
    const { secretBox, accountCount, selectedNetwork, selectedAccount, authorizedOrigins, salt } = initialStore;
    this.popIsOpen = false;

    // We should always have at-least 1 account at all time
    this.initialAccountCount = accountCount ?? 1;
    this.selectedNetwork = selectedNetwork || DEFAULT_NETWORK;
    this.selectedAccount = selectedAccount;
    this.wallet = null;
    this.secretBox = null;
    this.salt = null;

    if (secretBox) {
      this.secretBox = secretBox;
    }

    if (salt) {
      this.salt = salt;
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

  setSalt(salt: string) {
    this.salt = salt;
  }

  setWallet(wallet: any) {
    this.wallet = wallet;
  }

  hasSalt() {
    return !!this.salt;
  }

  hasSecretBox() {
    return !!this.secretBox;
  }

  hasWallet() {
    return !!this.wallet;
  }

  unlockSecretBox(password: string) {
    if (!this.secretBox) {
      throw new Error("Cannot find secret box in storage");
    }

    if (this.wallet) {
      log("Assets already exists in memory.. don't do anything");
      return;
    }

    const {
      encryptedBox: encodedEncrypted,
      nonce: encodedNonce,
      salt: encodedSalt,
      iterations,
      digest,
    } = this.secretBox;

    const encrypted = bs58.decode(encodedEncrypted);
    const nonce = bs58.decode(encodedNonce);
    const salt = bs58.decode(encodedSalt);

    return deriveEncryptionKey(password, salt, iterations, digest)
      .then((key) => {
        const plaintext = secretbox.open(encrypted, nonce, key);
        if (!plaintext) {
          throw new Error("Incorrect password");
        }
        const decodedPlaintext = new Buffer(plaintext).toString();
        const { seed } = JSON.parse(decodedPlaintext);

        this.wallet = Wallet.NewWallet(seed, this.initialAccountCount);
        this.selectedAccount = this.wallet.accounts[0].publicKey.toBase58();
      })
      .catch((err) => {
        throw new Error(`Unable to decrypt box: ${err}`);
      });
  }

  async createSecretBox(mnemonic: string, seed: string, password: string): Promise<void> {
    const plaintext = JSON.stringify({ mnemonic, seed });

    const salt = new Buffer(randomBytes(16));
    const kdf = "pbkdf2";
    const iterations = 100000;
    const digest = "sha256";

    return deriveEncryptionKey(password, salt, iterations, digest)
      .then((key) => {
        const nonce = randomBytes(secretbox.nonceLength);
        const encrypted = secretbox(Buffer.from(plaintext), nonce, key);
        this.secretBox = {
          encryptedBox: bs58.encode(encrypted),
          nonce: bs58.encode(nonce),
          kdf,
          salt: bs58.encode(salt),
          iterations,
          digest,
        } as SecretBox;
        this.wallet = Wallet.NewWallet(seed, 1);
        this.selectedAccount = this.wallet.accounts[0].publicKey.toBase58();
        return;
      })
      .catch((err) => {
        throw new Error(`Unable to encrypt box: ${err}`);
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

const deriveEncryptionKey = async (password: any, salt: any, iterations: number, digest: any): Promise<any> => {
  return new Promise((resolve, reject) =>
    pbkdf2(password, salt, iterations, secretbox.keyLength, digest, (err, key) => (err ? reject(err) : resolve(key))),
  );
};
