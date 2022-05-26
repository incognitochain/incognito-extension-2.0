import "regenerator-runtime/runtime";
import Storage from "@services/storage";
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

export const measure = async (obj: any, fname: string, ...params: any) => {
  const startTime = performance.now();
  const result = await obj[fname].bind(obj)(...params);
  const elapsed = performance.now() - startTime;
  if (typeof result === "string") return { elapsed, result };
  return { elapsed, ...result };
};

export const workerGetCoins = async () => {
  configAccount()
    .then((acc) =>
      measure(acc, "scanCoins", { tokenList: testnetTokens }).then((result) => {
        if (alert) alert(result.elapsed);
        console.log("scanCoins:::: ", result);
        // globalThis.scanCoinResult = result;
        // return result;
      }),
    )
    .catch((error) => {
      console.log("SCAN COINS ERROR: ", error);
    });
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
