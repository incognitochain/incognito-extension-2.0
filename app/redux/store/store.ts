import rootReducers, { superRootReducer } from "@redux/reducers/index";
import { AppThunkDispatch } from "@redux/store/index";
import { configureStore } from "@reduxjs/toolkit";
import { Store } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import Storage from "@services/storage";
import logger from "redux-logger";

export default function configStore(preloadedState?: any): Store | any {
  // const middlewares = [thunkMiddleware, logger];
  const middlewares = [thunkMiddleware];
  const persistConfig = {
    key: "root",
    storage: Storage as any,
    whitelist: ["scanCoinsReducer", "configReducer"],
    blacklist: [],
    stateReconciler: autoMergeLevel2,
  };
  const persistedReducer = persistReducer(persistConfig, superRootReducer);
  const store = configureStore({
    reducer: superRootReducer,
    middleware: middlewares,
    preloadedState,
  });
  return store;
}

const store = configStore();
const dispatch: AppThunkDispatch = store.dispatch;
const persistor = persistStore(store);

export { store, persistor, dispatch };
