import "./lib/window-polyfill";
import "./background-keep-alive";
import { ENVIRONMENT_TYPE_NOTIFICATION, ENVIRONMENT_TYPE_POPUP, StoredData, VersionedData } from "@core/types";
import { isInternalProcess } from "@core/utils";
import { actionFreeData } from "@module/Send/Send.actions";
import { actionHandler, getReduxSyncStorage } from "@redux-sync-storage/store/store";
import Storage from "@services/storage";
import IncognitoController from "./incognito.controller";
import LocalStore from "./lib/local-store";
import { initialState } from "./store";
import { actionFreeSignTransactionData } from "@module/SignTransaction/SignTransaction.actions";
import { reset } from "redux-form";
import { FORM_CONFIGS as SEND_FORM_CONFIGS } from "@module/Send/Send.constant";
import { FORM_CONFIGS as SIGN_FORM_CONFIGS } from "@module/SignTransaction/SignTransaction.constant";
const { init } = require("incognito-chain-web-js/build/web/wallet");
const PortStream = require("extension-port-stream");
const endOfStream = require("end-of-stream");

const localStore = new LocalStore();
let versionedData: VersionedData;

let reduxSyncStorage: any;

initialize().catch((err) => {
  console.log("Background initialization failed: %O", err);
});

async function initialize() {
  // await Storage.logAll();
  const { reduxSyncStorage: reduxSyncStorageInstance } = await getReduxSyncStorage();
  reduxSyncStorage = reduxSyncStorageInstance;

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
      //   tabId: tabId,
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
      console.log(`connect remote process: %o`, {
        processName: remotePort.name,
        tabId: tabId,
        url: url,
        origin: origin,
      });
      // if (processName === "keepAlive") {
      //   return;
      // }
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
        const freeForm = () => {
          this.reduxSyncStorage.dispatch(actionFreeData());
          this.reduxSyncStorage.dispatch(actionFreeSignTransactionData());
          actionHandler(reset(SEND_FORM_CONFIGS.formName)).then();
          actionHandler(reset(SIGN_FORM_CONFIGS.formName)).then();
        };
        freeForm();
        setTimeout(() => {
          freeForm();
        }, 500);
        setTimeout(() => {
          freeForm();
        }, 1200);
      });
    }
  });
  return Promise.resolve();
}
export {};
