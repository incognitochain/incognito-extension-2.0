import { RootState } from "@redux/reducers";
import { flatMap } from "lodash";
import groupBy from "lodash/groupBy";
import { createSelector } from "reselect";

const masterKeyReducerSelector = createSelector(
  (state: RootState) => state.masterKey,
  (masterKey) => masterKey,
);

export const masterlessKeyChainSelector = createSelector(masterKeyReducerSelector, (masterKey) =>
  masterKey.list.find((item) => !!item?.isMasterless),
);

export const masterlessWalletSelector = createSelector(masterlessKeyChainSelector, (masterless) => {
  return masterless?.wallet;
});

export const noMasterLessSelector = createSelector(masterKeyReducerSelector, (masterKey) =>
  masterKey.list.filter((item) => !item.isMasterless),
);

export const masterKeysSelector = createSelector(masterKeyReducerSelector, (masterKey) => masterKey.list);

export const currentMasterKeySelector = createSelector(
  masterKeysSelector,
  (list) => list.find((item) => item.isActive) || list[0],
);

export const currentMasterKeyNameSelector = createSelector(
  currentMasterKeySelector,
  (masterKey) => masterKey?.wallet?.Name,
);

export const listAllMasterKeyAccounts = createSelector(masterKeyReducerSelector, (state) => state.accounts || []);

export const switchingMasterKeySelector = createSelector(masterKeyReducerSelector, (masterKey) => masterKey.switching);

export const initialMasterKeySelector = createSelector(masterKeyReducerSelector, ({ initial }) => initial);

export const groupMasterKeys = createSelector(listAllMasterKeyAccounts, (listAccount) => {
  if (listAccount && listAccount.length > 0) {
    const groupedMasterKeys = groupBy(listAccount, (item) => item.MasterKeyName);
    const groupAccounts = flatMap(groupedMasterKeys, (child, key) => ({
      name: key,
      child,
    }));
    return groupAccounts.filter(({ name }) => name !== "Masterless");
  }
  return [];
});

export const groupMasterless = createSelector(listAllMasterKeyAccounts, (listAccount) => {
  if (listAccount && listAccount.length > 0) {
    const groupedMasterKeys = groupBy(listAccount, (item) => item.MasterKeyName);
    const groupAccounts = flatMap(groupedMasterKeys, (child, key) => ({
      name: key,
      child,
    }));
    return groupAccounts.filter(({ name }) => name === "Masterless");
  }
  return [];
});

export const isLoadingAllMasterKeyAccountSelector = createSelector(
  masterKeyReducerSelector,
  ({ loadingAll }) => loadingAll,
);
