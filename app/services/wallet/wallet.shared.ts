import AccountModel from "@model/AccountModel";
import Server from "@services/wallet/Server";
import Storage from "@services/storage";

const { Validator } = require("incognito-chain-web-js/build/web/wallet");

export const getAccountNameByAccount = (account: AccountModel) => {
  new Validator("account", account).object().required();
  if (account) {
    return account.accountName || account.name || account.accountName;
  }
  return "";
};

export const getAccountWallet = (account: any, wallet: any) => {
  try {
    new Validator("getAccountWallet-account", account).object().required();
    new Validator("getAccountWallet-wallet", wallet).object().required();
    const accountName = getAccountNameByAccount(account);
    if (!accountName) {
      return {};
    }
    const indexAccount = wallet.getAccountIndexByName && wallet.getAccountIndexByName(accountName);
    let accountWallet = wallet.MasterAccount.child[indexAccount];
    if (!accountWallet) {
      return {};
    }
    new Validator("accountWallet", accountWallet).object();
    new Validator("wallet.RpcClient", wallet.RpcClient).string();
    new Validator("wallet.Storage", wallet.Storage).object();
    new Validator("wallet.RpcCoinService", wallet.RpcCoinService).string();
    new Validator("wallet.PrivacyVersion", wallet.PrivacyVersion).number();
    new Validator("wallet.PubsubService", wallet.PubsubService).string();
    new Validator("wallet.AuthToken", wallet.AuthToken).string();
    new Validator("wallet.RpcApiService", wallet.RpcApiService).string();
    new Validator("wallet.PortalService", wallet.PortalService).string();

    // TODO: REMOVE SOON
    const FULL_NODE = "https://community-fullnode.incognito.org/fullnode";
    const COIN_SERVICE = "https://api-coinservice.incognito.org";
    const PUBSUB = "https://api-coinservice.incognito.org/txservice";
    const API_SERVICE = "https://api-service.incognito.org";

    accountWallet.setRPCClient(FULL_NODE);
    accountWallet.setRPCCoinServices(COIN_SERVICE);
    accountWallet.setRPCTxServices(PUBSUB);
    accountWallet.setRPCRequestServices(PUBSUB);
    accountWallet.setAuthToken(wallet.AuthToken);
    accountWallet.setRPCApiServices(API_SERVICE, wallet.AuthToken);
    accountWallet.setStorageServices(Storage);
    // accountWallet.setRPCClient(wallet.RpcClient);
    // accountWallet.setStorageServices(wallet.Storage);
    // accountWallet.setRPCCoinServices(wallet.RpcCoinService);
    // accountWallet.setRPCTxServices(wallet.PubsubService);
    // accountWallet.setRPCRequestServices(wallet.RpcRequestService);
    // accountWallet.setAuthToken(wallet.AuthToken);
    // accountWallet.setRPCApiServices(wallet.RpcApiService, wallet.AuthToken);
    // accountWallet.setUseLegacyEncoding(wallet.UseLegacyEncoding);
    // accountWallet.setRPCPortalServices(wallet.PortalService);
    return accountWallet;
  } catch (error) {
    console.log("getAccountWallet error", error);
    throw error;
  }
};
