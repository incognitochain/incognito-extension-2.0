import Storage from "@services/storage";
const {
  newMnemonic,
  PrivacyVersion,
  Account,
  Wallet,
  PRVIDSTR,
  ACCOUNT_CONSTANT,
} = require("incognito-chain-web-js/build/web/wallet");

const FULL_NODE = "https://testnet.incognito.org/fullnode";

const TESTNET_TOKENS: string[] = [
  "ffd8d42dc40a8d166ea4848baf8b5f6e9fe0e9c30d60062eb7d44a8df9e00854",
  "4584d5e9b2fc0337dfb17f4b5bb025e5b82c38cfa4f54e8a3d4fcdd03954ff82",
  "9fca0a0947f4393994145ef50eecd2da2aa15da2483b310c2c0650301c59b17d",
  "c01e7dc1d1aba995c19b257412340b057f8ad1482ccb6a9bb0adce61afbf05d4",
];

const getAccount = async () => {
  let accountSender = new Account({});
  accountSender.setRPCClient(FULL_NODE);
  accountSender.setStorageServices(Storage);
  await accountSender.setKey(
    "112t8rnXnr1knsAk4Lr3UbmtsiDRu6Hv3csgj5VMpazVARHXCEWVxDXfHH91We72JdddjcBMnWKWY5hBgx9B9Gi3akiToWEsdpa7gG5La7ZU",
  );
  return accountSender;
};

const testHandleScanCoins = async () => {
  console.log("testHandleScanCoins ....");
  try {
    const accountSender = await getAccount();
    console.log("accountSender ", { bb: accountSender, aa: accountSender.getPaymentAddress() });

    // Scanned coins storage before, first time scan coins will be null
    const coinsStore = await accountSender.getStorageCoinsScan();
    console.log("SCAN COINS STEP 1: ", coinsStore, TESTNET_TOKENS);
    const data = await accountSender.scanCoins({ tokenList: TESTNET_TOKENS });
    console.log("data ", data);
    // start scan coins
    // const { elapsed, result } = await measure(accountSender, "scanCoins", {
    //   tokenList: TESTNET_TOKENS,
    // });
    // console.log("SCAN COINS STEP 2: ", { elapsed, ...result });
  } catch (error) {
    console.log("SCAN COINS ERROR: ", error);
  }
};

export { testHandleScanCoins, FULL_NODE, TESTNET_TOKENS };
