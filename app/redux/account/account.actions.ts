import MasterKeyModel from "@/model/MasterKeyModel";
import { PRV } from "@constants/common";
import AccountModel from "@model/account";
import {
  burnerAddressSelector,
  default as accountSelector,
  default as accountSelectors,
} from "@redux/account/account.selectors";
import FollowAction from "@redux/follow/follow.actions";
import { loadAllMasterKeyAccounts, switchMasterKey, updateMasterKey } from "@redux/masterKey/masterKey.actions";
import {
  currentMasterKeySelector,
  masterlessKeyChainSelector,
  noMasterLessSelector,
} from "@redux/masterKey/masterKey.selectors";
import { actionGetPDexV3Inst } from "@redux/pDexV3/pDexV3.actions";
import { getDefaultAccountWalletSelector } from "@redux/shared/shared.selectors";
import { AppGetState, AppThunkDispatch } from "@redux/store/index";
import { getBalance as getTokenBalance, setListToken, setToken } from "@redux/token/token.actions";
import { defaultPTokensIDsSelector } from "@redux/token/token.selectors";
import { reloadWallet } from "@redux/wallet/wallet.actions";
import { walletSelector } from "@redux/wallet/wallet.selectors";
import { cachePromise } from "@services/cache";
import { ExHandler } from "@services/exception";
import accountService from "@services/wallet/accountService";
import { getPassphrase } from "@services/wallet/passwordService";
import { storeWalletAccountIdsOnAPI } from "@services/wallet/walletService";
import uniq from "lodash/uniq";
import { batch } from "react-redux";
import { $CombinedState } from "redux";
import { AccountActionType } from "./account.types";

const { PrivacyVersion, Validator } = require("incognito-chain-web-js/build/wallet");

//--------------------------------------------------------------------
// Pure Functions (Pure Actions)
//--------------------------------------------------------------------

export const setAccount = (account: AccountModel) => ({
  type: AccountActionType.SET,
  data: account,
});

export const setListAccount = (accounts: AccountModel[]) => ({
  type: AccountActionType.SET_LIST,
  data: accounts,
});

export const removeAccount = (account: AccountModel) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  const state = getState();
  const wallet = walletSelector(state);
  console.time("TOTAL_TIME_REMOVE_ACCOUNT");
  try {
    try {
      accountService.removeCacheBalance(account, wallet);
    } catch {
      //
    }
    const { PrivateKey } = account;
    const { aesKey } = await getPassphrase();
    const masterKey = currentMasterKeySelector(state);
    const walletAccount = accountService.getAccount(account, wallet);
    const accountInfo = await walletAccount.getDeserializeInformation();
    if (!masterKey.deletedAccountIds) {
      masterKey.deletedAccountIds = [];
    }
    masterKey.deletedAccountIds.push(accountInfo.ID);
    wallet.deletedAccountIds = masterKey.deletedAccountIds;
    console.time("TIME_REMOVE_ACCOUNT");
    await accountService.removeAccount(PrivateKey, aesKey, wallet);
    console.timeEnd("TIME_REMOVE_ACCOUNT");
    batch(() => {
      dispatch(updateMasterKey(masterKey));
      dispatch({
        type: AccountActionType.REMOVE_BY_PRIVATE_KEY,
        data: PrivateKey,
      });
      dispatch(reloadWallet());
      dispatch(loadAllMasterKeyAccounts());
    });
    console.timeEnd("TOTAL_TIME_REMOVE_ACCOUNT");
    return true;
  } catch (e) {
    console.log("REMOVE ACCOUNT ERROR", e);
    throw e;
  }
};

export const getBalanceStart = (accountName: string) => ({
  type: AccountActionType.GET_BALANCE,
  data: accountName,
});

export const getBalanceFinish = (accountName: string) => ({
  type: AccountActionType.GET_BALANCE_FINISH,
  data: accountName,
});

const setSignPublicKeyEncode = (signPublicKeyEncode: any) => {
  return {
    type: AccountActionType.SET_SIGN_PUBLIC_KEY_ENCODE,
    signPublicKeyEncode,
  };
};

export const actionUpdateDefaultAccount = (account: any) => ({
  type: AccountActionType.SET_DEFAULT_ACCOUNT,
  data: account,
});

export const actionSetSignPublicKeyEncode =
  (defaultAccount?: any) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    try {
      const state = getState();
      const wallet = walletSelector(state);
      const account = defaultAccount || accountSelectors.defaultAccountSelector(state);
      const signPublicKeyEncode = await accountService.getSignPublicKeyEncode({
        wallet,
        account,
      });
      if (signPublicKeyEncode) {
        dispatch(setSignPublicKeyEncode(signPublicKeyEncode));
      }
    } catch (error) {
      new ExHandler(error).showErrorToast();
    }
  };

export const actionSetFetchingNFT = () => ({
  type: AccountActionType.ACTION_FETCHING_NFT,
  data: { isFetching: true },
});

export const actionSetNFTTokenData =
  (noCache = true) =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    let nftPayload = {
      nftToken: "",
      nftTokenAvailable: "",
      initNFTToken: false,
      list: [],
      pending: false,
      listNFTToken: [],
    };
    try {
      dispatch(actionSetFetchingNFT());
      const pDexV3Inst = await dispatch(actionGetPDexV3Inst());
      const otaKey = pDexV3Inst.getOTAKey();
      if (noCache) {
        nftPayload = await pDexV3Inst.getNFTTokenData({
          version: PrivacyVersion.ver2,
        });
      } else {
        nftPayload = await cachePromise(`${otaKey}-LIST-NFT-TOKEN-DATA`, () =>
          pDexV3Inst.getNFTTokenData({
            version: PrivacyVersion.ver2,
          }),
        );
      }
      dispatch(actionFetchedNFT(nftPayload));
    } catch (error) {
      new ExHandler(error).showErrorToast();
    }
    return nftPayload;
  };

export const setDefaultAccount = (account: any) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  try {
    await dispatch(actionUpdateDefaultAccount(account));
  } catch (e) {
    new ExHandler(e).showErrorToast();
  } finally {
    accountService.saveDefaultAccountToStorage(accountService.getAccountName(account));
  }
};

export const getBalance = (account: any) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  let balance = 0;
  try {
    if (!account) throw new Error("Account object is required");
    const state = getState();
    await dispatch(getBalanceStart(account?.name));
    const wallet = walletSelector(state);
    if (!wallet) {
      throw new Error("Wallet is not exist");
    }
    balance = await accountService.getBalance({
      account,
      wallet,
      tokenID: PRV.id,
      version: PrivacyVersion.ver2,
    });

    console.log("==> balance ", balance);
    const accountMerge = {
      ...account,
      value: balance,
    };
    const token = {
      id: PRV.id,
      amount: balance,
      loading: false,
    };
    dispatch(
      FollowAction.actionFetchedTokenBalance({
        token,
        OTAKey: account.OTAKey,
      }),
    );
    dispatch(setToken(token));
    await dispatch(setAccount(accountMerge));
  } catch (e) {
    account &&
      dispatch(
        setAccount({
          ...account,
          value: null,
        }),
      );
    throw e;
  } finally {
    dispatch(getBalanceFinish(account?.name));
  }
  return balance ?? 0;
};

export const reloadBalance = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  const state = getState();
  const account = accountSelector.defaultAccountSelector(state);
  await dispatch(getBalance(account));
};

export const actionSwitchAccountFetching = () => ({
  type: AccountActionType.ACTION_SWITCH_ACCOUNT_FETCHING,
});

export const actionSwitchAccountFetched = () => ({
  type: AccountActionType.ACTION_SWITCH_ACCOUNT_FETCHED,
});

export const actionSwitchAccountFetchFail = () => ({
  type: AccountActionType.ACTION_SWITCH_ACCOUNT_FETCH_FAIL,
});

export const actionSwitchAccount =
  (accountName: any, shouldLoadBalance = true) =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    try {
      new Validator("actionSwitchAccount-accountName", accountName).required().string();
      new Validator("actionSwitchAccount-shouldLoadBalance", shouldLoadBalance).boolean();
      const state = getState();
      const account: any = accountSelector.getAccountByName1(accountName);
      const masterKey: MasterKeyModel = currentMasterKeySelector(state);
      const defaultAccountName = accountSelector.defaultAccountNameSelector(state);
      if (defaultAccountName !== account?.name) {
        dispatch(switchMasterKey(masterKey?.name, accountName));
      }
      return account;
    } catch (error) {
      throw error;
    }
  };

export const actionReloadFollowingToken = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  try {
    const state = getState();
    const wallet = walletSelector(state);
    const account = accountSelector.defaultAccountSelector(state);
    const accountWallet = getDefaultAccountWalletSelector(state);
    let followed = await accountService.getFollowingTokens(account, wallet);
    const keyInfo = await accountWallet.getKeyInfo({
      version: PrivacyVersion.ver2,
    });
    const isFollowedDefaultTokens = await accountWallet.isFollowedDefaultTokens();
    if (!isFollowedDefaultTokens) {
      const coinIDs = keyInfo.coinindex ? Object.keys(keyInfo.coinindex).map((tokenID) => tokenID) : [];
      const pTokensIDs = defaultPTokensIDsSelector(state);
      if (pTokensIDs.length > 0) {
        let tokenIDs = [...pTokensIDs, ...coinIDs];
        tokenIDs = uniq(tokenIDs);
        await accountWallet.followingDefaultTokens({
          tokenIDs,
        });
        followed = await accountService.getFollowingTokens(account, wallet);
      }
    }
    batch(() => {
      dispatch(getBalance(account));
      followed.forEach((token: any) => {
        try {
          dispatch(getTokenBalance(token?.id));
        } catch (error) {
          console.log("error", token?.id);
        }
      });
      dispatch(setListToken(followed));
    });
    return followed;
  } catch (error) {
    throw error;
  }
};

export const actionLoadAllBalance = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  try {
    const state = getState();
    const accounts: any = accountSelector.listAccount(state);
    let tasks: any[] = [];
    Promise.all(
      accounts.map(async (account: any) => {
        tasks.push(dispatch(getBalance(account)));
      }),
    );
    await Promise.all(tasks);
  } catch (error) {
    throw Error("actionLoadAllBalance ERROR");
  }
};

export const actionFetchingCreateAccount = () => ({
  type: AccountActionType.ACTION_FETCHING_CREATE_ACCOUNT,
});

export const actionFetchedCreateAccount = () => ({
  type: AccountActionType.ACTION_FETCHED_CREATE_ACCOUNT,
});

export const actionFetchFailCreateAccount = () => ({
  type: AccountActionType.ACTION_FETCH_FAIL_CREATE_ACCOUNT,
});

export const actionFetchCreateAccount =
  ({ accountName }: any) =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    console.time("TOTAL_TIME_CREATE_ACCOUNT");
    const state = getState();
    const create = accountSelector.createAccountSelector(state);
    let wallet = walletSelector(state);
    const masterKey: MasterKeyModel = currentMasterKeySelector(state);
    let serializedAccount: any;
    if (!!create || !accountName || !wallet) {
      return;
    }
    try {
      dispatch(actionFetchingCreateAccount());
      const account = await accountService.createAccount(accountName, wallet);
      serializedAccount = new AccountModel(accountService.toSerializedAccountObj(account));
      storeWalletAccountIdsOnAPI(wallet);
      batch(() => {
        dispatch(actionFetchedCreateAccount());
        if (serializedAccount?.name) {
          dispatch(switchMasterKey(masterKey?.name, serializedAccount?.name));
          dispatch(loadAllMasterKeyAccounts());
        }
      });
      console.timeEnd("TOTAL_TIME_CREATE_ACCOUNT");
      return serializedAccount;
    } catch (error) {
      dispatch(actionFetchFailCreateAccount());
      throw error;
    }
  };

export const actionFetchingImportAccount = () => ({
  type: AccountActionType.ACTION_FETCHING_IMPORT_ACCOUNT,
});

export const actionFetchedImportAccount = () => ({
  type: AccountActionType.ACTION_FETCHED_IMPORT_ACCOUNT,
});

export const actionFetchFailImportAccount = () => ({
  type: AccountActionType.ACTION_FETCH_FAIL_IMPORT_ACCOUNT,
});

export const actionFetchImportAccount =
  ({ accountName, privateKey }: any) =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    const state = getState();
    const importAccount = accountSelector.importAccountSelector(state);
    const masterless = masterlessKeyChainSelector(state);
    const masterKeys = noMasterLessSelector(state);
    let selectedMasterKey = masterless;
    if (!!importAccount || !accountName || !privateKey) {
      return;
    }
    try {
      dispatch(actionFetchingImportAccount());
      const { aesKey } = await getPassphrase();
      for (const masterKey of masterKeys) {
        try {
          const isCreated = await masterKey.wallet.hasCreatedAccount(privateKey);
          if (isCreated) {
            selectedMasterKey = masterKey;
            break;
          }
        } catch (e) {
          console.debug("CHECK CREATED ERROR", e);
        }
      }
      let wallet = selectedMasterKey?.wallet;
      const isImported = await accountService.importAccount(privateKey, accountName, aesKey, wallet);
      if (isImported) {
        if (selectedMasterKey !== masterless) {
          storeWalletAccountIdsOnAPI(wallet);
        }
        batch(() => {
          dispatch(switchMasterKey(selectedMasterKey?.name || "", accountName));
          dispatch(actionFetchedImportAccount());
          dispatch(loadAllMasterKeyAccounts());
        });
      } else {
        throw new Error("Import keychain error");
      }
      return isImported;
    } catch (error) {
      dispatch(actionFetchFailImportAccount());
      throw error;
    }
  };

export const actionFetchBurnerAddress = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  try {
    const state = getState();
    const burnerAddress = burnerAddressSelector(state);
    if (burnerAddress) {
      return;
    }
    const account = getDefaultAccountWalletSelector(state);
    const payload = await account.getBurnerAddress();
    await dispatch({
      type: AccountActionType.ACTION_GET_BURNER_ADDRESS,
      payload,
    });
  } catch (error) {
    new ExHandler(error).showErrorToast();
  }
};

export const actionFetchedNFT = (payload: any) => ({
  type: AccountActionType.ACTION_FETCHED_NFT,
  payload,
});

export const actionToggleModalMintMoreNFT = (payload: any) => ({
  type: AccountActionType.ACTION_TOGGLE_MODAL_MINT_MORE_NFT,
  payload,
});
