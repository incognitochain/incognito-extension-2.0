import { RootState } from "@redux-sync-storage/reducers/index";
import { getCurrentNetworkSelector } from "@redux-sync-storage/network/network.selectors";
import { createSelector } from "reselect";

const getAccountDefaultNameSelector = createSelector(
  (state: RootState) => state.account,
  (account) => account.defaultAccountName || "",
);

const getCurrentAccountSelector = createSelector(
  (state: RootState) => state,
  (state) => state.account.currentAccount || undefined,
);

const getAccountListSelector = createSelector(
  (state: RootState) => state,
  (state) => state.account.accountList || [],
);

const getPaymentAddressSelector = createSelector(
  getAccountDefaultNameSelector,
  getAccountListSelector,
  (accDefaultName, accountList) => {
    return accountList.find((acc) => acc.name === accDefaultName)?.paymentAddress || "";
  },
);

const getOTAKeySelector = createSelector(
  (state: RootState) => state.account,
  (account) => account.currentAccount?.otaKey || "",
);

const getKeyDefineAccountSelector = createSelector(getOTAKeySelector, getCurrentNetworkSelector, (OTAKey, network) => {
  if (!OTAKey || !network) return undefined;
  return `${OTAKey}-${network.address}`;
});

export {
  getAccountDefaultNameSelector,
  getCurrentAccountSelector,
  getAccountListSelector,
  getPaymentAddressSelector,
  getOTAKeySelector,
  getKeyDefineAccountSelector,
};
