import { camelCase } from "lodash";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";

export interface IConfigStore {
  store: any;
  persistor: any;
}

const isMainnet = true;

export const configStore = (preloadedState: any = {}) => {
  const requireModule = require.context("../../popup", true, /\.reducer.ts/); // extract [reducerName].reducer.ts files inside redux folder
  const reducers: any = {};
  requireModule.keys().forEach((fileName: any) => {
    try {
      const reducerName = camelCase(fileName?.match(/(\w{1,})(.reducer.ts)/)[1]);
      reducers[reducerName] = requireModule(fileName).default;
    } catch (error) {
      console.debug(`ERROR`, error);
    }
  });
  const rootReducers = combineReducers({
    ...reducers,
  });
  const persistConfig = {
    key: "root",
    storage,
    whitelist: [],
    blacklist: ["config"],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducers);
  const middlewareEnhancer = isMainnet ? [thunk] : [thunk, logger];
  const store: any = configureStore({
    reducer: persistedReducer,
    middleware: middlewareEnhancer,
    preloadedState,
  });
  const persistor = persistStore(store);
  return { store, persistor };
};
