import AccountModel from "@model/AccountModel";

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

    global.network = {
      address: "https://testnet.incognito.org/fullnode",
      coinServices: "https://api-coinservice-staging.incognito.org",
      pubsubServices: "https://api-coinservice-staging.incognito.org/txservice",
      apiServices: "https://staging-api-service-staging.incognito.org",
    };

    const { address, coinServices, pubsubServices, apiServices } = global.network;
    accountWallet.setRPCClient(address);
    accountWallet.setStorageServices(wallet.Storage);
    accountWallet.setRPCCoinServices(coinServices);
    accountWallet.setRPCTxServices(pubsubServices);
    accountWallet.setRPCRequestServices(pubsubServices);
    accountWallet.setAuthToken(wallet.AuthToken);
    accountWallet.setRPCApiServices(apiServices, wallet.AuthToken);
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
