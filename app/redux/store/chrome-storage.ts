// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
import { superRootReducer } from "@redux/reducers/index";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import storeCreatorFactory from "reduxed-chrome-storage";
import { persistStore } from "redux-persist";

const STORAGE_AREA = "local";
const NAMESPACE = "LocalStorage";
const STORAGE_KEY = "redux-storage";

let store: any = undefined;

// const getReduxStore = async () => {};

export default async () => {
  const options = {
    createStore,
    namespace: NAMESPACE,
    storageArea: STORAGE_AREA,
    storageKey: STORAGE_KEY,
  };
  const asyncStoreCreator = storeCreatorFactory(options);
  if (!store) store = await asyncStoreCreator(superRootReducer, applyMiddleware(thunkMiddleware, logger));

  let persistor = persistStore(store);
  return { store, persistor };
};
