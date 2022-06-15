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
const { PrivacyVersion } = require("incognito-chain-web-js/build/web/wallet");

const tokens: any[] = [
  "ffd8d42dc40a8d166ea4848baf8b5f6e912ad79875f4373070b59392b1756c8f",
  "b832e5d3b1f01a4f0623f7fe91d6673461e1f5d37d91fe78c5c2e6183ff39696",
  "b2655152784e8639fa19521a7035f331eea1f1e911b2f3200a507ebb4554387b",
  "c01e7dc1d1aba995c19b257412340b057f8ad1482ccb6a9bb0adce61afbf05d4",
];

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

    console.log("SCANNING COINS::: ");
    // start scan coins
    const { elapsed, result } = await measure(accountSender, "scanCoins", {
      tokenList: uniq(tokens.concat(_followTokens)),
    });

    if (!coinsStore) {
      dispatch(actionFistTimeScanCoins({ isScanning: false, otaKey }));
      // getFollowTokensBalance().then();
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
