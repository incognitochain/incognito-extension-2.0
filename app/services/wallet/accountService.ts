/* eslint-disable no-useless-catch */
// import { STACK_TRACE } from "@services/exception/customError/code/webjsCode";
import Server from "@services/wallet/Server";
import _ from "lodash";
// import { getPDexV3Instance } from "@screens/PDexV3";
// import { delay } from "@src/utils/delay";
// import { v4 } from "uuid";
// import random from "lodash/random";
// import { CustomError, ErrorCode, ExHandler } from "../exception";
import { saveWallet } from "./walletService";
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
} = require("incognito-chain-web-js/build/wallet");

const TAG = "Account";

export default class Account {
  static NO_OF_INPUT_PER_DEFRAGMENT_TX = 10;
  static MAX_DEFRAGMENT_TXS = 3;
  static NO_OF_INPUT_PER_DEFRAGMENT =
    Account.NO_OF_INPUT_PER_DEFRAGMENT_TX * Account.MAX_DEFRAGMENT_TXS;

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
          lastByte =
            childKey.KeySet.PaymentAddress.Pk[childKey.KeySet.PaymentAddress.Pk.length - 1];
        }
        wallet.MasterAccount.child.push(newAccount);
        await saveWallet(wallet);
        return newAccount;
      }
      let shardID = _.isNumber(initShardID) ? initShardID : undefined;
      if (shardID && parseInt(shardID.toString()) < 0) {
        shardID = 0;
      }
      const account = await wallet.createNewAccount(
        accountName,
        shardID,
        wallet.deletedAccountIds || [],
      );
      if (account) {
        await saveWallet(wallet);
      }
      return account;
    } catch (error) {
      throw error;
    }
  }
}
