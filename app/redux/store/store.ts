import rootReducers, { superRootReducer } from "@redux/reducers/index";
import { AppThunkDispatch } from "@redux/store/index";
import { configureStore } from "@reduxjs/toolkit";
import { Store } from "redux";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunkMiddleware from "redux-thunk";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
// import Storage from "@services/storage";
export default function configStore(preloadedState?: any): Store | any {
  console.log("configStore ---- ");
  const middlewares = [thunkMiddleware];
  const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["scanCoinsReducer", "configReducer"],
    blacklist: [],
    stateReconciler: autoMergeLevel2,
  };
  const persistedReducer = persistReducer(persistConfig, superRootReducer);
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
