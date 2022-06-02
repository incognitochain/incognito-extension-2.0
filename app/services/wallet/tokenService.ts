import Account from "@/model/AccountModel";
import { PRIORITY_LIST } from "@constants/dexV2";
import CONSTANT_KEYS from "@constants/keys";
import { getTokenInfo } from "@services/api/token";
import storage from "@services/storage";
import { getAccountWallet } from "@services/wallet/wallet.shared";
import { updateStatusHistory } from "@services/wallet/walletService";
import _ from "lodash";
const { Wallet, Validator } = require("incognito-chain-web-js/build/web/wallet");

export const PRV = {
  id: "0000000000000000000000000000000000000000000000000000000000000004",
  name: "Privacy",
  displayName: "Privacy",
  symbol: "PRV",
  pDecimals: 9,
  hasIcon: true,
  originalSymbol: "PRV",
  isVerified: true,
};

// const BurningRequestMeta = 27;
const BurningForDepositToSCRequestMeta = 96;

export default class Token {
  static async createSendPToken({ wallet, account, fee, info, tokenName, tokenSymbol, tokenAmount }: any) {
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
        },
      });
    } catch (e) {
      throw e;
    }
    return response;
  }

  // remoteAddress (string) is an ETH/BTC address which users want to receive ETH/BTC (without 0x)
  static async createBurningRequest(
    submitParam: any,
    feeNativeToken: any,
    feePToken: any,
    remoteAddress: any,
    account: Account,
    wallet: any,
    paymentInfos = [],
    info = "",
    txHandler: any,
    metatype: any,
  ) {
    await Wallet.resetProgressTx();
    let response;
    try {
      const accountWallet = getAccountWallet(account, wallet);
      response = await accountWallet.createAndSendBurningRequestTx(
        paymentInfos,
        submitParam,
        feeNativeToken,
        feePToken,
        remoteAddress,
        info,
        metatype,
        undefined,
        undefined,
        txHandler,
      );
    } catch (e) {
      throw e;
    }
    await Wallet.resetProgressTx();
    return response;
  }

  // Deposit to smart contract
  static async depositToSmartContract(
    submitParam: any,
    feeNativeToken: any,
    feePToken: any,
    remoteAddress: any,
    account: any,
    wallet: any,
  ) {
    await Wallet.resetProgressTx();
    let paymentInfos: never[] = [];
    let response;
    try {
      // const accountWallet = this.getAccount(account, wallet);
      // response = await accountWallet.createAndSendBurningRequestTx(
      //   paymentInfos,
      //   submitParam,
      //   feeNativeToken,
      //   feePToken,
      //   remoteAddress,
      //   BurningForDepositToSCRequestMeta,
      // );
    } catch (e) {
      throw e;
    }
    await Wallet.resetProgressTx();
    return response;
  }

  static getPrivacyTokens() {
    return getTokenInfo();
  }

  static async getTokenHistory({ account, wallet, token }: any) {
    try {
      if (!token?.id) {
        throw new Error("Token is required");
      }
      await updateStatusHistory(wallet).catch(() => console.warn("History statuses were not updated"));
      const accountWallet = wallet.getAccountByName(account.name);
      let histories = [];
      histories = await accountWallet.getPrivacyTokenTxHistoryByTokenID(token?.id);
      return histories;
    } catch (e) {
      throw e;
    }
  }

  static mergeTokens(chainTokens: any, pTokens: any[]) {
    return [
      PRV,
      ..._([...chainTokens, ...pTokens])
        .uniqBy((item) => item.tokenId || item.id)
        .map((item) => {
          const pToken = pTokens.find((token: { tokenId: any }) => token.tokenId === (item.tokenId || item.id));

          if (pToken && pToken.symbol === "ETH" && pToken.currencyType === 1) {
            pToken.address = "0x0000000000000000000000000000000000000000";
          }
          const currencyType = pToken?.currencyType;
          return {
            ...item,
            address: pToken?.address || pToken?.contractId,
            id: item.tokenId || item.id,
            pDecimals: Math.min(pToken?.pDecimals || 0, 9),
            decimals: pToken?.decimals,
            hasIcon: !!pToken,
            symbol: pToken?.symbol || item.symbol,
            displayName: pToken ? `Privacy ${pToken.symbol}` : `Incognito ${item.name}`,
            name: pToken ? pToken.name : item.name,
            isVerified: item.verified || pToken?.verified,
            currencyType,
          };
        })
        .orderBy(
          [
            "hasIcon",
            (item) => (PRIORITY_LIST.indexOf(item?.id) > -1 ? PRIORITY_LIST.indexOf(item?.id) : 100),
            (item) => _.isString(item.symbol) && item.symbol.toLowerCase(),
          ],
          ["desc", "asc"],
        )
        .value(),
    ];
  }

  static flatTokens(tokens: any[]) {
    const tokenDict: any = {};
    tokens.forEach((item: { id: string | number }) => (tokenDict[item.id] = item));
    return tokenDict;
  }
}

export async function getUserUnfollowTokenIDs() {
  const listRaw = await storage.getItem(CONSTANT_KEYS.USER_UNFOLLOWING_TOKEN_ID_LIST);
  return JSON.parse(listRaw) || [];
}

export async function setUserUnfollowTokenIDs(newList = []) {
  return await storage.setItem(CONSTANT_KEYS.USER_UNFOLLOWING_TOKEN_ID_LIST, JSON.stringify(newList));
}
