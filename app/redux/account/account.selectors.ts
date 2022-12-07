import { RootState } from "@redux/reducers/index";
import { walletSelector } from "@redux/wallet/wallet.selectors";
import { getAccountWallet } from "@services/wallet/wallet.shared";
import { memoize } from "lodash";
import { createSelector } from "reselect";
import { networkSelector } from "@popup/configs/Configs.selector";

export const getAccountWithPaymentAddress = (paymentAddress: string) => (state: RootState) => {
  return state.account.list.find((acc) => acc.PaymentAddress === paymentAddress);
};

export const accountSelector = createSelector(
  (state: RootState) => state.account,
  (account) => account,
);

export const isGettingBalance = createSelector(
  (state: RootState) => state.account,
  (account) => account.isGettingBalance || [],
);

export const defaultAccountName = (state: RootState): string => state.account.defaultAccountName || "";

export const listAccountSelector = createSelector(
  (state: RootState) => state.account.list || [],
  (list) =>
    list.map((item) => ({
      ...item,
      accountName: item?.name || item?.accountName,
      privateKey: item?.PrivateKey,
      paymentAddress: item?.PaymentAddress,
      readonlyKey: item?.ReadonlyKey,
    })),
);

export const defaultAccountNameSelector = createSelector(
  (state: RootState) => state.account.defaultAccountName,
  (accountName) => accountName,
);

export const listAccount = listAccountSelector;

export const defaultAccountSelector: any = createSelector(
  listAccountSelector,
  defaultAccountNameSelector,
  walletSelector,
  (list, defaultName, wallet) => {
    try {
      if (list.length === 0 || !wallet?.Name) {
        return {};
      }
      let account = list?.find((account) => account?.name === defaultName) || list[0];
      return {
        ...account,
        indexAccount: wallet.getAccountIndexByName && wallet.getAccountIndexByName(defaultAccount?.accountName || ""),
      };
    } catch (error) {
      console.log("ERROR WHEN GET DEFAULT ACCOUNT", error);
    }
  },
);

export const defaultAccount = defaultAccountSelector;

// export const getAccountByName = createSelector(listAccount, (accounts) =>
//   memoize((accountName) =>
//     accounts.find((account: any) => account?.name === accountName || account?.AccountName === accountName),
//   ),
// );

export const getAccountByName1 = (state: RootState) => (accountName: string) => {
  const accountList = listAccount(state);
  return accountList.find((account: any) => account?.name === accountName || account?.AccountName === accountName);
};

// export const getAccountByPublicKey = createSelector(listAccount, (accounts) =>
//   memoize((publicKey) => accounts.find((account) => account?.PublicKeyCheckEncode === publicKey)),
// );

export const getAccountByPublicKey1 = (state: RootState) => (publicKey: any) => {
  const accountList = listAccount(state);
  return accountList.find((account) => account?.PublicKeyCheckEncode === publicKey);
};

export const isGettingAccountBalanceSelector = createSelector(
  isGettingBalance,
  (isGettingBalance) => isGettingBalance.length !== 0,
);

export const defaultAccountBalanceSelector = createSelector(
  defaultAccountSelector,
  (account: any) => account?.value || 0,
);

export const switchAccountSelector = createSelector(
  (state: RootState) => state?.account,
  (account) => !!account?.switch,
);

export const createAccountSelector = createSelector(
  (state: RootState) => state?.account,
  (account) => !!account?.create,
);

export const importAccountSelector = createSelector(
  (state: RootState) => state?.account,
  (account) => !!account?.import,
);

// export const getAccountByNameSelector = createSelector(listAccountSelector, (accounts) =>
//   memoize((accountName) =>
//     accounts.find((account) => account?.accountName === accountName || account?.AccountName === accountName),
//   ),
// );

export const getAccountByNameSelector1 = (state: RootState) => (accountName: string) => {
  const accountList = listAccount(state);
  return accountList.find((account: any) => account?.name === accountName || account?.AccountName === accountName);
};

export const signPublicKeyEncodeSelector = createSelector(
  (state: RootState) => state?.account,
  (account) => account?.signPublicKeyEncode,
);

export const burnerAddressSelector = createSelector(accountSelector, ({ burnerAddress }) => burnerAddress);

export const otaKeyOfDefaultAccountSelector = createSelector(defaultAccountSelector, (account: any) => account.OTAKey);

export const keyDefineAccountSelector = createSelector(
  otaKeyOfDefaultAccountSelector,
  networkSelector,
  (OTAKey, network) => {
    if (!OTAKey || !network) return undefined;
    return `${OTAKey}-${network}`;
  },
);

export const paymentAddressOfDefaultAccountSelector = createSelector(
  defaultAccountSelector,
  (account: any) => account.PaymentAddress,
);

export const nftTokenDataSelector = createSelector(accountSelector, ({ nft }) => {
  const { initNFTToken, nftToken } = nft;
  let titleStr = "";
  if (!initNFTToken) {
    titleStr = "Welcome! Tap here to mint your access ticket";
  }
  return {
    ...nft,
    invalidNFTToken: !initNFTToken || !nftToken,
    titleStr,
  };
});

export const defaultAccountWalletSelector = createSelector(
  defaultAccountSelector,
  walletSelector,
  (defaultAccount, wallet) => defaultAccount && wallet && getAccountWallet(defaultAccount, wallet),
);

export const isFetchingNFTSelector = createSelector(accountSelector, ({ isFetchingNFT }) => isFetchingNFT);
export const getCurrentPaymentAddress = createSelector(
  paymentAddressOfDefaultAccountSelector,
  (paymentAddress) => paymentAddress || "Unknow",
);

export const listBackupPrivateKeysSelector = createSelector(
  (state: RootState) => state.account.list || [],
  (list) =>
    list.map((item) => ({
      accountName: item?.name || item?.accountName || "",
      privateKey: item?.PrivateKey || "",
    })),
);

export default {
  defaultAccountName,
  listAccount,
  defaultAccount,
  isGettingBalance,
  getAccountByName1,
  getAccountByPublicKey1,
  listAccountSelector,
  defaultAccountNameSelector,
  defaultAccountSelector,
  isGettingAccountBalanceSelector,
  defaultAccountBalanceSelector,
  switchAccountSelector,
  createAccountSelector,
  importAccountSelector,
  getAccountByNameSelector1,
  signPublicKeyEncodeSelector,
  burnerAddressSelector,
  otaKeyOfDefaultAccountSelector,
  nftTokenDataSelector,
  defaultAccountWalletSelector,
  isFetchingNFTSelector,
  getCurrentPaymentAddress,
  listBackupPrivateKeysSelector,
};
