import MasterKeyModel from "@model/MasterKeyModel";
import { RootState } from "@redux/reducers";
import { flatMap } from "lodash";
import groupBy from "lodash/groupBy";
import { createSelector } from "reselect";
import { MasterKeyState } from "./masterKey.reducer";

// Only one MasterKey, Only one Masterless
// 1 MasterKey [Account 1, Account 2, Account 3]
// 1 Masterless [PrivateKey 1, PrivateKey 2, PrivateKey 3]

// ------------------------------------------------------------------------
// MasterKey Selector
// ------------------------------------------------------------------------
export const masterKeyReducerSelector = createSelector(
  (state: RootState) => state.masterKey,
  (masterKeyState): MasterKeyState => masterKeyState,
);

export const noMasterLessSelector = createSelector(masterKeyReducerSelector, (masterKeyState: MasterKeyState) =>
  masterKeyState.list.filter((item: MasterKeyModel) => !item.isMasterless),
);

export const masterKeysSelector = createSelector(
  masterKeyReducerSelector,
  (masterKeyState: MasterKeyState) => masterKeyState.list,
);

export const currentMasterKeySelector = createSelector(
  masterKeysSelector,
  (list) => list.find((item: MasterKeyModel) => item.isActive) || list[0],
);

export const getMasterkeySelector = createSelector(
  masterKeysSelector,
  (list) => list.find((item: MasterKeyModel) => !item.isMasterless) || list[0],
);

export const getMasterlessSelector = createSelector(
  masterKeysSelector,
  (list) => list.find((item: MasterKeyModel) => item.isMasterless) || list[0],
);

export const getAccountListOfMasterless = createSelector(
  getMasterlessSelector,
  (masterless) => masterless?.wallet?.MasterAccount?.child || [],
);

export const currentMasterKeyNameSelector = createSelector(
  currentMasterKeySelector,
  (masterKey: MasterKeyModel) => masterKey?.wallet?.Name,
);

export const listAllMasterKeyAccounts = createSelector(
  masterKeyReducerSelector,
  (masterKeyState: MasterKeyState) => masterKeyState.accounts || [],
);

export const switchingMasterKeySelector = createSelector(
  masterKeyReducerSelector,
  (masterKeyState: MasterKeyState) => masterKeyState.switching,
);

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

export const isLoadingAllMasterKeyAccountSelector = createSelector(
  masterKeyReducerSelector,
  ({ loadingAll }) => loadingAll,
);

// ------------------------------------------------------------------------
// Masterless Selector
// ------------------------------------------------------------------------

export const masterlessKeyChainSelector = createSelector(masterKeyReducerSelector, (masterKeyState: MasterKeyState) =>
  masterKeyState.list.find((item: MasterKeyModel) => !!item?.isMasterless),
);

export const masterlessWalletSelector = createSelector(masterlessKeyChainSelector, (masterless) => {
  return masterless?.wallet;
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

//Group Account based on MasterKey and Masterless
export const groupAccountsByMaster = createSelector(listAllMasterKeyAccounts, (listAccount) => {
  let groupAccounts = {
    MasterKeyAccounts: [] as any[],
    MasterlessAccounts: [] as any[],
  };
  listAccount.map((account) => {
    if (account.MasterKey?.isMasterless) {
      groupAccounts.MasterlessAccounts.push(account);
    } else {
      groupAccounts.MasterKeyAccounts.push(account);
    }
  });
  return groupAccounts;
});

export const isExistMasterlessWallet = createSelector(masterKeysSelector, (masterKeyList) => {
  const founded = masterKeyList.find((item: MasterKeyModel) => item.isMasterless);
  return !!founded;
});
