import rootReducers, { superRootReducer } from "@redux/reducers/index";
import { AppThunkDispatch } from "@redux/store/index";
import { configureStore } from "@reduxjs/toolkit";
import { Store } from "redux";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunkMiddleware from "redux-thunk";
// import Storage from "@services/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { RootState } from "@redux/reducers";

export default function configStore(preloadedState?: any): Store {
  const middlewares = [thunkMiddleware, logger];
  const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["scanCoinsReducer", "configReducer"],
    blacklist: [],
    stateReconciler: autoMergeLevel2,
  };
  const persistedReducer = persistReducer(persistConfig, superRootReducer as any);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: middlewares,
    preloadedState,
  });
  return store;
}

const store = configStore();
const dispatch: AppThunkDispatch = store.dispatch;
const persistor = persistStore(store);

export { store, persistor, dispatch };
