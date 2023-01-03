import Server from "@services/wallet/Server";
import _, { cloneDeep } from "lodash";
import storage from "@services/storage";
import { CONSTANT_KEYS, COINS } from "@constants/index";
import { clearAllCaches } from "@services/cache";
import BigNumber from "bignumber.js";
import { CustomError, ErrorCode, ExHandler } from "../exception";
import WalletServices from "./walletService";
import AccountModel from "@model/account";
import { STACK_TRACE } from "@services/exception/customError/code/webjsCode";
import { getAccountNameByAccount, getAccountWallet } from "@services/wallet/wallet.shared";
import { PRV_ID } from "@constants/common";

const {
  AccountWallet,
  KeyWallet,
  Wallet,
  constants,
  Validator,
  PrivacyVersion,
  PRVIDSTR,
  isPaymentAddress,
  isOldPaymentAddress,
} = require("incognito-chain-web-js/build/web/wallet");

const TAG = "Account";

export default class Account {
  static NO_OF_INPUT_PER_DEFRAGMENT_TX = 10;
  static MAX_DEFRAGMENT_TXS = 3;
  static NO_OF_INPUT_PER_DEFRAGMENT = Account.NO_OF_INPUT_PER_DEFRAGMENT_TX * Account.MAX_DEFRAGMENT_TXS;

  static async getDefaultAccountName() {
    try {
      return await storage.getItem(CONSTANT_KEYS.DEFAULT_ACCOUNT_NAME);
    } catch (e) {
      console.error("Error while getting default account index, fallback index to 0");
    }
    return null;
  }

  static async createAccount(accountName?: string, wallet?: any, initShardID?: any) {
    try {
      new Validator("createAccount-accountName", accountName).string().required();
      new Validator("createAccount-wallet", wallet).required().object();
      new Validator("createAccount-initShardID", initShardID).number();
      const server = await Server.getDefault();
      if (server.id === "testnode") {
        let lastByte = null;
        let newAccount;
        while (lastByte !== 0) {
          newAccount = await wallet.createAccount(accountName, 0, wallet.deletedAccountIds || []);
          const childKey = newAccount.key;
          lastByte = childKey.KeySet.PaymentAddress.Pk[childKey.KeySet.PaymentAddress.Pk.length - 1];
        }
        wallet.MasterAccount.child.push(newAccount);
        await WalletServices.saveWallet(wallet);
        return newAccount;
      }
      let shardID = _.isNumber(initShardID) ? initShardID : undefined;
      if (shardID && parseInt(shardID.toString()) < 0) {
        shardID = 0;
      }
      const account = await wallet.createNewAccount(accountName, shardID, wallet.deletedAccountIds || []);
      if (account) {
        await WalletServices.saveWallet(wallet);
      }
      return account;
    } catch (error) {
      throw error;
    }
  }

  static saveDefaultAccountToStorage(accountName: any) {
    return storage.setItem(CONSTANT_KEYS.DEFAULT_ACCOUNT_NAME, accountName);
  }

  static async importAccount(privakeyStr: any, accountName: any, passPhrase: any, wallet: any) {
    new Validator("privakeyStr", privakeyStr).string().required();
    new Validator("accountName", accountName).string().required();
    new Validator("passPhrase", passPhrase).string();
    new Validator("wallet", wallet).required();
    let imported = false;
    try {
      const account = await wallet.importAccount(privakeyStr, accountName, passPhrase);
      imported = !!account.isImport;
      if (imported) {
        await WalletServices.saveWallet(wallet);
      }
    } catch (e) {
      throw e;
    }
    return imported;
  }

  static async removeAccount(privateKeyStr: any, passPhrase: any, wallet: any) {
    try {
      const removed = await wallet.removeAccount(privateKeyStr, passPhrase);
      if (removed) {
        await WalletServices.saveWallet(wallet);
      }
    } catch (error) {
      throw error;
    }
  }

  static async createAndSendNativeToken({
    accountSender,
    prvPayments,
    info,
    fee,
    metadata,
    isEncryptMessage = true,
    txType,
    txHandler,
    txHashHandler,
    version,
  }: any = {}) {
    try {
      new Validator("createAndSendNativeToken-account", accountSender).required();
      new Validator("createAndSendNativeToken-prvPayments", prvPayments).required().paymentInfoList();
      new Validator("createAndSendNativeToken-fee", fee).required().amount();
      new Validator("createAndSendNativeToken-info", info).string();
      new Validator("createAndSendNativeToken-isEncryptMessage", isEncryptMessage).boolean();
      new Validator("createAndSendNativeToken-metadata", metadata).object();
      new Validator("createAndSendNativeToken-txType", txType).required().number();
      new Validator("createAndSendNativeToken-version", version).required().number();
      // await accountWallet.resetProgressTx();
      const infoStr = typeof info !== "string" ? JSON.stringify(info) : info || "";
      const result = await accountSender.createAndSendNativeToken({
        transfer: {
          info: infoStr,
          prvPayments,
          fee,
        },
        extra: {
          metadata,
          isEncryptMessage,
          txType,
          txHandler,
          txHashHandler,
          version,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async createAndSendPrivacyToken({
    accountSender,
    prvPayments,
    tokenPayments,
    info,
    fee,
    tokenID,
    metadata,
    isEncryptMessage = true,
    isEncryptMessageToken = true,
    txType,
    txHandler,
    txHashHandler,
    version,
  }: any = {}) {
    new Validator("createAndSendPrivacyToken-accountSender", accountSender).required();
    new Validator("createAndSendPrivacyToken-prvPayments", prvPayments).paymentInfoList();
    new Validator("createAndSendPrivacyToken-tokenPayments", tokenPayments).required().paymentInfoList();
    new Validator("createAndSendPrivacyToken-fee", fee).required().amount();
    new Validator("createAndSendPrivacyToken-info", info).string();
    new Validator("createAndSendPrivacyToken-tokenID", tokenID).string().required();
    new Validator("createAndSendPrivacyToken-metadata", metadata).object();
    new Validator("createAndSendPrivacyToken-isEncryptMessage", isEncryptMessage).boolean();
    new Validator("createAndSendPrivacyToken-isEncryptMessageToken", isEncryptMessageToken).boolean();
    new Validator("createAndSendPrivacyToken-txType", txType).required().number();
    new Validator("createAndSendPrivacyToken-version", version).required().number();

    let result;
    const infoStr = typeof info !== "string" ? JSON.stringify(info) : info;
    result = await accountSender.createAndSendPrivacyToken({
      transfer: {
        info: infoStr,
        prvPayments,
        tokenPayments,
        fee,
        tokenID,
      },
      extra: {
        metadata,
        isEncryptMessage,
        isEncryptMessageToken,
        txType,
        txHandler,
        txHashHandler,
        version,
      },
    });
    return result;
  }

  static async createAndSendBurnUnifiedTokenRequestTx({
    accountSender,
    fee,
    tokenId,
    burningInfos,
    prvPayments,
    tokenPayments,
    info,
    txHashHandler,
    version,
  }: any = {}) {
    new Validator("createBurningRequestForUnifiedToken-accountSender", accountSender).required();
    new Validator("createBurningRequestForUnifiedToken-fee", fee).required().amount();
    new Validator("createBurningRequestForUnifiedToken-tokenId", tokenId).required().string();
    new Validator("createBurningRequestForUnifiedToken-prvPayments", prvPayments).required().array();
    new Validator("createBurningRequestForUnifiedToken-tokenPayments", tokenPayments).required().array();
    new Validator("createBurningRequestForUnifiedToken-info", info).string();
    new Validator("createBurningRequestForUnifiedToken-burningInfos", burningInfos).required().array();
    console.log("BURN DATA ", {
      transfer: {
        fee,
        tokenID: tokenId,
        prvPayments,
        tokenPayments,
        info,
      },
      extra: {
        burningInfos,
        txHashHandler,
        version,
      },
    });
    return accountSender.createAndSendBurnUnifiedTokenRequestTx({
      transfer: {
        fee,
        tokenID: tokenId,
        prvPayments,
        tokenPayments,
        info,
      },
      extra: {
        burningInfos,
        txHashHandler,
        version,
      },
    });
  }

  static async createAndSendTradeRequestTx({
    account,
    wallet,
    fee,
    tokenIDToBuy = PRVIDSTR,
    tokenIDToSell = PRVIDSTR,
    sellAmount,
    minAcceptableAmount,
    tradingFee,
    version = PrivacyVersion.ver2,
  }: any = {}) {
    new Validator("createAndSendTradeRequestTx-wallet", wallet).required();
    new Validator("createAndSendTradeRequestTx-account", account).required();
    new Validator("createAndSendTradeRequestTx-tokenIDToBuy", tokenIDToBuy).required().string();
    new Validator("createAndSendTradeRequestTx-tokenIDToSell", tokenIDToSell).required().string();
    new Validator("createAndSendTradeRequestTx-sellAmount", sellAmount).required().amount();
    new Validator("createAndSendTradeRequestTx-minAcceptableAmount", minAcceptableAmount).required().amount();
    new Validator("tradingFee", tradingFee).required().amount();
    new Validator("fee", fee).required().amount();
    new Validator("createAndSendTradeRequestTx-version", version).required().number();
    let result;
    const accountWallet = this.getAccount(account, wallet);
    await accountWallet.resetProgressTx();
    result = await accountWallet.createAndSendTradeRequestTx({
      transfer: {
        fee,
      },
      extra: {
        tokenIDToBuy,
        tokenIDToSell,
        sellAmount,
        minAcceptableAmount,
        tradingFee,
        version,
      },
    });
    return result;
  }

  static async getProgressTx(defaultAccount: any, wallet: any) {
    new Validator("defaultAccount", defaultAccount).required();
    new Validator("wallet", wallet).required();
    const account = this.getAccount(defaultAccount, wallet);
    return account.getProgressTx();
  }

  static async resetProgressTx(defaultAccount: any, wallet: any) {
    new Validator("defaultAccount", defaultAccount).required();
    new Validator("wallet", wallet).required();
    const account = this.getAccount(defaultAccount, wallet);
    return account.resetProgressTx();
  }

  static async getDebugMessage(defaultAccount: any, wallet: any) {
    new Validator("defaultAccount", defaultAccount).required();
    new Validator("wallet", wallet).required();
    const account = this.getAccount(defaultAccount, wallet);
    return account.getDebugMessage();
  }

  static checkOldPaymentAddress(paymentAddrStr: any) {
    return isOldPaymentAddress(paymentAddrStr);
  }

  static checkPaymentAddress(paymentAddrStr: any) {
    return isPaymentAddress(paymentAddrStr);
  }

  static validatePrivateKey(privateKey: any) {
    try {
      const keyWallet = KeyWallet.base58CheckDeserialize(privateKey);
      return !!keyWallet;
    } catch (e) {
      return false;
    }
  }

  static parseShard(account: any) {
    const bytes = account.PublicKeyBytes;
    const arr = bytes.split(",");
    const lastByte = arr[arr.length - 1];
    return lastByte % 8;
  }

  static async getFollowingTokens(account: any, wallet: any) {
    try {
      new Validator("getFollowingTokens-account", account).object().required();
      new Validator("getFollowingTokens-wallet", wallet).object().required();
      const accountWallet = this.getAccount(account, wallet);
      let list = await accountWallet.getListFollowingTokens();
      list = list.map((tokenID: string) => ({
        id: tokenID,
        amount: 0,
        loading: false,
      }));
      return list;
    } catch (error) {
      console.log("getFollowingTokens error", error);
      throw error;
    }
  }

  static async addFollowingTokens({ tokens, accountSender }: { accountSender: any; tokens: any[] }) {
    try {
      new Validator("addFollowingTokens-accountSender", accountSender).required();
      new Validator("addFollowingTokens-tokens", tokens).required().array();
      const tokenIDs = tokens.map((token: any) => token?.tokenID).filter((tokenID: string) => !!tokenID);
      await accountSender.addListFollowingToken({ tokenIDs });
    } catch (error) {
      console.log("addFollowingTokens error", error);
      throw error;
    }
  }

  static async removeFollowingToken(tokenID: any, account: any, wallet: any) {
    try {
      new Validator("removeFollowingToken-account", account).required();
      new Validator("removeFollowingToken-wallet", wallet).required();
      new Validator("removeFollowingToken-tokenID", tokenID).required().string();
      const accountWallet = this.getAccount(account, wallet);
      await accountWallet.removeFollowingToken({ tokenID });
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {string} tokenID
   * @param paymentAddrStr
   * @param {bool} isGetAll
   * @returns {object}
   */
  static async getRewardAmount(tokenID: any, paymentAddrStr: any, isGetAll = false) {
    if (_.isEmpty(paymentAddrStr))
      throw new CustomError(ErrorCode.payment_address_empty, {
        name: "payment address is empty",
      });
    return await AccountWallet?.getRewardAmount(paymentAddrStr, isGetAll, tokenID);
  }

  /**
   *
   * @param {object} accountWallet
   */
  static toSerializedAccountObj(accountWallet: any) {
    return accountWallet.toSerializedAccountObj();
  }

  /**
   *
   * @param {object} account
   * @param {object} wallet
   */
  // stakerStatus returns -1 if account haven't staked,
  // returns 0 if account is a candidator and
  // returns 1 if account is a validator
  static stakerStatus(account: any, wallet: any) {
    const accountWallet = wallet.getAccountByName(account?.name);
    return accountWallet.stakerStatus();
  }

  /**
   *
   * @param {string} blsKey
   * @param {object} wallet
   * @returns :AccountModel: template
   */
  static async getAccountWithBLSPubKey(blsKey: any, wallet: any) {
    try {
      let accountWallet = null;
      if (!_.isEmpty(blsKey)) {
        console.log(TAG, "getAccountWithBLSPubKey begin");
        const listAccounts = (await WalletServices.loadListAccountWithBLSPubKey(wallet)) || [];
        console.log(TAG, "getAccountWithBLSPubKey listAccount ", listAccounts);
        let account = listAccounts.find((item: any) => _.isEqual(item.BLSPublicKey, blsKey));

        account = account ? await wallet.getAccountByName(account.AccountName) : null;
        console.log(TAG, "getAccountWithBLSPubKey end ---- ", account);
        // accountWallet = account? new AccountModel(account):null;
        accountWallet = account;
      }
      return accountWallet;
    } catch (e) {
      console.warn(TAG, "getAccountWithBLSPubKey error =", e);
    }
    return null;
  }

  /**
   *
   * @param {string} blsKey
   * @param {object} wallet
   * @returns :AccountModel: template
   */
  static async getFullDataOfAccount(accountName: any, wallet: any) {
    try {
      let accountWallet = null;
      if (!_.isEmpty(accountName)) {
        console.log(TAG, "getFullDataOfAccount begin");
        const listAccounts = (await WalletServices.loadListAccountWithBLSPubKey(wallet)) || [];
        console.log(TAG, "getFullDataOfAccount listAccount ", listAccounts);
        let account = listAccounts.find((item: any) => _.isEqual(item.AccountName, accountName));

        let accountTemp = account ? await wallet.getAccountByName(account.AccountName) : null;
        console.log(TAG, "getFullDataOfAccount end ---- ", account);
        // accountWallet = account? new AccountModel(account):null;
        accountWallet = accountTemp ? new AccountModel({ ...accountTemp, ...account }) : null;
      }
      return accountWallet;
    } catch (e) {
      console.warn(TAG, "getFullDataOfAccount error =", e);
    }
    return null;
  }

  static async createAndSendTxWithNativeTokenContribution(
    wallet: any,
    account: any,
    fee: any,
    pdeContributionPairID: any,
    contributedAmount: any,
    info = "",
  ) {
    let result;
    const accountWallet = this.getAccount(account, wallet);
    try {
      result = await accountWallet.createAndSendTxWithNativeTokenContribution(
        fee,
        pdeContributionPairID,
        contributedAmount,
        info,
      );
    } catch (e) {
      throw e;
    }
    return result;
  }

  static async createAndSendPTokenContributionTx(
    wallet: any,
    account: any,
    tokenParam: any,
    feeNativeToken: any,
    feePToken: any,
    pdeContributionPairID: any,
    contributedAmount: any,
  ) {
    let result;
    const accountWallet = this.getAccount(account, wallet);
    try {
      result = await accountWallet.createAndSendPTokenContributionTx(
        tokenParam,
        feeNativeToken,
        feePToken,
        pdeContributionPairID,
        contributedAmount,
      );
    } catch (e) {
      throw e;
    }
    return result;
  }

  static async createAndSendWithdrawDexTx(
    wallet: any,
    account: any,
    fee: any,
    withdrawalToken1IDStr: any,
    withdrawalToken2IDStr: any,
    withdrawalShareAmt: any,
    info = "",
  ) {
    let result;
    const accountWallet = this.getAccount(account, wallet);
    try {
      result = await accountWallet.createAndSendWithdrawDexTx(
        fee,
        withdrawalToken1IDStr,
        withdrawalToken2IDStr,
        withdrawalShareAmt,
        info,
      );
    } catch (e) {
      throw e;
    }
    return result;
  }

  static isNotEnoughCoinErrorCode(error: any) {
    return error.code === "WEB_JS_ERROR(-5)";
  }

  static isPendingTx(error: any) {
    return error.stackTrace.includes(STACK_TRACE.REPLACEMENT);
  }

  static getAccountName(account?: any) {
    new Validator("account", account).object().required();
    return getAccountNameByAccount(account);
  }

  static getPaymentAddress(account: any) {
    if (account) {
      return account.PaymentAddress || account.paymentAddress;
    }

    return "";
  }

  static getUTXOs(wallet: any, account: any, coinId: any) {
    if (!wallet || !account) {
      return 0;
    }
    const accountWallet = this.getAccount(account, wallet);
    return (accountWallet?.coinUTXOs && accountWallet?.coinUTXOs[coinId || COINS.PRV_ID]) || 0;
  }

  static getMaxInputPerTx() {
    return constants.MAX_INPUT_PER_TX;
  }

  static hasExceededMaxInput(wallet: any, account: any, coinId: any) {
    const noOfUTXOs = this.getUTXOs(wallet, account, coinId);
    return noOfUTXOs > this.getMaxInputPerTx();
  }

  /**
   * Create multiple tx to defragment all utxo in account
   * @param {number} fee
   * @param {boolean} isPrivacy
   * @param {object} account
   * @param {object} wallet
   * @param {number} noOfTxs
   * @returns {Promise<*>}
   */
  static async defragmentNativeCoin(
    fee: any,
    isPrivacy: any,
    account: any,
    wallet: any,
    noOfTxs = this.MAX_DEFRAGMENT_TXS,
  ) {
    if (!wallet) {
      throw new Error("Missing wallet");
    }
    if (!account) {
      throw new Error("Missing account");
    }
    const accountWallet = this.getAccount(account, wallet);
    const result = await accountWallet.defragmentNativeCoin(
      fee,
      isPrivacy,
      this.NO_OF_INPUT_PER_DEFRAGMENT_TX,
      noOfTxs,
    );
    await Wallet.resetProgressTx();
    return result;
  }

  static getAccount(defaultAccount: any, wallet: any) {
    try {
      new Validator("getAccount-defaultAccount", defaultAccount).object().required();
      new Validator("getAccount-wallet", wallet).object().required();
      const account = getAccountWallet(defaultAccount, wallet);
      new Validator("getAccount-account", account).object().required();
      if (!account?.name) {
        throw new Error("Can not get account wallet!");
      } else {
        return account;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getListAccountSpentCoins(defaultAccount: any, wallet: any, tokenID: any) {
    try {
      if (!wallet) {
        throw new Error("Missing wallet");
      }
      if (!defaultAccount) {
        throw new Error("Missing account");
      }
      let tokenId = tokenID || PRV_ID;
      const account = this.getAccount(defaultAccount, wallet);
      const spentCoins = await account.getListSpentCoinsStorage(tokenId);
      return spentCoins || [];
    } catch (error) {
      throw error;
    }
  }

  static async removeCacheBalance(defaultAccount: any, wallet: any, version = PrivacyVersion.ver2) {
    try {
      new Validator("wallet", wallet).object();
      new Validator("defaultAccount", defaultAccount).object();
      const account = this.getAccount(defaultAccount, wallet);
      if (account) {
        const keyInfo = (await account.getKeyInfo({ version })) || {};
        const otaKey = account.getOTAKey();
        const followedDefaultTokensKey = account.getKeyFollowedDefaultTokens();
        let task = [
          account.removeStorageCoinsV1(),
          account.clearAccountStorage(otaKey),
          account.clearAccountStorage(followedDefaultTokensKey),
        ];
        clearAllCaches();
        if (keyInfo.nftindex) {
          task = task.concat(
            Object.keys(keyInfo.nftindex).map((tokenID) => {
              const params = {
                tokenID,
                version,
              };
              return account.clearCacheStorage(params);
            }),
          );
        }
        if (keyInfo?.coinindex) {
          task = task.concat(
            Object.keys(keyInfo.coinindex).map((tokenID) => {
              const params = {
                tokenID,
                version,
              };
              return account.clearCacheStorage(params);
            }),
          );
          task = task.concat(
            Object.keys(keyInfo.coinindex).map((tokenID) => {
              const params = {
                tokenID,
                version,
              };
              return account.getKeyTxHistoryByTokenId(params);
            }),
          );
        }
        await Promise.all(task);
      }
    } catch (error) {
      new ExHandler(error).showErrorToast();
    }
  }

  static async getStakingAmount(defaultAccount: any, wallet: any, type: any) {
    try {
      new Validator("defaultAccount", defaultAccount).required();
      new Validator("wallet", wallet).required();
      new Validator("type", type).required().number();
      const account = this.getAccount(defaultAccount, wallet);
      return account.rpc.getStakingAmount(type);
    } catch (error) {
      throw error;
    }
  }

  /**
   * createAndSendStakingTx
   * @param {object} account
   * @param {object} wallet
   * @param {number} fee
   * @param {number} version
   */
  static async createAndSendStakingTx({ account, wallet, fee, version = PrivacyVersion.ver2 }: any = {}) {
    try {
      new Validator("createAndSendStakingTx-account", account).required();
      new Validator("createAndSendStakingTx-wallet", wallet).required();
      new Validator("createAndSendStakingTx-fee", fee).required().amount();
      new Validator("createAndSendStakingTx-version", version).required().number();
      const accountWallet = this.getAccount(account, wallet);
      return accountWallet.createAndSendStakingTx({
        transfer: { fee },
        extra: { version },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * createAndSendStopAutoStakingTx
   * @param {object} account
   * @param {object} wallet
   * @param {number} fee
   * @param {number} version
   */
  static async createAndSendStopAutoStakingTx({ account, wallet, fee, version = PrivacyVersion.ver2 }: any = {}) {
    try {
      new Validator("createAndSendStopAutoStakingTx-account", account).required();
      new Validator("createAndSendStopAutoStakingTx-wallet", wallet).required();
      new Validator("createAndSendStopAutoStakingTx-fee", fee).required().amount();
      new Validator("createAndSendStopAutoStakingTx-version", version).required().number();
      const accountWallet = this.getAccount(account, wallet);
      return accountWallet.createAndSendStopAutoStakingTx({
        transfer: { fee },
        extra: { version },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * createAndSendWithdrawRewardTx
   * @param {string} tokenID
   * @param {object} account
   * @param {object} wallet
   * @param {number} fee
   * @param {number} version
   */
  static async createAndSendWithdrawRewardTx({
    account,
    wallet,
    fee,
    tokenID = PRVIDSTR,
    version = PrivacyVersion.ver2,
  }: any = {}) {
    new Validator("createAndSendWithdrawRewardTx-defaultAccount", account).required();
    new Validator("createAndSendWithdrawRewardTx-wallet", wallet).required();
    new Validator("createAndSendWithdrawRewardTx-fee", fee).required().amount();
    new Validator("createAndSendWithdrawRewardTx-tokenID", tokenID).required().string();
    const accountWallet = this.getAccount(account, wallet);
    return accountWallet.createAndSendWithdrawRewardTx({
      transfer: { fee, tokenID },
      extra: { version },
    });
  }

  static async getUnspentCoinsV1({ account, wallet, fromApi = true }: any = {}) {
    new Validator("wallet", wallet).required();
    new Validator("account", account).required();
    new Validator("fromApi", fromApi).required().boolean();
    let accountWallet = cloneDeep(this.getAccount(account, wallet));
    const listCoins = (await accountWallet.getUnspentCoinsV1()) || [];
    return listCoins.map((coin: any) => ({
      ...coin,
      balance: new BigNumber(coin.balance || 0).toNumber(),
    }));
  }

  static async getPDexHistories({ account, wallet, offset, limit, oldHistories }: any) {
    new Validator("wallet", wallet).required();
    new Validator("account", account).required();
    new Validator("offset", offset).required().number();
    new Validator("limit", limit).required().number();
    new Validator("oldHistories", oldHistories).required().array();
    const accountWallet = await this.getAccount(account, wallet);
    return await accountWallet.getPDexHistories({
      offset,
      limit,
      oldHistories,
    });
  }

  /**
   * Sign staking pool withdraw
   * @param {object} account
   * @param {object} wallet
   * @param {number} amount
   * @returns {Promise<string>} signatureEncode
   */
  static async signPoolWithdraw({ account, wallet, amount }: any) {
    new Validator("account", account).required();
    new Validator("wallet", wallet).required();
    new Validator("amount", amount).required();
    const accountWallet = await this.getAccount(account, wallet);
    return await accountWallet.signPoolWithdraw({ amount: amount.toString() });
  }

  static async createSendInitPToken({
    wallet,
    account,
    fee,
    info,
    tokenName,
    tokenSymbol,
    tokenAmount,
    version = PrivacyVersion.ver2,
  }: any = {}) {
    new Validator("createSendInitPToken-account", account).required();
    new Validator("createSendInitPToken-wallet", wallet).required();
    new Validator("createSendInitPToken-fee", fee).required().number();
    new Validator("createSendInitPToken-info", info).string();
    new Validator("createSendInitPToken-tokenName", tokenName).required().string();
    new Validator("createSendInitPToken-tokenSymbol", tokenSymbol).required().string();
    new Validator("createSendInitPToken-tokenAmount", tokenAmount).required().string();
    new Validator("createSendInitPToken-version", version).required().number();
    let response;
    try {
      const accountWallet = getAccountWallet(account, wallet);
      response = await accountWallet.createAndSendInitTokenTx({
        transfer: {
          fee,
          info,
          tokenPayments: [{ Amount: tokenAmount, PaymentAddress: account.PaymentAddress }],
        },
        extra: {
          tokenName,
          tokenSymbol,
          version,
        },
      });
    } catch (e) {
      throw e;
    }
    return response;
  }

  static async getTxsTransactor({ wallet, account, tokenID }: any = {}) {
    new Validator("account", account).required().object();
    new Validator("wallet", wallet).required().object();
    new Validator("tokenID", tokenID).required().string();
    const accountWallet = getAccountWallet(account, wallet);
    return accountWallet.getTxsTransactor({ tokenID });
  }

  static async getTxsTransactorFromStorage({ wallet, account, tokenID }: any = {}) {
    new Validator("account", account).required().object();
    new Validator("wallet", wallet).required().object();
    new Validator("tokenID", tokenID).required().string();
    const accountWallet = getAccountWallet(account, wallet);
    return accountWallet.getTxsTransactorFromStorage({ tokenID });
  }

  static async createBurningRequest({
    accountSender,
    fee,
    tokenId,
    burnAmount,
    prvPayments,
    tokenPayments,
    info,
    remoteAddress,
    txHashHandler,
    burningType,
    version = PrivacyVersion.ver2,
  }: any = {}) {
    new Validator("createBurningRequest-accountSender", accountSender).required();
    new Validator("createBurningRequest-fee", fee).required().amount();
    new Validator("createBurningRequest-tokenId", tokenId).required().string();
    new Validator("createBurningRequest-burnAmount", burnAmount).required().amount();
    new Validator("createBurningRequest-prvPayments", prvPayments).required().array();
    new Validator("createBurningRequest-tokenPayments", tokenPayments).required().array();
    new Validator("createBurningRequest-remoteAddress", remoteAddress).required().string();
    new Validator("createBurningRequest-info", info).string();
    new Validator("createBurningRequest-burningType", burningType).required().number();

    return accountSender.createAndSendBurningRequestTx({
      transfer: {
        fee,
        tokenID: tokenId,
        prvPayments,
        tokenPayments,
        info,
      },
      extra: {
        remoteAddress,
        burnAmount,
        txHashHandler,
        burningType,
        version,
      },
    });
  }

  static async createBurningPegPRVRequest({
    wallet,
    account,
    fee,
    tokenId,
    burnAmount,
    prvPayments,
    info,
    remoteAddress,
    txHashHandler,
    burningType,
    version = PrivacyVersion.ver2,
  }: any = {}) {
    new Validator("account", account).required();
    new Validator("wallet", wallet).required();
    new Validator("fee", fee).required().amount();
    new Validator("tokenId", tokenId).required().string();
    new Validator("burnAmount", burnAmount).required().amount();
    new Validator("prvPayments", prvPayments).required().array();
    new Validator("remoteAddress", remoteAddress).required().string();
    new Validator("info", info).string();
    new Validator("burningType", burningType).required().number();

    const accountWallet = getAccountWallet(account, wallet);
    return accountWallet.createAndSendBurningPegPRVRequestTx({
      transfer: {
        fee,
        tokenID: tokenId,
        prvPayments,
        info,
      },
      extra: {
        remoteAddress,
        burnAmount,
        txHashHandler,
        burningType,
        version,
      },
    });
  }

  static async createPortalUnshieldRequest({
    wallet,
    account,
    fee,
    tokenId,
    unshieldAmount,
    prvPayments,
    info,
    remoteAddress,
    txHashHandler,
    burningType,
    version = PrivacyVersion.ver2,
  }: any = {}) {
    new Validator("account", account).required();
    new Validator("wallet", wallet).required();
    new Validator("fee", fee).required().amount();
    new Validator("tokenId", tokenId).required().string();
    new Validator("unshieldAmount", unshieldAmount).required().amount();
    new Validator("prvPayments", prvPayments).required().array();
    new Validator("remoteAddress", remoteAddress).required().string();
    new Validator("info", info).string();
    new Validator("burningType", burningType).required().number();

    const accountWallet = getAccountWallet(account, wallet);
    return accountWallet.createAndSendUnshieldPortalV4RequestTx({
      transfer: {
        fee,
        tokenID: tokenId,
        prvPayments,
        info,
      },
      extra: {
        remoteAddress,
        unshieldAmount,
        txHashHandler,
        burningType,
        version,
      },
    });
  }

  static async getSignPublicKeyEncode({ account, wallet }: any) {
    try {
      new Validator("getSignPublicKeyEncode-account", account).required();
      new Validator("getSignPublicKeyEncode-wallet", wallet).required();
      const accountWallet = getAccountWallet(account, wallet);
      return accountWallet.getSignPublicKeyEncode();
    } catch (error) {
      throw error;
    }
  }

  static async getPairs({ account, wallet }: any) {
    new Validator("account", account).required();
    new Validator("wallet", wallet).required();
    const accountWallet = getAccountWallet(account, wallet);
    return accountWallet.getPairs();
  }

  static async createAndSendTxsWithContributions({
    account,
    wallet,
    tokenID1,
    tokenID2,
    symbol1,
    symbol2,
    contributedAmount1,
    contributedAmount2,
    fee,
    version = PrivacyVersion.ver2,
  }: any = {}) {
    new Validator("createAndSendTxWithContribution-account", account).required();
    new Validator("createAndSendTxWithContribution-wallet", wallet).required();
    new Validator("createAndSendTxWithContribution-tokenID1", tokenID1).required().string();
    new Validator("createAndSendTxWithContribution-tokenID2", tokenID2).required().string();
    new Validator("createAndSendTxWithContribution-symbol1", symbol1).required().string();
    new Validator("createAndSendTxWithContribution-symbol2", symbol2).required().string();
    new Validator("createAndSendTxWithContribution-contributedAmount1", contributedAmount1).required().amount();
    new Validator("createAndSendTxWithContribution-contributedAmount2", contributedAmount2).required().amount();
    new Validator("createAndSendTxWithContribution-fee", fee).amount();
    new Validator("createAndSendTxWithContribution-version", version).required().number();
    const accountWallet = getAccountWallet(account, wallet);
    await accountWallet.createAndSendTxsWithContributions({
      tokenID1,
      tokenID2,
      symbol1,
      symbol2,
      contributedAmount1,
      contributedAmount2,
      fee,
      version,
    });
  }

  static async createAndSendTxWithRetryContribution({
    account,
    wallet,
    tokenID,
    amount,
    pairID,
    fee,
    version = PrivacyVersion.ver2,
  }: any = {}) {
    new Validator("createAndSendTxWithRetryContribution-account", account).required();
    new Validator("createAndSendTxWithRetryContribution-wallet", wallet).required();
    new Validator("createAndSendTxWithRetryContribution-amount", amount).required().amount();
    new Validator("createAndSendTxWithRetryContribution-tokenID", tokenID).required().string();
    new Validator("createAndSendTxWithRetryContribution-pairID", pairID).required().string();
    new Validator("createAndSendTxWithRetryContribution-fee", fee).amount();
    new Validator("createAndSendTxWithRetryContribution-version", version).required().number();

    const accountWallet = getAccountWallet(account, wallet);

    const res = await accountWallet.createAndSendTxWithContribution({
      transfer: {
        fee,
        tokenID: tokenID,
      },
      extra: { pairID, contributedAmount: amount, version },
    });
    console.debug(res);
    return res;
  }

  static async createAndSendWithdrawContributionTx({
    account,
    wallet,
    tokenID1,
    tokenID2,
    withdrawalShareAmt,
    fee,
    version = PrivacyVersion.ver2,
    amount1,
    amount2,
  }: any = {}) {
    new Validator("createAndSendWithdrawContributionTx-account", account).required();
    new Validator("createAndSendWithdrawContributionTx-wallet", wallet).required();
    new Validator("createAndSendWithdrawContributionTx-tokenID1", tokenID1).required().string();
    new Validator("createAndSendWithdrawContributionTx-tokenID2", tokenID2).required().string();
    new Validator("createAndSendWithdrawContributionTx-withdrawalShareAmt", withdrawalShareAmt).required().amount();
    new Validator("createAndSendWithdrawContributionTx-fee", fee).amount();
    new Validator("createAndSendWithdrawContributionTx-version", version).required().number();
    new Validator("createAndSendWithdrawContributionTx-amount1", amount1).required().amount();
    new Validator("createAndSendWithdrawContributionTx-amount1", amount1).required().amount();

    const accountWallet = getAccountWallet(account, wallet);
    let response = await accountWallet.createAndSendWithdrawContributionTx({
      transfer: {
        fee,
      },
      extra: {
        withdrawalToken1IDStr: tokenID1,
        withdrawalToken2IDStr: tokenID2,
        withdrawalShareAmt,
        withdrawalAmount1: amount1,
        withdrawalAmount2: amount2,
        version,
      },
    });
    console.log(response);
  }

  static async createAndSendWithdrawContributionFeeTx({
    account,
    wallet,
    tokenID1,
    tokenID2,
    withdrawalFeeAmt,
    fee,
    version = PrivacyVersion.ver2,
  }: any = {}) {
    new Validator("createAndSendWithdrawContributionFeeTx-account", account).required();
    new Validator("createAndSendWithdrawContributionFeeTx-wallet", wallet).required();
    new Validator("createAndSendWithdrawContributionFeeTx-tokenID1", tokenID1).required().string();
    new Validator("createAndSendWithdrawContributionFeeTx-tokenID2", tokenID2).required().string();
    new Validator("createAndSendWithdrawContributionFeeTx-withdrawalFeeAmt", withdrawalFeeAmt).required().amount();
    new Validator("createAndSendWithdrawContributionFeeTx-fee", fee).amount();
    new Validator("createAndSendWithdrawContributionFeeTx-version", version).required().number();

    const accountWallet = getAccountWallet(account, wallet);
    let response = await accountWallet.createAndSendWithdrawContributionFeeTx({
      transfer: {
        fee,
      },
      extra: {
        withdrawalToken1IDStr: tokenID1,
        withdrawalToken2IDStr: tokenID2,
        withdrawalFeeAmt,
        version,
      },
    });
    console.log(response);
  }

  static async getContributeHistories({ account, wallet, offset, limit, oldApiHistories }: any) {
    new Validator("getContributeHistories-account", account).required();
    new Validator("getContributeHistories-wallet", wallet).required();
    new Validator("getContributeHistories-wallet", wallet).required();
    new Validator("getContributeHistories-offset", offset).required().number();
    new Validator("getContributeHistories-limit", limit).required().number();
    new Validator("getContributeHistories-oldApiHistories", oldApiHistories).required().array();
    const accountWallet = getAccountWallet(account, wallet);
    return accountWallet.getContributeHistoriesWithStorage({
      offset,
      limit,
      oldApiHistories,
    });
  }

  static async getWithdrawLiquidityHistories({ account, wallet, offset, limit }: any) {
    new Validator("getWithdrawLiquidityHistories-account", account).required();
    new Validator("getWithdrawLiquidityHistories-wallet", wallet).required();
    new Validator("getWithdrawLiquidityHistories-wallet", wallet).required();
    new Validator("getWithdrawLiquidityHistories-offset", offset).required().number();
    new Validator("getWithdrawLiquidityHistories-limit", limit).required().number();
    const accountWallet = getAccountWallet(account, wallet);
    return accountWallet.getLiquidityWithdrawHistoriesWithStorage({
      offset,
      limit,
    });
  }

  static async getWithdrawLiquidityFeeHistories({ account, wallet, offset, limit }: any) {
    new Validator("getWithdrawLiquidityFeeHistories-account", account).required();
    new Validator("getWithdrawLiquidityFeeHistories-wallet", wallet).required();
    new Validator("getWithdrawLiquidityFeeHistories-wallet", wallet).required();
    new Validator("getWithdrawLiquidityFeeHistories-offset", offset).required().number();
    new Validator("getWithdrawLiquidityFeeHistories-limit", limit).required().number();
    const accountWallet = getAccountWallet(account, wallet);
    return accountWallet.getLiquidityWithdrawFeeHistoriesWithStorage({
      offset,
      limit,
    });
  }

  static async removeTxHistoryByTxIDs({ account, wallet, txIDs, tokenIDs, version = PrivacyVersion.ver2 }: any = {}) {
    new Validator("removeTxHistoryByTxIDs-account", account).required();
    new Validator("removeTxHistoryByTxIDs-wallet", txIDs).required();
    new Validator("removeTxHistoryByTxIDs-wallet", tokenIDs).required().string();
    new Validator("removeTxHistoryByTxIDs-offset", version).required().number();
    const accountWallet = getAccountWallet(account, wallet);
    return accountWallet.removeTxHistoryByTxIDs({ txIDs, tokenIDs, version });
  }
}
