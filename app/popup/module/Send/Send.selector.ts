import { createSelector } from "reselect";
import { RootState } from "@redux/reducers";
import { selectedPrivacyToken } from "@redux/selectedPrivacy";
import { getSendData } from "@module/Send/Send.utils";

export const sendSelector = createSelector(
  (state: RootState) => state.sendReducer,
  (send) => send,
);

export const sendDataSelector = createSelector(
  sendSelector,
  selectedPrivacyToken,
  (state: RootState) => state,
  (send, selectedPrivacy, state): any =>
    getSendData({
      send,
      selectedPrivacy,
      state,
    }),
);
