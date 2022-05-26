import { dispatch } from "@redux/store/store";
import Storage from "@services/storage";
import { measure } from "@utils/func";
import { actionFetchingScanCoins, actionFistTimeScanCoins } from "@redux/scanCoins";
const { Account } = require("incognito-chain-web-js/build/web/wallet");

const testnetTokens = [
  "880ea0787f6c1555e59e3958a595086b7802fc7a38276bcd80d4525606557fbc",
  "ffd8d42dc40a8d166ea4848baf8b5f6e9fe0e9c30d60062eb7d44a8df9e00854",
];
export const configAccount = async () => {
  let acc2 = new Account({});
  acc2.setRPCClient("https://testnet.incognito.org/fullnode");
  acc2.setStorageServices(Storage);
  await acc2.setKey(
    "112t8roafGgHL1rhAP9632Yef3sx5k8xgp8cwK4MCJsCL1UWcxXvpzg97N4dwvcD735iKf31Q2ZgrAvKfVjeSUEvnzKJyyJD2z2WHZEtrbP4",
  );
  return acc2;
};

export const scanCoins = async () => {
  try {
    const accountSender = await configAccount();
    if (!accountSender) return;
    const otaKey = accountSender.getOTAKey();
    const coinsStore = await accountSender.getStorageCoinsScan();
    if (!coinsStore) {
      dispatch(actionFistTimeScanCoins({ isScanning: true, otaKey }));
    }
    dispatch(actionFetchingScanCoins({ isFetching: true }));

    // start scan coins
    const { elapsed, result } = await measure(accountSender, "scanCoins", { tokenList: testnetTokens });

    dispatch(actionFistTimeScanCoins({ isScanning: false, otaKey }));
    console.log("scanCoins: ", { elapsed, otaKey, coins: result });
  } catch (error) {
    console.log("SCAN COINS WITH ERROR: ", error);
  } finally {
    dispatch(actionFetchingScanCoins({ isFetching: false }));
  }
};

export const getBalance = async () => {
  configAccount()
    .then((acc) =>
      measure(acc, "getBalance", {
        version: 3,
        tokenID: "0000000000000000000000000000000000000000000000000000000000000004",
      }).then((result) => {
        console.log("GET BALANCE:::: ", result);
      }),
    )
    .catch((error) => {
      console.log("GET BALANCE ERROR: ", error);
    });
};
