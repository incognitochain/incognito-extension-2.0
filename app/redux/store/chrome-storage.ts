// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
import rootReducers, { superRootReducer } from "@redux/reducers/index";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import storeCreatorFactory from "reduxed-chrome-storage";

const STORAGE_AREA = "local";
const NAMESPACE = "LocalStorage";
const STORAGE_KEY = "redux-storage";

const getReduxSyncStorage = async () => {
  const options = {
    createStore,
    namespace: NAMESPACE,
    storageArea: STORAGE_AREA,
    storageKey: STORAGE_KEY,
  };
  const asyncStoreCreator = storeCreatorFactory(options);
  // const reduxSyncStorage = await asyncStoreCreator(rootReducers, applyMiddleware(thunkMiddleware, logger));
  const reduxSyncStorage = await asyncStoreCreator(rootReducers, applyMiddleware(thunkMiddleware));
  return { reduxSyncStorage };
};

export { getReduxSyncStorage };
