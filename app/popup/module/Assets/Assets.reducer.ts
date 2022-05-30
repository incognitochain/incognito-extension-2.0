import { Reducer } from "redux";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { AssetsActions, IAssetsState } from "@module/Assets/Assets.types";
import { AssetsActionType } from "@module/Assets/Assets.constant";
import storage from "redux-persist/lib/storage";

export const initialState: IAssetsState = {
  isFetching: false,
};

const reducer: Reducer<IAssetsState, AssetsActions> = (state = initialState, action: AssetsActions) => {
  switch (action.type) {
    case AssetsActionType.FETCHING: {
      // Scanning coins
      const { isFetching } = action.payload;
      return {
        ...state,
        isFetching,
      };
    }
    default:
      return state;
  }
};

const persistConfig: any = {
  key: "assets",
  storage: storage,
  whitelist: [""],
  stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, reducer);
