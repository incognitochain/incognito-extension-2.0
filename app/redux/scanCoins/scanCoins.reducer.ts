import { Reducer } from "redux";
import { ScanCoinsActions, ScanCoinsState } from "@redux/scanCoins/scanCoins.types";
import { ScanCoinsActionType } from "@redux/scanCoins/scanCoins.constants";

export const initialState: ScanCoinsState = {
  isFetching: false,
};

export const reducer: Reducer<ScanCoinsState, ScanCoinsActions> = (state = initialState, action: ScanCoinsActions) => {
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
        isScanning,
        otaKey,
      };
    }
    default:
      return state;
  }
};
