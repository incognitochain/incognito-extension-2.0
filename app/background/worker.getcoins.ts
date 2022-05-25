import "regenerator-runtime/runtime";
const { Account, setShardNumber, init } = require("incognito-chain-web-js/build/web/wallet");

const testnetTokens = [
  "880ea0787f6c1555e59e3958a595086b7802fc7a38276bcd80d4525606557fbc",
  "ffd8d42dc40a8d166ea4848baf8b5f6e9fe0e9c30d60062eb7d44a8df9e00854",
];
export const configAccount = async () => {
  // // await setShardNumber(8);
  // await init(null, 8);
  let acc2 = new Account({});
  acc2.setRPCClient("https://testnet.incognito.org/fullnode");
  await acc2.setKey(
    "112t8roafGgHL1rhAP9632Yef3sx5k8xgp8cwK4MCJsCL1UWcxXvpzg97N4dwvcD735iKf31Q2ZgrAvKfVjeSUEvnzKJyyJD3GqqSZdxN4or",
  );
  return acc2;
};

export const measure = async (obj: any, fname: string, ...params: any) => {
  console.log(obj);
  const startTime = performance.now();
  const result = await obj[fname].bind(obj)(...params);
  const elapsed = performance.now() - startTime;
  return { elapsed, ...result };
};

export const workerGetCoins = async () => {
  configAccount()
    .then((acc) =>
      measure(acc, "activeScanCoins", { tokenList: testnetTokens }).then((result) => {
        if (alert) alert(result.elapsed);
        console.log("TEST:::: ", {
          result,
        });
        // globalThis.scanCoinResult = result;
        // return result;
      }),
    )
    .catch((error) => {
      console.log("SAHGGGG", error);
    });
};
