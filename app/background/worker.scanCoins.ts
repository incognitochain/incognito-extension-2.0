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
import Server, { TESTNET_FULLNODE } from "@services/wallet/Server";
const { PrivacyVersion } = require("incognito-chain-web-js/build/web/wallet");

const MAINNET_TOKEN: any[] = [
  "ffd8d42dc40a8d166ea4848baf8b5f6e912ad79875f4373070b59392b1756c8f",
  "b832e5d3b1f01a4f0623f7fe91d6673461e1f5d37d91fe78c5c2e6183ff39696",
  "b2655152784e8639fa19521a7035f331eea1f1e911b2f3200a507ebb4554387b",
  "c01e7dc1d1aba995c19b257412340b057f8ad1482ccb6a9bb0adce61afbf05d4",
];

const TESTNET_TOKEN: any[] = [
  "ffd8d42dc40a8d166ea4848baf8b5f6e9fe0e9c30d60062eb7d44a8df9e00854",
  "4584d5e9b2fc0337dfb17f4b5bb025e5b82c38cfa4f54e8a3d4fcdd03954ff82",
  "9fca0a0947f4393994145ef50eecd2da2aa15da2483b310c2c0650301c59b17d",
  "c01e7dc1d1aba995c19b257412340b057f8ad1482ccb6a9bb0adce61afbf05d4",
];

const getTokensDefault = async () => {
  const server = await Server.getDefault();
  let isMainnet = true;
  if (server && server.address === TESTNET_FULLNODE) isMainnet = false;

  return isMainnet ? MAINNET_TOKEN : TESTNET_TOKEN;
};

const log = createLogger("background:scanCoins");

export const configAccount = async () => {
  const accountData = defaultAccountSelector(store.getState());
  if (!accountData || !accountData.PrivateKey) return;
  const accountSender = defaultAccountWalletSelector(store.getState());
  let keyDefine = "";
  try {
    if (accountSender?.rpc?.rpcHttpService?.url) {
      keyDefine = `${accountSender.getOTAKey()}-${accountSender?.rpc?.rpcHttpService?.url}`;
    }
  } catch (e) {
    // Handle error
  }
  return { accountSender, keyDefine };
};

export const scanCoins = async () => {
  const { accountSender, keyDefine } = (await configAccount()) as any;
  const isFetching = isFetchingScanCoinsSelector(store.getState());

  // Validate data
  if (!accountSender || isFetching || !keyDefine) return;

  try {
    const otaKey = accountSender.getOTAKey();
    const _followTokens = (await accountSender.getListFollowingTokens()) || [];
    // Get coins scanned from storage, existed ignore and continue scan
    const coinsStore = await accountSender.getStorageCoinsScan();
    if (!coinsStore) {
      dispatch(actionFistTimeScanCoins({ isScanning: true, otaKey: keyDefine }));
    }

    dispatch(actionFetchingScanCoins({ isFetching: true }));

    const tokens = await getTokensDefault();

    log("SCANNING COINS::: ");
    // start scan coins
    const { elapsed, result } = await measure(accountSender, "scanCoins", {
      tokenList: uniq(tokens.concat(_followTokens)),
    });

    if (!coinsStore) {
      dispatch(actionFistTimeScanCoins({ isScanning: false, otaKey: keyDefine }));
      // getFollowTokensBalance().then();
    }

    log("scanCoins: ", { elapsed, otaKey, coins: result });
  } catch (error) {
    log("SCAN COINS WITH ERROR: ", error);
  } finally {
    dispatch(actionFetchingScanCoins({ isFetching: false }));
  }
};

export const getFollowTokensBalance = async () => {
  const accountData = defaultAccountSelector(store.getState());
  const isFetching = isFetchingAssetsSelector(store.getState());
  const { accountSender, keyDefine } = (await configAccount()) as any;
  if (!accountSender || isFetching) return;
  if (!keyDefine) return;

  try {
    const tokens = await getTokensDefault();
    dispatch(actionFetchingFollowBalance({ isFetching: true }));
    // follow tokens balance
    const { balance }: { balance: IBalance[] } = await accountSender.getFollowTokensBalance({
      defaultTokens: tokens,
      version: PrivacyVersion.ver3,
    });
    const _balance = uniqBy(balance, "id");
    dispatch(actionFetchedFollowBalance({ balance: _balance, OTAKey: keyDefine }));

    return {
      keyDefine,
      balances: _balance,
      paymentAddress: accountData.PaymentAddress,
    };
  } catch (error) {
    log("LOAD FOLLOW TOKENS BALANCE ERROR: ", error);
  } finally {
    dispatch(actionFetchingFollowBalance({ isFetching: false }));
  }
};
