import { Store } from "./store";
import { createLogger } from "@core/utils";
import { ActionRequestAccounts, IncognitoSignTransaction, Network, Notification, PopupActions } from "@core/types";
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
import serverService, { MAINNET_FULLNODE } from "@services/wallet/Server";
import { actionUpdateNetwork } from "@redux/configs/Configs.actions";
import { dispatch, store as reduxStore } from "@redux/store/store";
import Storage from "@services/storage";
import { APP_PASS_PHRASE_CIPHER, APP_SALT_KEY } from "@constants/common";
import {
  actionFetchCreateAccount,
  actionLogout,
  actionSwitchAccount,
  setDefaultAccount,
} from "@redux/account/account.actions";
import { getFollowTokensBalance } from "@background/worker.scanCoins";
import {
  defaultAccountSelector,
  defaultAccountWalletSelector,
  getAccountWithPaymentAddress,
  getCurrentPaymentAddress,
} from "@redux/account/account.selectors";
import accountService from "@services/wallet/accountService";
import { clearAllCaches } from "@services/cache";
import { clearReduxStore } from "@redux/reducers";
import { actionFreeAssets } from "@module/Assets/Assets.actions";
import { actionFistTimeScanCoins, actionFreeScanCoins, actionReScanCoins } from "@redux-sync-storage/scanCoins";
import { batch } from "react-redux";
import rpcSubmit from "@services/wallet/rpcSubmit";
import sharedSelectors from "@redux-sync-storage/shared/shared.selectors";
import { getPTokenList } from "@redux/token/token.actions";
import { changeNetwork } from "@redux-sync-storage/network/network.actions";
import { actionHandler } from "@redux-sync-storage/store/store";
import { freeAccount, getKeyDefineAccountSelector } from "@redux-sync-storage/account";
import { sleep } from "@popup/utils/utils";
import { actionAddFollowToken } from "@redux/token";
const { setShardNumber, Validator, PrivacyVersion } = require("incognito-chain-web-js/build/web/wallet");
const log = createLogger("incognito:popup");
const createAsyncMiddleware = require("json-rpc-engine/src/createAsyncMiddleware");
export interface PopupControllerOpt {
  store: Store;
  actionManager: ActionManager;
  popupState: PopupStateResolver;
  notifyAllDomains: ((payload: Notification) => Promise<void>) | null;
  extensionManager: ExtensionManager;
  persistData: any;
  scanCoinHandler: any;
  updateNetworkHandler: any;
  reduxSyncStorage: any;
}

export class PopupController {
  private store: Store;
  private actionManager: ActionManager;
  private _notifyAllDomains: ((payload: Notification) => Promise<void>) | null;
  private extensionManager: ExtensionManager;
  private popupState: PopupStateResolver;
  private persistData: any;
  private scanCoinHandler: any;
  private updateNetworkHandler: any;
  private reduxSyncStorage: any;

  constructor(opts: PopupControllerOpt) {
    const {
      store,
      notifyAllDomains,
      extensionManager,
      actionManager,
      popupState,
      persistData,
      scanCoinHandler,
      updateNetworkHandler,
      reduxSyncStorage,
    } = opts;
    this.reduxSyncStorage = reduxSyncStorage;
    this.store = store;
    this.actionManager = actionManager;
    this.popupState = popupState;
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
      let accountDetail;
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
              const accountDefault = await getFollowTokensBalance({ reduxSyncStorage: this.reduxSyncStorage });
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
              const accountDefault = await getFollowTokensBalance({ reduxSyncStorage: this.reduxSyncStorage });
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
              // const accountDefault = await getFollowTokensBalance();
              // this._notifyAll({
              //   type: "accountsChanged",
              //   data: accountDefault ? [accountDefault] : [],
              // });
              // this._notifyAll({
              //   type: "stateChanged",
              //   data: { state: "unlocked" },
              // });
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
              // await this.scanCoinHandler();

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
            const { isClear } = req.params;
            await this.scanCoinHandler({ isClear: isClear || false });
          } catch (err) {
            console.log("error: popup_lockWallet failed  with error: %s", err);
            res.error = err;
          }
          break;
        case "popup_request_account_detail":
          try {
            const { paymentAddress } = req.params;
            const selectedAccount = getAccountWithPaymentAddress(paymentAddress)(reduxStore.getState());
            accountDetail = {
              name: selectedAccount?.AccountName || "",
              paymentAddress: selectedAccount?.PaymentAddress,
              privateKey: selectedAccount?.PrivateKey,
              publicKeyCheckEncode: selectedAccount?.PublicKeyCheckEncode,
              readonlyKey: selectedAccount?.ReadonlyKey,
              validatorKey: selectedAccount?.ValidatorKey,
              blsPublicKey: selectedAccount?.BLSPublicKey,
              otaKey: selectedAccount?.OTAKey,
              id: selectedAccount?.ID,
              publicKeyBytes: selectedAccount?.PublicKeyBytes,
            };
          } catch (err) {
            log("error: popup_request_account_detail failed  with error: %s", err);
            res.error = err;
          }
          break;
        case "popup_getFollowTokenList":
          try {
            await this.getFollowTokenList();
          } catch (err) {
            log("error: popup_getFollowTokenList failed  with error: %s", err);
            res.error = err;
          }
          break;
        case "popup_getPTokenList":
          try {
            await this.getPTokenList();
          } catch (err) {
            log("error: getPTokenList failed  with error: %s", err);
            res.error = err;
          }
          break;
        case "popup_scan_coins_box_click":
          try {
            const { isCancel = false } = req.params;
            const res = await this.updateStatusScanCoins({ isFirstTimeScan: isCancel ? false : true });
            const accountSender = defaultAccountWalletSelector(reduxStore.getState());
            if (isCancel && res && accountSender) {
              await accountSender.setNewAccountCoinsScan();
            }
          } catch (err) {
            console.log("error: set default UTXOs scan coins failed  with error: %s", err);
            res.error = err;
          }
          break;
        case "popup_request_clear_storage_scan_coins":
          try {
            await this.scanCoinHandler({ isClear: true });
            await sleep(2000);
            await this.clearStorageScanCoins();
          } catch (err) {
            console.log("error: clear storage scan coins with error: %s", err);
            res.error = err;
          }
          break;
        case "popup_addNewFollowToken":
          try {
            const { tokenID } = req.params;
            await this.addNewFollowToken(tokenID);
            await getFollowTokensBalance({ reduxSyncStorage: this.reduxSyncStorage });
          } catch (err) {
            console.log("error: popup_addNewFollowToken with error: %s", err);
            res.error = err;
          }
          break;
        default:
          console.log("popup controller middleware did not match method name %s", req.method);
          await next();
          return;
      }
      // if any of the above popup commands did not error
      // out make sure to return the state, the popup expects it!

      if (!res.error) {
        const popupStateData = this.popupState.get();
        res.result = {
          ...popupStateData,
          accountDetail,
          reqResponse,
        };
      }
      reqResponse = null;
      accountDetail = undefined;
      console.log("RETURN RESULT => UI ", {
        method,
        res,
      });
    });
  }

  async getPTokenList() {
    await reduxStore.dispatch(getPTokenList());
  }

  async addNewFollowToken(tokenID: string) {
    await reduxStore.dispatch(actionAddFollowToken({ tokenID }));
  }

  async updateStatusScanCoins({ isFirstTimeScan }: { isFirstTimeScan: boolean }) {
    let res = false;
    const accountSender = defaultAccountWalletSelector(reduxStore.getState());
    const keyDefine = getKeyDefineAccountSelector(this.reduxSyncStorage.getState());
    if (!accountSender || !keyDefine) return res;
    const walletState = this.popupState.get().walletState;
    if (walletState !== "locked") {
      await actionHandler(actionFistTimeScanCoins({ isScanning: isFirstTimeScan, otaKey: keyDefine }));
      res = true;
    }
    return res;
  }

  async clearStorageScanCoins() {
    try {
      const accountSender = defaultAccountWalletSelector(reduxStore.getState());
      const keyDefine = getKeyDefineAccountSelector(this.reduxSyncStorage.getState());
      if (!accountSender || !keyDefine) return;
      await accountSender.clearStorageCoinsScan();
      await actionHandler(actionReScanCoins({ keyDefine }));
    } catch (e) {
      throw e;
    }
  }

  async confirmScanCoins() {
    const accountSender = defaultAccountWalletSelector(reduxStore.getState());
    const keyDefine = getKeyDefineAccountSelector(this.reduxSyncStorage.getState());
    if (!accountSender || !keyDefine) return;
    const walletState = this.popupState.get().walletState;
    if (walletState !== "locked") {
      await actionHandler(actionFistTimeScanCoins({ isScanning: false, otaKey: keyDefine }));
    }
  }

  async getFollowTokenList() {
    const followTokens = sharedSelectors.followTokensFormatedSelector(this.reduxSyncStorage.getState());
    return followTokens;
  }

  async createAccount({ accountName }: { accountName: string }) {
    await reduxStore.dispatch(actionFetchCreateAccount({ accountName }));
    const defaultAccount = defaultAccountSelector(reduxStore.getState());
    await dispatch(setDefaultAccount(defaultAccount));
  }

  async switchAccount({ accountName }: { accountName: string }) {
    await reduxStore.dispatch(actionSwitchAccount(accountName));
  }

  async unlockWallet({ password }: { password: string }) {
    try {
      await this.store.unlockSecretBox(password);
      const wallet = await reduxStore.dispatch(unlockMasterKey(password));
      this.store.setWallet(wallet);
      // this.persistData();
    } catch (e) {
      console.log("unlockWallet ERROR ", e);
    }
  }

  async switchNetwork() {
    try {
      const wallet = await reduxStore.dispatch(masterKeySwitchNetwork());
      const currentServer = await serverService.getDefault();
      await actionHandler(changeNetwork(currentServer));
      this.store.setWallet(wallet);
    } catch (e) {
      console.log("switchNetwork ERROR ", e);
    }
  }

  async initMasterKey(data: InitMasterKeyPayload) {
    const { mnemonic, masterKeyName, password } = data;

    const wallet = await reduxStore.dispatch(initMasterKey({ mnemonic, masterKeyName, password }));
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
    const wallet = await reduxStore.dispatch(importMasterKey({ mnemonic, masterKeyName, password }));
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
    await reduxStore.dispatch(clearReduxStore());
    batch(() => {
      actionHandler(actionFreeAssets());
      // reduxStore.dispatch(actionFreeScanCoins());
      actionHandler(actionFreeScanCoins());
      reduxStore.dispatch(actionLogout());
    });
    await this.updateNetworkHandler();

    // Create new wallet, the same flow import wallet
    const wallet = await reduxStore.dispatch(importMasterKey({ mnemonic, masterKeyName: "Wallet", password }));

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
    await actionHandler(freeAccount());
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
        network,
        burningRequestMeta,
      } = req.params;
      const accountSender = defaultAccountWalletSelector(reduxStore.getState());
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

        const submitHash = async ({ txId }: { txId: string }) => {
          try {
            const payload = {
              Network: network,
              UserFeeLevel: 1,
              ID: Number(burnFeeID),
              IncognitoAmount: String(burnAmount),
              IncognitoTx: txId,
              PaymentAddress: receiverAddress,
              PrivacyTokenAddress: receiverTokenID,
              UserFeeSelection: isUseTokenFee ? 1 : 2,
              WalletAddress: accountSender.getPaymentAddress(),
            };
            await rpcSubmit.submitUnshieldTx(payload);
          } catch (e) {
            pendingTransactionAction.reject(new Error("Create Transaction failed"));
            this.actionManager.deleteAction(actionKey);
            console.log("SUBMIT HASH ERROR ", e);
            throw e;
          }
        };
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
            txHashHandler: submitHash,
          });
        } else {
          tx = await accountService.createBurningRequest({
            accountSender,
            fee: networkFee,
            prvPayments,
            tokenPayments,
            burnAmount: burnAmount,
            info: String(burnFeeID),
            tokenId: burnToken,
            version: PrivacyVersion.ver3,
            remoteAddress: receiverAddress,
            burningType: burningRequestMeta,
            txHashHandler: submitHash,
          });
        }
      }
    } catch (error) {
      console.log("CREATE TRANSACTION ERROR: ", error);
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
    await getFollowTokensBalance({ reduxSyncStorage: this.reduxSyncStorage });
  }

  async createAndSendTransaction({ isMainCrypto = true, payload = null }: { isMainCrypto: Boolean; payload: any }) {
    const accountSender = defaultAccountWalletSelector(reduxStore.getState());
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

    // this.store.selectedNetwork = {
    //   title: "Custom",
    //   cluster: cluster,
    //   endpoint: endpoint,
    // };
    // onExit(this.store.selectedNetwork);
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
        // this.store.selectedAccount = account;
        return;
      }
    }

    throw new Error(`Selected account %{act} not found`);
  }

  addAccount() {
    const newAccount = this.store.wallet?.addAccount();

    if (newAccount) {
      // this.store.selectedAccount = newAccount.publicKey.toBase58();
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
}
