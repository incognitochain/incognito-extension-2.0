import { createSelector } from "reselect";
import { RootState } from "@redux/reducers";
import { getPrivacyDataByTokenID, selectedPrivacyToken } from "@redux/selectedPrivacy";
import { getSendData } from "@module/Send/Send.utils";
import { ISendData } from "@module/Send/Send.types";

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
