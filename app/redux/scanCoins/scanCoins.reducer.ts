import { Reducer } from "redux";
import { ScanCoinsActions, IScanCoinsState } from "@redux/scanCoins/scanCoins.types";
import { ScanCoinsActionType } from "@redux/scanCoins/scanCoins.constants";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

export const initialState: IScanCoinsState = {
  isFetching: false,
  scanStatus: {},
};

export const reducer: Reducer<IScanCoinsState, ScanCoinsActions> = (state = initialState, action: ScanCoinsActions) => {
  switch (action.type) {
    case ScanCoinsActionType.FETCHING: {
      // Scanning coins
      const { isFetching } = action.payload;
      return {
        ...state,
        isFetching,
      };
    }
    case ScanCoinsActionType.FIRST_TIME_SCAN_COINS: {
      // blocking popup when first time scan coins
      const { isScanning, otaKey } = action.payload;
      return {
        ...state,
        scanStatus: {
          ...state.scanStatus,
          [otaKey]: {
            isScanning,
            otaKey,
          },
        },
      };
    }
    case ScanCoinsActionType.RESCAN_COINS: {
      const { keyDefine } = action.payload;
      let scanStatus = state.scanStatus;
      if (scanStatus && scanStatus[keyDefine]) {
        delete scanStatus[keyDefine];
      }
      return {
        ...state,
        scanStatus: {
          ...scanStatus,
        },
      };
    }
    case ScanCoinsActionType.FREE_DATA: {
      return {
        isFetching: false,
        scanStatus: {},
      };
    }
    default:
      return state;
  }
};

const persistConfig: any = {
  key: "scanCoinsReducer",
  storage: Storage,
  whitelist: ["scanStatus"],
  stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, reducer);
