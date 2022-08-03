import "./lib/window-polyfill";
import { store, persistor, dispatch } from "@redux/store/store";
import { enableLogger } from "@core/utils";
import { ENVIRONMENT_TYPE_NOTIFICATION, ENVIRONMENT_TYPE_POPUP, StoredData, VersionedData } from "@core/types";
import { createLogger, isInternalProcess } from "@core/utils";
import LocalStore from "./lib/local-store";
import IncognitoController from "./incognito.controller";
import { initialState } from "./store";
import Storage from "@services/storage";
import { actionFreeData } from "@module/Send";
import { FULL_NODE, TESTNET_TOKENS } from "./MainRoute.constants";
const {
  newMnemonic,
  PrivacyVersion,
  Account,
  Wallet,
  PRVIDSTR,
  ACCOUNT_CONSTANT,
} = require("incognito-chain-web-js/build/web/wallet");
Storage.logAll();
const { init } = require("incognito-chain-web-js/build/web/wallet");

console.log("Background running ... ", Math.random().toFixed(2));
console.log("STORE ", store);
console.log("STATE ", store.getState());
window.store = store;

console.log("Background running 2 window ", window);
// window.persistor = {};
// const PortStream = require("extension-port-stream");
// const endOfStream = require("end-of-stream");

// const localStore = new LocalStore();
// let versionedData: VersionedData;

// console.log("Background running ... ", Math.random().toFixed(1));

initialize().catch((err) => {
  console.log("Background initialization failed: %O", err);
});

async function initialize() {
  await loadWasmConfig();
  // await loadStoreRedux();
  // const versionedData = await loadStateFromPersistence();
  // setupController(versionedData).then();
}

async function loadWasmConfig(): Promise<void | Error> {
  try {
    // new method load wasm
    // await init(null, 8);
    const privacyWasmUrl = chrome.runtime.getURL("assets/privacy.wasm");
    console.log("privacyWasmUrl ", privacyWasmUrl);
    await init(privacyWasmUrl, 8);
    // handleScanCoins();
  } catch (error) {
    console.log("loadWasmConfig Error ", error);
  }
}
const getAccount = async () => {
  let accountSender = new Account({});
  accountSender.setRPCClient(FULL_NODE);
  accountSender.setStorageServices(Storage);
  await accountSender.setKey(
    "112t8rnXnr1knsAk4Lr3UbmtsiDRu6Hv3csgj5VMpazVARHXCEWVxDXfHH91We72JdddjcBMnWKWY5hBgx9B9Gi3akiToWEsdpa7gG5La7ZU",
  );
  return accountSender;
};

// async function loadStoreRedux(): Promise<void> {
//   try {
//     setTimeout(() => {
//       return Promise.resolve();
//     }, 1000);
//   } catch (error) {
//     return Promise.resolve();
//   }
// }

// async function loadStateFromPersistence(): Promise<any> {
//   const data = await localStore.getData();
//   if (!data) {
//     versionedData = { version: "1.0", data: initialState };
//     log("Incognito Empty vault found defaulting to initial state");
//   } else {
//     log("Incognito restoring vault");
//     versionedData = data;
//   }
//   return versionedData;
// }

// function setupController(versionedData: VersionedData) {
//   log("Setting up controller initial state: %O", versionedData);

//   const persistData = async (data: StoredData): Promise<boolean> => {
//     if (!data) {
//       throw new Error("Incognito - updated state does not have data");
//     }
//     versionedData.data = data;
//     if (localStore.isSupported) {
//       try {
//         await localStore.set(versionedData);
//         return true;
//       } catch (err) {
//         log("error setting state in local store:", err);
//         return false;
//       }
//     }
//     return false;
//   };

//   const incognitoController = new IncognitoController({
//     storedData: versionedData.data,
//     persistData: persistData,
//   });

//   function connectRemote(remotePort: chrome.runtime.Port) {
//     const processName = remotePort.name;
//     const tabId = remotePort.sender?.tab?.id;
//     const url = new URL(remotePort.sender?.url || "");
//     const { origin } = url;

//     if (isInternalProcess(processName)) {
//       const portStream = new PortStream(remotePort);
//       log(`connect internal process: %o`, {
//         processName: processName,
//         tabId: tabId,
//         url: url,
//         origin: origin,
//       });
//       incognitoController.setupTrustedCommunication(processName, portStream, remotePort.sender);
//       if (processName === ENVIRONMENT_TYPE_POPUP) {
//         incognitoController.setPopupOpen();
//         endOfStream(portStream, () => {
//           incognitoController.setPopupClose();
//           log("Popup remote stream has ended");
//         });
//       }

//       if (processName === ENVIRONMENT_TYPE_NOTIFICATION) {
//         endOfStream(portStream, () => {
//           log("Notification remote stream has ended");
//         });
//       }
//     } else if (remotePort.sender && remotePort.sender.tab && remotePort.sender.url) {
//       const tabId = remotePort.sender.tab.id;
//       const url = new URL(remotePort.sender.url);
//       const { origin } = url;
//       log(`connect remote process: %o`, {
//         processName: remotePort.name,
//         tabId: tabId,
//         url: url,
//         origin: origin,
//       });
//       remotePort.onMessage.addListener((msg) => {
//         log("received message from remote port [%s]: %O}", remotePort.name, msg);
//       });
//       connectExternal(remotePort);
//     }
//   }

//   function connectExternal(remotePort: chrome.runtime.Port) {
//     const portStream = new PortStream(remotePort);
//     incognitoController.setupUntrustedCommunication(portStream, remotePort.sender);
//   }

//   chrome.runtime.onConnect.addListener(connectRemote);
//   chrome.runtime.onConnectExternal.addListener(connectExternal);
//   chrome.runtime.onConnect.addListener(function (port) {
//     if (port.name === "notification") {
//       port.onDisconnect.addListener(function () {
//         incognitoController.actionManager.deleteCurrentAction();
//         dispatch(actionFreeData());
//       });
//     }
//   });
//   return Promise.resolve();
// }
const handleScanCoins = async () => {
  console.log("handleScanCoins ....");
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

export default {};
