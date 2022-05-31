import { store, persistor, dispatch } from "@redux/store/store";
import { enableLogger } from "@core/utils";
import { ENVIRONMENT_TYPE_NOTIFICATION, ENVIRONMENT_TYPE_POPUP, StoredData, VersionedData } from "@core/types";
import { createLogger, isInternalProcess } from "@core/utils";
import LocalStore from "./lib/local-store";
import IncognitoController from "./incognito.controller";
import { initialState } from "./store";
import { initMasterKey, importMasterKey } from "../redux/masterKey/masterKey.actions";

import { getBalance, scanCoins } from "@background/worker.scanCoins";
// import { workerGetCoins } from "@background/worker.getcoins";
import Storage from "@services/storage";
import { masterKeyReducerSelector } from "@redux/masterKey";
import { setInterval } from "timers";
import { actionFetchingScanCoins } from "@redux/scanCoins";
const { init } = require("incognito-chain-web-js/build/web/wallet");

window.store = store;
window.persistor = persistor;

const { gomobileServices } = require("incognito-chain-web-js/build/wallet");
const PortStream = require("extension-port-stream");
const endOfStream = require("end-of-stream");
const log = createLogger("sol:bg");

const localStore = new LocalStore();
let versionedData: VersionedData;

console.log("Background running ... ", Math.random().toFixed(1));

initialize().catch((err) => {
  log("Background initialization failed: %O", err);
});

async function initialize() {
  console.log({ store: store.getState(), persistor: persistor.getState() });
  enableLogger();
  await loadWasmConfig();
  await loadStoreRedux();

  dispatch(actionFetchingScanCoins({ isFetching: false }));

  scanCoins().then();
  setInterval(() => {
    scanCoins().then();
  }, 40000);

  // TODO: remove command
  // const versionedData = await loadStateFromPersistence();
  // await setupController(versionedData);
  const versionedData = await loadStateFromPersistence();
  setupController(versionedData);
  // workerGetCoins().then();
}

async function loadWasmConfig(): Promise<void | Error> {
  try {
    // new method load wasm
    await init(null, 8);

    // TODO: Remove load wasm
    // const wasmUrl = chrome.runtime.getURL("assets/privacy.wasm");
    // if (typeof gomobileServices.loadWasm === "function") {
    //   await gomobileServices.loadWasm(wasmUrl);
    // } else {
    //   return new Error("loadWasm something wrong");
    // }
  } catch (error) {
    console.log("loadWasmConfig Error ", error);
  }
}

async function loadStoreRedux(): Promise<void> {
  try {
    setTimeout(() => {
      return Promise.resolve();
    }, 1000);
  } catch (error) {
    return Promise.resolve();
  }
}

async function loadStateFromPersistence(): Promise<any> {
  const data = await localStore.getData();
  if (!data) {
    versionedData = { version: "1.0", data: initialState };
    log("Incognito Empty vault found defaulting to initial state");
  } else {
    log("Incognito restoring vault");
    versionedData = data;
  }
  return versionedData;
}

function setupController(versionedData: VersionedData) {
  log("Setting up controller initial state: %O", versionedData);

  const persistData = async (data: StoredData): Promise<boolean> => {
    if (!data) {
      throw new Error("Incognito - updated state does not have data");
    }
    versionedData.data = data;
    if (localStore.isSupported) {
      try {
        await localStore.set(versionedData);
        return true;
      } catch (err) {
        log("error setting state in local store:", err);
        return false;
      }
    }
    return false;
  };

  const incognitoController = new IncognitoController({
    storedData: versionedData.data,
    persistData: persistData,
  });

  function connectRemote(remotePort: chrome.runtime.Port) {
    const processName = remotePort.name;
    const tabId = remotePort.sender?.tab?.id;
    const url = new URL(remotePort.sender?.url || "");
    const { origin } = url;

    if (isInternalProcess(processName)) {
      const portStream = new PortStream(remotePort);
      log(`connect internal process: %o`, {
        processName: processName,
        tabId: tabId,
        url: url,
        origin: origin,
      });
      incognitoController.setupTrustedCommunication(processName, portStream, remotePort.sender);
      if (processName === ENVIRONMENT_TYPE_POPUP) {
        incognitoController.setPopupOpen();
        endOfStream(portStream, () => {
          incognitoController.setPopupClose();
          log("Popup remote stream has ended");
        });
      }

      if (processName === ENVIRONMENT_TYPE_NOTIFICATION) {
        endOfStream(portStream, () => {
          log("Notification remote stream has ended");
        });
      }
    } else if (remotePort.sender && remotePort.sender.tab && remotePort.sender.url) {
      const tabId = remotePort.sender.tab.id;
      const url = new URL(remotePort.sender.url);
      const { origin } = url;
      log(`connect remote process: %o`, {
        processName: remotePort.name,
        tabId: tabId,
        url: url,
        origin: origin,
      });
      remotePort.onMessage.addListener((msg) => {
        log("received message from remote port [%s]: %O}", remotePort.name, msg);
      });
      connectExternal(remotePort);
    }
  }

  function connectExternal(remotePort: chrome.runtime.Port) {
    const portStream = new PortStream(remotePort);
    incognitoController.setupUntrustedCommunication(portStream, remotePort.sender);
  }

  chrome.runtime.onConnect.addListener(connectRemote);
  chrome.runtime.onConnectExternal.addListener(connectExternal);

  return Promise.resolve();
}
