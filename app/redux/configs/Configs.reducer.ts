import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import Storage from "@services/storage";

export enum ConfigsActionType {
  UPDATE_NETWORK = "[configs] Update network",
}

export interface IConfigsState {
  language: string;
  network: string;
}

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
): any => {
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
