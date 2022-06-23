import AccountModel from "@model/AccountModel";
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
    new Validator("wallet.RpcCoinService", wallet.RpcCoinService).string();
    new Validator("wallet.PrivacyVersion", wallet.PrivacyVersion).number();
    new Validator("wallet.RpcApiService", wallet.RpcApiService).string();
    new Validator("wallet.PortalService", wallet.PortalService).string();

    accountWallet.setRPCClient(wallet.RpcClient);
    accountWallet.setStorageServices(wallet.Storage);
    accountWallet.setRPCCoinServices(wallet.RpcCoinService);
    accountWallet.setRPCPortalServices(wallet.PortalService);

    return accountWallet;
  } catch (error) {
    console.log("getAccountWallet error", error);
    throw error;
  }
};
