import { Reducer } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { ConfigsActionType, IConfigsState } from "@popup/configs";
// import storage from "redux-persist/lib/storage";
import Storage from "@services/storage";

const initialState: IConfigsState = {
  language: "en",
  network: "",
};

const configReducer = (
  state = initialState,
  action: {
    type: string;
    payload: any;
  },
): Reducer & any => {
  switch (action.type) {
    case ConfigsActionType.UPDATE_NETWORK:
      const { network } = action.payload;
      return {
        ...state,
        network,
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "configReducer",
  storage: Storage as any,
  whitelist: ["network"],
  stateReconciler: autoMergeLevel2,
};

// export default persistReducer(persistConfig, configReducer);
export default configReducer;
