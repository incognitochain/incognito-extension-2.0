import { store as reduxStore } from "@redux/store/store";
import { IncognitoSignTransactionResponse, RequestAccountsResp, WalletActionsType } from "../core/types";
import { createLogger, genETHAccFromOTAKey, makeSignature } from "../core/utils";
import { ActionManager } from "./lib/action-manager";
import { Store } from "./store";

import { actionSetSignTransactionData } from "@module/SignTransaction/SignTransaction.actions";
import { ISignTransactionParams } from "@module/SignTransaction/SignTransaction.types";
import { FORM_CONFIGS } from "@popup/module/SignTransaction/SignTransaction.constant";
import { actionSelectedPrivacySet } from "@redux-sync-storage/selectedPrivacy/selectedPrivacy.actions";
import { actionHandler } from "@redux-sync-storage/store/store";
import { defaultAccountWalletSelector, getCurrentPaymentAddress } from "@redux/account/account.selectors";
import { batch } from "react-redux";
import { change } from "redux-form";
import { getBalanceFromDApp } from "./worker.scanCoins";
const { createNewCoins } = require("incognito-chain-web-js/build/web/wallet");

const log = createLogger("incognito:walletCtr");
const createAsyncMiddleware = require("json-rpc-engine/src/createAsyncMiddleware");

interface WalletControllerOpt {
  store: Store;
  actionManager: ActionManager;
  openPopup: () => Promise<void>;
  reduxSyncStorage: any;
}

interface MiddlewareOpts {
  origin: string;
  extensionId: string;
}

export class WalletController {
  private store: Store;
  private actionManager: ActionManager;
  private openPopup: any;
  private reduxSyncStorage: any;

  constructor(opts: WalletControllerOpt) {
    const { store, openPopup, actionManager, reduxSyncStorage } = opts;
    this.reduxSyncStorage = reduxSyncStorage;
    this.store = store;
    this.actionManager = actionManager;
    this.openPopup = openPopup;
  }

  createMiddleware(opts: MiddlewareOpts) {
    const { origin } = opts;
    if (typeof origin !== "string" || !origin.length) {
      throw new Error("Must provide non-empty string origin.");
    }

    return createAsyncMiddleware(async (req: any, res: any, next: any) => {
      const method = req.method as WalletActionsType;
      switch (method) {
        case "wallet_getState":
          let resp = { state: "uninitialized" };
          if (this.store.isLocked()) {
            resp.state = "locked";
          }
          if (this.store.isUnlocked()) {
            resp.state = "unlocked";
          }
          res.result = resp;
          break;
        // case "wallet_getCluster":
        //   res.result = this.store.selectedNetwork;
        //   break;
        case "wallet_signTransaction":
          try {
            log("[wallet_signTransaction] resquest: ", req);
            let params = req.params;
            let pDaoSignature: any = {};
            let ethWalletInfo: any = {};
            if (params?.metadata && params?.metadata?.Type === 338 && !params?.metadata?.RemoteAddress) {
              const accountSender = defaultAccountWalletSelector(reduxStore.getState());
              const otaKey = await accountSender?.getOTAKey();
              ethWalletInfo = await genETHAccFromOTAKey(otaKey);
              req.params.metadata.RemoteAddress = ethWalletInfo.address;
              req.params.receiverAddress = ethWalletInfo.address;
            }

            let resp: any = await this._handleSignTransaction(req);

            if (params?.pDaoData) {
              // Make pDao Signature
              const pDaoData = params.pDaoData;
              const privateKey = Buffer.from(ethWalletInfo.privateKey, "hex");
              const pDaoTransactionType: "CREATE_PROPOSAL" | "VOTE" = pDaoData.transactionType;

              pDaoSignature = {
                createPropSignature:
                  pDaoTransactionType === "CREATE_PROPOSAL"
                    ? makeSignature(1, pDaoData.createProposalInfo, privateKey)
                    : "",
                propVoteSignature: makeSignature(2, pDaoData.voteProposalInfo, privateKey),
                reShieldSignature: makeSignature(
                  3,
                  {
                    burnTX: resp?.txHash.startsWith("0x") ? resp?.txHash?.slice(2) : resp?.txHash,
                  },
                  privateKey,
                ),
              };
            }
            res.result = { ...resp, pDaoSignature };
          } catch (err) {
            log("error: wallet_signTransaction failed  with error: %s", JSON.stringify(err));
            res.error = err;
          }
          break;
        case "wallet_requestAccounts":
          try {
            let resp = await this._handleRequestAccounts(req);
            if (resp) {
              const accountSender = defaultAccountWalletSelector(reduxStore.getState());
              const otaReceiver = await accountSender?.getOTAReceive();
              const burnerAddress = await accountSender?.getBurnerAddress2();
              let otaReceiverWithCfg;
              if (req.params && req.params?.senderShardID !== undefined) {
                otaReceiverWithCfg = await accountSender?.getOTAReceiveWithCfg({
                  senderShardID: req.params?.senderShardID,
                });
              }
              resp.otaReceiver = otaReceiver;
              resp.burnerAddress = burnerAddress;
              resp.otaReceiverWithCfg = otaReceiverWithCfg;
              const paymentAddress = accountSender.getPaymentAddress();
              resp.newCoins = await createNewCoins(paymentAddress);
            }
            console.log("wallet_requestAccounts: respone ", res);

            res.result = resp;
          } catch (err) {
            console.log("wallet_requestAccount: ERROR ", err);
            res.error = err;
          }
          break;

        case "wallet_getPaymentAddress":
          try {
            let resp = await this._handleGetPaymentAddress(req);
            res.result = resp;
          } catch (err) {
            log("wallet_getPaymentAddress failed  with error: %O", err);
            res.error = err;
          }
          break;
        case "wallet_showPopup":
          {
            this._showPopup();
          }
          break;
        default:
          console.log("wallet controller unknown method name [%s] with params: %o", req.method, req.params);
          res.result = `unknown method name ${req.method} with params: ${req.params}`;
          // when this promise resolves, the response is on its way back
          // eslint-disable-next-line callback-return
          await next();
      }
    });
  }

  // _handleRequestAccounts = async (req: any): Promise<RequestAccountsResp> => {
  //   const { tabId, origin } = req;
  //   const { promptAuthorization } = req.params;
  //   log("Handling request accounts tabId: %s origin: %s, prompt user: %s)", tabId, origin, promptAuthorization);

  //   //todo: popup only if user never agree to request account for this origin
  //   if (this.store.isOriginAuthorized(origin) && this.store.getWalletState() === "unlocked") {
  //     return { accounts: this.store.wallet ? this.store.wallet.getPublicKeysAsBs58() : [] };
  //   }

  //   if (!promptAuthorization) {
  //     throw new Error("Unauthorized, you must request permissions first to access accounts.");
  //   }

  //   this._showPopup();

  //   if (!this.store.isOriginAuthorized(origin)) {
  //     return new Promise<RequestAccountsResp>((resolve, reject) => {
  //       this.actionManager.addAction(origin, tabId, {
  //         type: "request_accounts",
  //         resolve: resolve,
  //         reject: reject,
  //         tabId: tabId,
  //         origin: origin,
  //       });
  //     });
  //   }

  //   return { accounts: [] };
  // };

  _handleRequestAccounts = async (req: any): Promise<any> => {
    const { tabId, origin } = req;
    const { promptAuthorization } = req.params;
    console.log("[_handleRequestAccounts] req  ", req);

    if (this.store.getWalletState() === "unlocked") {
      // const accountDefault = await getFollowTokensBalance({ reduxSyncStorage: this.reduxSyncStorage });
      const accountDefault = await getBalanceFromDApp({ reduxSyncStorage: this.reduxSyncStorage });
      return {
        accounts: [accountDefault],
      };
    }

    // if (!promptAuthorization) {
    //   throw new Error("Unauthorized, you must request permissions first to access accounts.");
    // }

    this._showPopup();

    if (!this.store.isOriginAuthorized(origin)) {
      return new Promise<RequestAccountsResp>((resolve, reject) => {
        this.actionManager.addAction(origin, tabId, {
          type: "request_accounts",
          resolve: resolve,
          reject: reject,
          tabId: tabId,
          origin: origin,
        });
      });
    }

    return { accounts: [] };
  };

  _handleGetPaymentAddress = async (req: any): Promise<string> => {
    const result = getCurrentPaymentAddress(reduxStore.getState() as never);
    return result || "";
  };

  // _handleSignTransaction = async (req: any): Promise<SignTransactionResp> => {
  //   let {
  //     tabId,
  //     params: { message, signer },
  //   } = req;
  //   let markdowns: Markdown[] = [];

  //   log("Handling sign transaction from tab [%s] with message [%s] for signer %o", tabId, message, signer);
  //   try {
  //     const decodedMessage = bs58.decode(message);
  //     const trxMessage = decodeSerializedMessage(new Buffer(decodedMessage));
  //     const trx = Transaction.populate(trxMessage, []);
  //     log("transaction %O", trx);

  //     markdowns = await this.pluginManager.renderRicardian(trx);
  //     if (!markdowns) {
  //       log("Error! Decoding instructions should never fail");
  //     }
  //   } catch (e) {
  //     log("error populating transaction %O", e);
  //   }

  //   this._showPopup();

  //   return new Promise<SignTransactionResp>((resolve, reject) => {
  //     this.actionManager.addAction(origin, tabId, {
  //       type: "sign_transaction",
  //       resolve: resolve,
  //       reject: reject,
  //       tabId: tabId,
  //       message: message,
  //       signers: signer,
  //       details: markdowns,
  //     });
  //   });
  // };

  _handleSignTransaction = async (req: any): Promise<IncognitoSignTransactionResponse | void> => {
    const { tabId, origin } = req;
    if (this.store.getWalletState() === "unlocked" && req.params) {
      const params = req.params;
      const { receiverAddress, tokenID } = params as ISignTransactionParams;
      const updateData = () => {
        batch(() => {
          // dispatch(getPTokenList());
          actionHandler(actionSelectedPrivacySet({ tokenID }));
          actionHandler(change(FORM_CONFIGS.formName, FORM_CONFIGS.toAddress, receiverAddress));
          actionHandler(
            actionSetSignTransactionData({
              ...params,
            }),
          );
        });
      };

      updateData();
      setTimeout(() => {
        updateData();
      }, 300);
      setTimeout(() => {
        updateData();
      }, 1200);
    }
    await this._showPopup();
    this.actionManager.clearAllAction();
    return new Promise<IncognitoSignTransactionResponse>((resolve, reject) => {
      this.actionManager.addAction(origin, tabId, {
        type: "sign_transaction",
        resolve: resolve,
        reject: reject,
        tabId: tabId,
      });
    });
  };
  async _showPopup() {
    return this.openPopup().then(() => {});
  }
}
