// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
import rootReducers from "@redux-sync-storage/reducers/index";
import { Action, applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import storeCreatorFactory from "reduxed-chrome-storage";

const STORAGE_AREA = "local";
const NAMESPACE = "LocalStorage";
const STORAGE_KEY = "redux-sync-storage";
const ACTION_HANDLE_TIME = 500;

let reduxSyncStorage: any;

const getReduxSyncStorage = async () => {
  console.log("[getReduxSyncStorage] reduxSyncStorage ", reduxSyncStorage);
  if (!reduxSyncStorage) {
    const options = {
      createStore,
      namespace: NAMESPACE,
      storageArea: STORAGE_AREA,
      storageKey: STORAGE_KEY,
    };
    const asyncStoreCreator = storeCreatorFactory(options);
    reduxSyncStorage = await asyncStoreCreator(rootReducers, applyMiddleware(thunkMiddleware, logger));
  }

  return { reduxSyncStorage };
};

const actionHandler = (action: Action) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      if (!reduxSyncStorage) await getReduxSyncStorage();
      setTimeout(async () => {
        await reduxSyncStorage.dispatch(action);
        resolve(true);
      }, ACTION_HANDLE_TIME);
    } catch (error) {
      reject(error);
    }
  });
};

export { getReduxSyncStorage, actionHandler };
