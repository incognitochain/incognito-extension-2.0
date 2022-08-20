import "./lib/window-polyfill";
import "./background-keep-alive";
import { ENVIRONMENT_TYPE_NOTIFICATION, ENVIRONMENT_TYPE_POPUP, StoredData, VersionedData } from "@core/types";
import { isInternalProcess } from "@core/utils";
import { actionFreeData } from "@module/Send/Send.actions";
import { getReduxSyncStorage } from "@redux-sync-storage/store/store";
import Storage from "@services/storage";
import IncognitoController from "./incognito.controller";
import LocalStore from "./lib/local-store";
import { initialState } from "./store";
import { testHandleScanCoins } from "./test/scanCoin";
import { store } from "@redux/store/store";
const { init } = require("incognito-chain-web-js/build/web/wallet");
const PortStream = require("extension-port-stream");
const endOfStream = require("end-of-stream");

const localStore = new LocalStore();
let versionedData: VersionedData;

let reduxSyncStorage: any;
let reduxStore: any;

initialize().catch((err) => {
  console.log("Background initialization failed: %O", err);
});

async function initialize() {
  await Storage.logAll();
  console.log("Background initialization ");
  const { reduxSyncStorage: reduxSyncStorageInstance } = await getReduxSyncStorage();
  reduxSyncStorage = reduxSyncStorageInstance;
  reduxStore = store;

  console.log("Background reduxSyncStore STATE: ", reduxSyncStorage.getState());
  console.log("Background reduxStore STATE: ", reduxStore.getState());

  await loadWasmConfig();
  await loadStoreRedux();
  const versionedData = await loadStateFromPersistence();

  // testHandleScanCoins();
  // testAction();
  // reduxStore.dispatch(testModelAction());
  setupController(versionedData).then();
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

async function loadWasmConfig(): Promise<void | Error> {
  try {
    // new method load wasm
    // await init(null, 8);
    const privacyWasmUrl = chrome.runtime.getURL("assets/privacy.wasm");
    await init(privacyWasmUrl, 8);
  } catch (error) {
    console.log("loadWasmConfig Error ", error);
  }
}

async function loadStateFromPersistence(): Promise<any> {
  const localData = await localStore.getData();
  const dataVersion = await Storage.getItem("data");

  console.log("DATA ", localData);
  console.log("dataVersion ", dataVersion);

  if (!localData || !dataVersion) {
    versionedData = { ...localData, version: "1.0", data: initialState };
    console.log("Incognito Empty vault found defaulting to initial state");
  } else {
    versionedData = { ...localData };
    if (dataVersion) {
      versionedData.data = { ...dataVersion };
    } else {
      versionedData.data = initialState;
    }
  }
  return versionedData;
}

function setupController(versionedData: VersionedData) {
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
        console.log("error setting state in local store:", err);
        return false;
      }
    }
    return false;
  };

  const incognitoController = new IncognitoController({
    storedData: versionedData.data,
    persistData: persistData,
    reduxSyncStorage: reduxSyncStorage,
  });

  function connectRemote(remotePort: chrome.runtime.Port) {
    // console.log("connectRemote remotePort ", remotePort);
    const processName = remotePort.name;
    const tabId = remotePort.sender?.tab?.id;
    const url = new URL(remotePort.sender?.url || "");
    const { origin } = url;

    if (isInternalProcess(processName)) {
      const portStream = new PortStream(remotePort);
      // console.log(`connect internal process: %o`, {
      //   processName: processName,
      //   tabId: tabId,mm
      //   url: url,
      //   origin: origin,
      // });
      incognitoController.setupTrustedCommunication(processName, portStream, remotePort.sender);
      if (processName === ENVIRONMENT_TYPE_POPUP) {
        incognitoController.setPopupOpen();
        endOfStream(portStream, () => {
          incognitoController.setPopupClose();
          console.log("Popup remote stream has ended");
        });
      }

      if (processName === ENVIRONMENT_TYPE_NOTIFICATION) {
        endOfStream(portStream, () => {
          console.log("Notification remote stream has ended");
        });
      }
    } else if (remotePort.sender && remotePort.sender.tab && remotePort.sender.url) {
      const tabId = remotePort.sender.tab.id;
      const url = new URL(remotePort.sender.url);
      const { origin } = url;
      // console.log(`connect remote process: %o`, {
      //   processName: remotePort.name,
      //   tabId: tabId,
      //   url: url,
      //   origin: origin,
      // });
      remotePort.onMessage.addListener((msg) => {
        console.log("received message from remote port [%s]: %O}", remotePort.name, msg);
      });
      connectExternal(remotePort);
    }
  }

  function connectExternal(remotePort: chrome.runtime.Port) {
    // console.log("connectExternal remotePort ", remotePort);
    const portStream = new PortStream(remotePort);
    incognitoController.setupUntrustedCommunication(portStream, remotePort.sender);
  }

  chrome.runtime.onConnect.addListener(connectRemote);
  chrome.runtime.onConnectExternal.addListener(connectExternal);
  chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === "notification") {
      port.onDisconnect.addListener(function () {
        incognitoController.actionManager.deleteCurrentAction();
        reduxStore.dispatch(actionFreeData());
      });
    }
  });
  return Promise.resolve();
}
export {};
