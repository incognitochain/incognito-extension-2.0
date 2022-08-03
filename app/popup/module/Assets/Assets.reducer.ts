import { Reducer } from "redux";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { AssetsActions, IAssetsState } from "@module/Assets/Assets.types";
import { AssetsActionType } from "@module/Assets/Assets.constant";
// import storage from "redux-persist/lib/storage";
import Storage from "@services/storage";
export const initialState: IAssetsState = {
  isFetching: false,
  data: {},
};

const reducer: Reducer<IAssetsState, AssetsActions> = (state = initialState, action: AssetsActions) => {
  switch (action.type) {
    case AssetsActionType.FETCHING: {
      // Getting balance
      const { isFetching } = action.payload;
      return {
        ...state,
        isFetching,
      };
    }
    case AssetsActionType.FETCHED: {
      // Got balance
      const { balance, OTAKey } = action.payload;
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          [OTAKey]: balance,
        },
      };
    }
    case AssetsActionType.FREE_DATA: {
      return {
        ...state,
        isFetching: false,
        data: {},
      };
    }
    default:
      return state;
  }
};

const persistConfig: any = {
  key: "assetsReducer",
  storage: Storage as any,
  whitelist: [""],
  stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, reducer);
