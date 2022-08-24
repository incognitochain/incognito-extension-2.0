import { createSelector } from "reselect";
import {
  getPrivacyDataByTokenID,
  selectedPrivacyToken,
} from "@redux-sync-storage/selectedPrivacy/selectedPrivacy.selectors";
import { getSendData } from "@module/Send/Send.utils";
import { ISendData } from "@module/Send/Send.types";
import { RootState } from "@redux-sync-storage/reducers/index";

export const sendSelector = createSelector(
  (state: RootState) => state.sendReducer,
  (send) => send,
);

export const sendDataSelector = createSelector(
  sendSelector,
  selectedPrivacyToken,
  getPrivacyDataByTokenID,
  (state: RootState) => state,
  (send, selectedPrivacy, getDataByTokenID, state): ISendData =>
    getSendData({
      send,
      selectedPrivacy,
      getDataByTokenID,
      state,
    }),
);
