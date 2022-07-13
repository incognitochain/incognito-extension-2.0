import { Store } from "./store";
import { createLogger } from "@core/utils";
import { Buffer } from "buffer";
import bs58 from "bs58";
import nacl from "tweetnacl";
import invariant from "assert";
import {
  ActionRequestAccounts,
  ActionSignTransaction,
  AVAILABLE_NETWORKS,
  IncognitoSignTransaction,
  Network,
  Notification,
  PopupActions,
  SignatureResult,
} from "@core/types";
import { Account, Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import { Web3Connection } from "@core/connection";
import { ExtensionManager } from "./lib/extension-manager";
import { ActionManager } from "./lib/action-manager";
import { PopupStateResolver } from "./lib/popup-state-resolver";
import {
  importMasterKey,
  ImportMasterKeyPayload,
  initMasterKey,
  InitMasterKeyPayload,
  masterKeySwitchNetwork,
  unlockMasterKey,
} from "@redux/masterKey";
import { dispatch, store } from "@redux/store/store";
import Storage from "@services/storage";
import { APP_PASS_PHRASE_CIPHER, APP_SALT_KEY } from "@constants/common";
import { actionFetchCreateAccount, actionLogout, actionSwitchAccount } from "@redux/account";
import { getFollowTokensBalance } from "@background/worker.scanCoins";
import { defaultAccountWalletSelector, getCurrentPaymentAddress } from "@redux/account/account.selectors";
import accountService from "@services/wallet/accountService";
import { clearAllCaches } from "@services/cache";
import { clearReduxStore } from "@redux/reducers";
import { actionFreeAssets } from "@module/Assets";
import { actionFreeScanCoins } from "@redux/scanCoins";
import { batch } from "react-redux";
import { accountSelector } from "../redux/account/account.selectors";
import sharedSelectors from "@redux/shared/shared.selectors";
const {
  setShardNumber,
  Validator,
  PrivacyVersion,
  ACCOUNT_CONSTANT,
  BurningFantomRequestMeta,
  BurningPBSCRequestMeta,
  BurningPLGRequestMeta,
  BurningPRVBEP20RequestMeta,
  BurningPRVERC20RequestMeta,
  BurningRequestMeta,
} = require("incognito-chain-web-js/build/web/wallet");
const log = createLogger("incognito:popup");
const createAsyncMiddleware = require("json-rpc-engine/src/createAsyncMiddleware");
export interface PopupControllerOpt {
  store: Store;
  actionManager: ActionManager;
  popupState: PopupStateResolver;
  connection: Web3Connection;
  notifyAllDomains: ((payload: Notification) => Promise<void>) | null;
  extensionManager: ExtensionManager;
  persistData: any;
  scanCoinHandler: any;
  updateNetworkHandler: any;
}

export class PopupController {
  private store: Store;
  private actionManager: ActionManager;
  private _notifyAllDomains: ((payload: Notification) => Promise<void>) | null;
  private connection: Web3Connection;
  private extensionManager: ExtensionManager;
  private popupState: PopupStateResolver;
  private persistData: any;
  private scanCoinHandler: any;
  private updateNetworkHandler: any;

  constructor(opts: PopupControllerOpt) {
    const {
      store,
      notifyAllDomains,
      connection,
      extensionManager,
      actionManager,
      popupState,
      persistData,
      scanCoinHandler,
      updateNetworkHandler,
    } = opts;
    this.store = store;
    this.actionManager = actionManager;
    this.popupState = popupState;
    this.connection = connection;
    this._notifyAllDomains = notifyAllDomains;
    this.extensionManager = extensionManager;
    this.persistData = persistData;
    this.scanCoinHandler = scanCoinHandler;
    this.updateNetworkHandler = updateNetworkHandler;
  }

  createMiddleware() {
    return createAsyncMiddleware(async (req: any, res: any, next: any) => {
      const method = req.method as PopupActions;
      let reqResponse;
      switch (method) {
        case "popup_getState":
          break;
        case "popup_createWallet":
          {
            try {
              await this.initMasterKey(req.params as InitMasterKeyPayload);
              await this.updateNetworkHandler();
              // await this.scanCoinHandler();
              this._notifyAll({
                type: "stateChanged",
                data: { state: "unlocked" },
              });
            } catch (err) {
              log("error: popup_createWallet failed  with error: %s", err);
              res.error = err;
            }
          }

          break;

        case "popup_createAccount":
          {
            try {
              await this.scanCoinHandler({ isClear: true });
              await this.createAccount(req.params);
              const accountDefault = await getFollowTokensBalance();
              this._notifyAll({
                type: "accountsChanged",
                data: accountDefault ? [accountDefault] : [],
              });
            } catch (err) {
              log("error: popup_createAccount failed  with error: %s", err);
              res.error = err;
            }
          }
          break;

        case "popup_switchAccount":
          {
            try {
              await this.switchAccount(req.params);
              const accountDefault = await getFollowTokensBalance();
              this._notifyAll({
                type: "accountsChanged",
                data: accountDefault ? [accountDefault] : [],
              });
            } catch (err) {
              log("error: popup_switchAccount failed  with error: %s", err);
              res.error = err;
            }
          }
          break;
        case "popup_importWallet":
          await this.importMasterKey(req.params as InitMasterKeyPayload);
          await this.updateNetworkHandler();
          // await this.scanCoinHandler();
          this._notifyAll({
            type: "stateChanged",
            data: { state: "unlocked" },
          });
          break;
        case "popup_restoreWallet":
          await this.restoreWallet(req.params);
          await this.scanCoinHandler();
          this._notifyAll({
            type: "stateChanged",
            data: { state: "unlocked" },
          });
          break;

        case "popup_unlockWallet":
          {
            try {
              // await this.store.unlockSecretBox(req.params.password);
              await this.updateNetworkHandler();
              await this.unlockWallet(req.params);
              await this.scanCoinHandler();
              this._notifyAll({
                type: "stateChanged",
                data: { state: "unlocked" },
              });
            } catch (err) {
              log("error: popup_unlockWallet failed  with error: %s", err);
              res.error = err;
            }
          }

          break;
        case "popup_lockWallet":
          {
            try {
              // await this.store.lockSecretBox();
              await this.lockWalletAction();
              await this.scanCoinHandler();
              this._notifyAll({
                type: "stateChanged",
                data: { state: "locked" },
              });
            } catch (err) {
              log("error: popup_lockWallet failed  with error: %s", err);
              res.error = err;
            }
          }
          break;
        case "popup_switchNetwork":
          try {
            await this.switchNetwork();
            // await this.scanCoinHandler();
          } catch (err) {
            log("error: popup_lockWallet failed  with error: %s", err);
            res.error = err;
          }
          break;

        case "popup_authoriseRequestAccounts":
          try {
            await this.approveRequestAccounts(req);
          } catch (err) {
            log("Failed popup_approvePermissionsRequest with error: %s", err);
            res.error = err;
          }
          break;
        case "popup_deleteAuthorizedWebsite":
          try {
            await this.deleteAuthorizedWebsite(req);
          } catch (err) {
            log("Failed popup_deleteAuthorizedWebsite with error: %s", err);
            res.error = err;
          }
          break;
        case "popup_declineRequestAccounts":
          try {
            await this.declineRequestAccounts(req);
          } catch (err) {
            log("Failed popup_declineRequestAccounts with error: %s", err);
            res.error = err;
          }
          break;
        case "popup_authoriseTransaction":
          try {
            await this.signTransaction(req);
          } catch (err) {
            log("popup_approvePermissionsRequest failed with error: %s", err);
            res.error = err;
          }
          break;
        case "popup_declineTransaction":
          try {
            await this.declineTransaction(req);
          } catch (err) {
            log("popup_declineTransaction failed with error: %s", err);
            res.error = err;
          }
          break;
        case "popup_sendSolToken":
          try {
            await this.sendSolToken(req);
          } catch (err) {
            log("popup_sendSolToken failed with error: %s", err);
            res.error = err;
          }
          break;
        case "popup_addWalletAccount":
          this.addAccount();
          break;
        case "popup_changeNetwork":
          try {
            this.changeNetwork(req);
          } catch (err) {
            log("popup_changeNetwork failed with error: %s", err);
            res.error = err;
          }
          break;
        case "popup_changeAccount":
          try {
            this.changeAccount(req);
          } catch (err) {
            log("popup_changeAccount failed with error: %s", err);
            res.error = err;
          }
          break;
        case "popup_followTokensBalance":
          try {
            await this.loadFollowTokensBalance();
          } catch (err) {
            log("popup_followTokensBalance failed with error: %s", err);
            res.error = err;
          }
          break;
        case "popup_create_and_send_transaction":
          try {
            const { isMainCrypto, payload } = req.params;
            reqResponse = await this.createAndSendTransaction({ isMainCrypto, payload });
          } catch (err) {
            log("popup_create_and_send_transaction failed with error: %s", err);
            res.error = err;
          }
          break;
        case "popup_request_scan_coins":
          try {
            await this.scanCoinHandler();
          } catch (err) {
            log("error: popup_lockWallet failed  with error: %s", err);
            res.error = err;
          }
          break;
        default:
          log("popup controller middleware did not match method name %s", req.method);
          await next();
          return;
      }
      // if any of the above popup commands did not error
      // out make sure to return the state, the popup expects it!
      if (!res.error) {
        res.result = {
          ...this.popupState.get(),
          reqResponse,
        };
      }
      reqResponse = null;
    });
  }

  async createAccount({ accountName }: { accountName: string }) {
    await dispatch(actionFetchCreateAccount({ accountName }));
  }

  async switchAccount({ accountName }: { accountName: string }) {
    await dispatch(actionSwitchAccount(accountName));
  }

  async unlockWallet({ password }: { password: string }) {
    try {
      await this.store.unlockSecretBox(password);
      const wallet = await dispatch(unlockMasterKey(password));
      this.store.setWallet(wallet);
      // this.persistData();
    } catch (e) {
      console.log("unlockWallet ERROR ", e);
    }
  }

  async switchNetwork() {
    try {
      const wallet = await dispatch(masterKeySwitchNetwork());
      this.store.setWallet(wallet);
    } catch (e) {
      console.log("switchNetwork ERROR ", e);
    }
  }

  async initMasterKey(data: InitMasterKeyPayload) {
    const { mnemonic, masterKeyName, password } = data;

    const wallet = await dispatch(initMasterKey({ mnemonic, masterKeyName, password }));
    const salt = await Storage.getItem(APP_SALT_KEY);
    const passphraseEncrypted = await Storage.getItem(APP_PASS_PHRASE_CIPHER);
    this.store.setSecretBox({
      salt,
      passphraseEncrypted,
    });
    this.store.setWallet(wallet);
    this.persistData();
  }

  async importMasterKey(data: ImportMasterKeyPayload) {
    const { mnemonic, masterKeyName, password } = data;
    const wallet = await dispatch(importMasterKey({ mnemonic, masterKeyName, password }));
    const salt = await Storage.getItem(APP_SALT_KEY);
    const passphraseEncrypted = await Storage.getItem(APP_PASS_PHRASE_CIPHER);
    this.store.setSecretBox({
      salt,
      passphraseEncrypted,
    });
    this.store.setWallet(wallet);
    this.persistData();
  }

  async restoreWallet(params: { mnemonic: string; password: string }) {
    const { mnemonic, password } = params;
    // Clear All Local Data
    await Storage.clear();
    // await Storage.logAll();
    await clearAllCaches();
    await dispatch(clearReduxStore());
    batch(() => {
      dispatch(actionFreeAssets());
      dispatch(actionFreeScanCoins());
      dispatch(actionLogout());
    });
    await this.updateNetworkHandler();

    // Create new wallet, the same flow import wallet
    const wallet = await dispatch(importMasterKey({ mnemonic, masterKeyName: "Wallet", password }));

    const salt = await Storage.getItem(APP_SALT_KEY);
    const passphraseEncrypted = await Storage.getItem(APP_PASS_PHRASE_CIPHER);
    this.store.setSecretBox({
      salt,
      passphraseEncrypted,
    });
    this.store.setWallet(wallet);
    this.persistData();
  }

  async lockWalletAction() {
    this.store.setWallet(null);
  }

  async deleteAuthorizedWebsite(req: any) {
    log("deleting authorized website: %O", req);
    const { origin } = req.params;
    this.store.removeAuthorizedOrigin(origin);
  }

  async approveRequestAccounts(req: any) {
    log("Approving request account: %O", req);
    const { actionKey } = req.params;
    const actions = this.actionManager.getActionsWithOriginAndType<ActionRequestAccounts>(
      actionKey.origin,
      "request_accounts",
    );
    if (actions.size === 0) {
      log("Unable to find request accounts actions for origin %s:", origin);
      return;
    }

    this.store.addAuthorizedOrigin(actionKey.origin);
    actions.forEach((action, key) => {
      action.resolve({
        accounts: this.store.wallet ? this.store.wallet.getPublicKeysAsBs58() : [],
      });
      this.actionManager.deleteAction(key);
    });
  }

  async declineRequestAccounts(req: any) {
    log("Declining request accounts for %O", req);
    const { actionKey } = req.params;

    const action = this.actionManager.getAction<ActionRequestAccounts>(actionKey);
    if (!action) {
      log("Action request accounts with key %O not found", actionKey);
      return;
    }
    action.reject(new Error("access to accounts deny"));
    this.actionManager.deleteAction(actionKey);
  }

  // async signTransaction(req: any) {
  //   log("Signing transaction request for %O", req);
  //   const { actionKey } = req.params;

  //   const pendingTransactionAction = this.actionManager.getAction<ActionSignTransaction>(actionKey);
  //   if (!pendingTransactionAction) {
  //     log("Unable to find sign transaction actions: %O", actionKey);
  //     return;
  //   }

  //   if (!this.store.wallet) {
  //     log("Unable sign transaction with out a wallet for actionKey %O", actionKey);
  //     return;
  //   }
  //   const wallet = this.store.wallet;

  //   const m = new Buffer(bs58.decode(pendingTransactionAction.message));

  //   const signatureResults: SignatureResult[] = [];
  //   pendingTransactionAction.signers.forEach((signerKey) => {
  //     log("Search for signer account: %s", signerKey);
  //     const account = wallet.findAccount(signerKey);
  //     if (!account) {
  //       throw new Error("no account found for signer key: " + signerKey);
  //     }
  //     const signature = nacl.sign.detached(m, account.secretKey);
  //     invariant(signature.length === 64);
  //     signatureResults.push({ publicKey: signerKey, signature: bs58.encode(signature) });
  //   });

  //   pendingTransactionAction.resolve({ signatureResults: signatureResults });
  //   this.actionManager.deleteAction(actionKey);
  // }

  async signTransaction(req: any) {
    log("Signing transaction request for %O", req);
    const { actionKey } = req.params;

    const pendingTransactionAction = this.actionManager.getAction<IncognitoSignTransaction>(actionKey);
    if (!pendingTransactionAction) {
      console.log("Unable to find sign transaction actions: %O", actionKey);
      return;
    }

    if (!this.store.wallet) {
      log("Unable sign transaction with out a wallet for actionKey %O", actionKey);
      return;
    }
    let tx: any;
    try {
      const {
        networkFee,

        isUnshield,
        isUnified,

        burnFee,
        burnFeeToken,
        burnFeeID,

        burnAmount,
        burnToken,

        receiverAddress,
        feeAddress,

        receiverTokenID,

        estimatedBurnAmount, // estimate fee unified
        estimatedExpectedAmount, // estimate fee unified
      } = req.params;

      const accountSender = defaultAccountWalletSelector(store.getState());
      new Validator("signTransaction-networkFee", networkFee).amount();
      new Validator("signTransaction-isUnified", isUnified).boolean();

      let tokenPayments: any = [];
      let prvPayments: any = [];
      if (isUnshield) {
        new Validator("signTransaction-burnAmount", burnAmount).required().amount();
        new Validator("signTransaction-burnToken", burnToken).required().string();
        new Validator("signTransaction-burnFee", burnFee).required().amount();
        new Validator("signTransaction-burnFeeToken", burnFeeToken).required().string();
        new Validator("signTransaction-receiverAddress", receiverAddress).required().string();
        new Validator("signTransaction-feeAddress", feeAddress).required().string();
        new Validator("signTransaction-receiverTokenID", receiverTokenID).required().string();
        new Validator("signTransaction-burnFeeID", burnFeeID).required().string();
        const isUseTokenFee = burnFeeToken === burnToken;
        const paymentInfo = [
          {
            paymentAddress: feeAddress,
            amount: burnFee,
          },
        ];
        if (isUseTokenFee) {
          tokenPayments = paymentInfo;
        } else {
          prvPayments = paymentInfo;
        }
        if (isUnified) {
          new Validator("signTransaction-receiverTokenID", receiverTokenID).required().string();
          new Validator("signTransaction-estimatedBurnAmount", estimatedBurnAmount).required().number();
          new Validator("signTransaction-estimatedExpectedAmount", estimatedExpectedAmount).required().number();
          const burningInfos = [
            {
              incTokenID: receiverTokenID,
              burningAmount: estimatedBurnAmount,
              expectedAmount: estimatedExpectedAmount,
              remoteAddress: receiverAddress,
            },
          ];
          tx = await accountService.createAndSendBurnUnifiedTokenRequestTx({
            accountSender,
            prvPayments,
            tokenPayments,
            burningInfos,
            fee: networkFee,
            info: String(burnFeeID),
            version: PrivacyVersion.ver3,
            tokenId: burnToken,
          });
        } else {
          tx = await accountService.createBurningRequest({
            accountSender,
            fee: networkFee,
            prvPayments,
            tokenPayments,
            info: String(burnFeeID),
            tokenId: burnToken,
            version: PrivacyVersion.ver3,
            remoteAddress: receiverAddress,
            burningType: BurningRequestMeta,
          });
        }
      }
    } catch (error) {
      pendingTransactionAction.reject(error);
    }

    if (tx && tx.hash) {
      pendingTransactionAction.resolve({ data: tx.hash });
    } else {
      pendingTransactionAction.reject(new Error("Create Transaction failed"));
    }
    this.actionManager.deleteAction(actionKey);
  }

  async declineTransaction(req: any) {
    console.log("Declining transaction request for %O", req);
    const { actionKey } = req.params;

    const pendingTransactionAction = this.actionManager.getAction<IncognitoSignTransaction>(actionKey);
    if (!pendingTransactionAction) {
      log("Unable to find sign transaction actions: %O", actionKey);
      return;
    }

    pendingTransactionAction.reject(new Error("Transaction declined"));
    this.actionManager.deleteAction(actionKey);
  }

  async loadFollowTokensBalance() {
    await getFollowTokensBalance();
  }

  async createAndSendTransaction({ isMainCrypto = true, payload = null }: { isMainCrypto: Boolean; payload: any }) {
    const accountSender = defaultAccountWalletSelector(store.getState());
    if (!accountSender) return null;
    let tx;
    if (typeof setShardNumber === "function") {
      await setShardNumber(8);
    }
    if (isMainCrypto) {
      tx = await accountService.createAndSendNativeToken({
        ...payload,
        accountSender,
      });
    } else {
      tx = await accountService.createAndSendPrivacyToken({
        ...payload,
        accountSender,
      });
    }
    return tx;
  }

  changeNetwork(req: any) {
    log("Changing network: %O", req);

    const onExit = (network: Network) => {
      // change the connection network option
      this.connection.changeNetwork(network);
      this._notifyAll({
        type: "clusterChanged",
        data: network,
      });
    };
    // TODO: Endpoint will be used here to add a customer cluster
    const { cluster, endpoint } = req.params;
    if (!cluster) {
      throw new Error("Must specify an network endpoint to change network");
    }
    for (const network of AVAILABLE_NETWORKS) {
      if (network.cluster === cluster) {
        this.store.selectedNetwork = network;
        onExit(network);
        return;
      }
    }

    this.store.selectedNetwork = {
      title: "Custom",
      cluster: cluster,
      endpoint: endpoint,
    };
    onExit(this.store.selectedNetwork);
  }

  changeAccount(req: any) {
    log("Changing account: %O", req);

    const { account } = req.params;
    if (!account) {
      throw new Error("Must specify an account");
    }
    if (!this.store.wallet) {
      throw new Error("Cannot select account without a wallet ");
    }

    for (const act of this.store.wallet?.getPublicKeysAsBs58()) {
      if (account === act) {
        this.store.selectedAccount = account;
        return;
      }
    }

    throw new Error(`Selected account %{act} not found`);
  }

  addAccount() {
    const newAccount = this.store.wallet?.addAccount();

    if (newAccount) {
      this.store.selectedAccount = newAccount.publicKey.toBase58();
      this._notifyAll({
        type: "accountsChanged",
        data: this.store.wallet?.getPublicKeysAsBs58() || [],
      });
    }
  }

  _notifyAll(notification: Notification) {
    console.log("Notifying all domains");
    console.log(this._notifyAllDomains);
    if (this._notifyAllDomains) {
      console.log("notification ", notification);
      this._notifyAllDomains(notification)
        .then(() => {
          log("Notifying domains completed");
        })
        .catch((err) => {
          log("Error notifying domains: %s", err);
        });
    }
  }

  async sendSolToken(req: any) {
    log(`send token for req %O`, req);
    const transfer = req.params.transfer;

    if (!this.store.wallet) {
      throw new Error(`Unable sign and send transaction with out a wallet`);
    }

    let signingAccount: Account | undefined;
    this.store.wallet.accounts.forEach((a: Account) => {
      if (a.publicKey.toBase58() === req.params.transfer.fromPubkey) {
        signingAccount = a;
      }
    });

    if (!signingAccount) {
      throw new Error(`no account found in wallet for pubkey: ${req.params.transfer}`);
    }

    const lamports = req.params.transfer.lamports;
    log("lamports for transaction: %O", lamports);
    const transaction = SystemProgram.transfer({
      fromPubkey: new PublicKey(transfer.fromPubkey),
      toPubkey: new PublicKey(transfer.toPubkey),
      lamports: lamports,
    });

    log("creating connection with address: ", this.store.selectedNetwork.endpoint);
    const connection = new Connection(this.store.selectedNetwork.endpoint);

    log("sending transaction %O", transaction);

    try {
      const signature = await connection.sendTransaction(transaction, [signingAccount]);
      log("Got signature:", signature);
    } catch (e) {
      throw new Error("Failed to send transaction: " + e);
    }
  }
}
