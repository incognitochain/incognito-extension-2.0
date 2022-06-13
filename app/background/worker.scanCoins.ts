import { dispatch, store } from "@redux/store/store";
import Storage from "@services/storage";
import { measure } from "@utils/func";
import { actionFetchingScanCoins, actionFistTimeScanCoins, isFetchingScanCoinsSelector } from "@redux/scanCoins";
import { createLogger } from "@core/utils";
import uniqBy from "lodash/uniqBy";
import { IBalance } from "@core/types";
import { actionFetchedFollowBalance, actionFetchingFollowBalance } from "@module/Assets";
import { isFetchingAssetsSelector } from "@module/Assets";
import { defaultAccountSelector, defaultAccountWalletSelector } from "@redux/account/account.selectors";
import uniq from "lodash/uniq";
import Server from "@services/wallet/Server";
const { Account, PrivacyVersion } = require("incognito-chain-web-js/build/web/wallet");

const tokens: any[] = [];

const log = createLogger("background:scanCoins");

export const configAccount = async () => {
  const accountData = defaultAccountSelector(store.getState());
  if (!accountData || !accountData.PrivateKey) return;
  // let accountSender = new Account({});
  // const server = await Server.getDefault();
  // const { coinServices: COIN_SERVICE, address: FULL_NODE } = server;
  const accountSender = defaultAccountWalletSelector(store.getState());
  accountSender.setStorageServices(Storage);
  return accountSender;
};

export const scanCoins = async () => {
  const accountSender = await configAccount();
  const isFetching = isFetchingScanCoinsSelector(store.getState());
  // Validate data
  if (!accountSender || isFetching) return;

  try {
    const otaKey = accountSender.getOTAKey();
    const _followTokens = (await accountSender.getListFollowingTokens()) || [];
    // Get coins scanned from storage, existed ignore and continue scan
    const coinsStore = await accountSender.getStorageCoinsScan();

    if (!coinsStore) {
      dispatch(actionFistTimeScanCoins({ isScanning: true, otaKey }));
    }

    dispatch(actionFetchingScanCoins({ isFetching: true }));

    // start scan coins
    const { elapsed, result } = await measure(accountSender, "scanCoins", {
      tokenList: uniq(tokens.concat(_followTokens)),
    });

    if (!coinsStore) {
      dispatch(actionFistTimeScanCoins({ isScanning: false, otaKey }));
    }

    console.log("scanCoins: ", { elapsed, otaKey, coins: result });
  } catch (error) {
    console.log("SCAN COINS WITH ERROR: ", error);
  } finally {
    dispatch(actionFetchingScanCoins({ isFetching: false }));
  }
};

export const getFollowTokensBalance = async () => {
  const isFetching = isFetchingAssetsSelector(store.getState());
  const accountSender = await configAccount();

  if (!accountSender || isFetching) return;
  const otaKey = accountSender.getOTAKey();
  if (!otaKey) return;

  try {
    dispatch(actionFetchingFollowBalance({ isFetching: true }));
    // follow tokens balance
    const { balance }: { balance: IBalance[] } = await accountSender.getFollowTokensBalance({
      defaultTokens: tokens,
      version: PrivacyVersion.ver3,
    });
    const _balance = uniqBy(balance, "id");
    dispatch(actionFetchedFollowBalance({ balance: _balance, OTAKey: otaKey }));
  } catch (error) {
    log("LOAD FOLLOW TOKENS BALANCE ERROR: ", error);
  } finally {
    dispatch(actionFetchingFollowBalance({ isFetching: false }));
  }
};
