import { createSelector } from "reselect";
import { RootState } from "@redux/reducers";
import { getPrivacyDataByTokenID, selectedPrivacyToken } from "@redux/selectedPrivacy";
import { ISignTransactionData } from "@module/SignTransaction/SignTransaction.types";
import { getSignTransactionData } from "@module/SignTransaction/SignTransaction.utils";

export const signTransactionSelector = createSelector(
  (state: RootState) => state.signTransactionReducer,
  (signTransaction) => signTransaction,
);

export const signDataSelector = createSelector(
  signTransactionSelector,
  selectedPrivacyToken,
  getPrivacyDataByTokenID,
  (state: RootState) => state,
  (sign, selectedPrivacy, getDataByTokenID, state): ISignTransactionData =>
    getSignTransactionData({
      sign,
      selectedPrivacy,
      getDataByTokenID,
      state,
    }),
);
