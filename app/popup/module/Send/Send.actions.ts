import {
  SendFetchingAction,
  SendFetchingPayload,
  SendActionTypes,
  SendSetMaxPRVFeePayload,
  SendSetMaxPRVFeeAction,
  SendSetMaxPTokenFeePayload,
  SendSetMaxPTokenFeeAction,
} from "@module/Send";
import { AppThunkDispatch } from "@redux/store";
import { RootState } from "@redux/reducers";
import SelectedPrivacy from "@model/SelectedPrivacyModel";
import { sendSelector } from "@module/Send/Send.selector";
import { selectedPrivacyToken } from "@redux/selectedPrivacy/selectedPrivacy.selectors";
import convert from "@utils/convert";
import BigNumber from "bignumber.js";

const MAX_FEE_PER_TX = 100;

const actionInit = () => ({
  type: SendActionTypes.INIT,
});

const actionFetching = (payload: SendFetchingPayload): SendFetchingAction => ({
  type: SendActionTypes.FETCHING,
  payload,
});

const actionFetchedMaxNativeFee = (payload: SendSetMaxPRVFeePayload): SendSetMaxPRVFeeAction => ({
  type: SendActionTypes.SET_MAX_NATIVE_FEE,
  payload,
});

const actionFetchedMaxPTokenFee = (payload: SendSetMaxPTokenFeePayload): SendSetMaxPTokenFeeAction => ({
  type: SendActionTypes.SET_MAX_PTOKEN_FEE,
  payload,
});

export const actionFetchFee =
  ({ amount, address, screen, memo }: { amount: string; address: string; screen: string; memo: string }) =>
  async (dispatch: AppThunkDispatch, getState: () => RootState) => {
    const state = getState();
    const selectedPrivacy: SelectedPrivacy = selectedPrivacyToken(state);
    const { init } = sendSelector(state);
    let feeEst = MAX_FEE_PER_TX;
    let feePTokenEst = 0;
    let minFeePTokenEst = 0;
    const originalAmount = convert.toOriginalAmount({
      humanAmount: amount,
      decimals: selectedPrivacy.pDecimals,
    });
    const bnAmount = new BigNumber(originalAmount);
    const requestedAmount = amount;
    const incognitoAmount = bnAmount.toString();
    let isAddressValidated = true;
    try {
      if (
        !init ||
        !amount ||
        !address ||
        !selectedPrivacy?.tokenId ||
        bnAmount.isLessThanOrEqualTo(0) ||
        bnAmount.isGreaterThan(new BigNumber(selectedPrivacy.amount)) ||
        bnAmount.isNaN()
      ) {
        return;
      }
      dispatch(actionFetching({ isFetching: true }));
      // await actionInitEstimateFee({ screen })(dispatch, getState);
      // if (selectedPrivacy.isToken) {
      //   // TODO: Check Valid address here
      //
      //   // const token = await account.getPrivacyTokenById(selectedPrivacy.tokenId, bridgeTokens, chainTokens);
      //   if (selectedPrivacy?.isWithdrawable && screen === "UnShield") {
      //     isAddressValidated = await token.bridgeWithdrawCheckValAddress({ address });
      //     if (isAddressValidated) {
      //       await actionFetchUserFees({ address, amount, memo, incognitoAmount, requestedAmount })(dispatch, getState);
      //     }
      //   }
      //   try {
      //     let feePTokenEstData = await token.getEstFeeFromNativeFee({
      //       nativeFee: feeEst,
      //     });
      //     feePTokenEst = feePTokenEstData;
      //     minFeePTokenEst = feePTokenEstData;
      //   } catch (e) {
      //     console.debug(e);
      //   }
      // }
    } catch (error) {
      throw error;
    } finally {
      // if (feeEst) {
      //   await actionEstNativeFee({
      //     feeEst,
      //   })(dispatch, getState);
      // }
      // if (feePTokenEst) {
      //   await actionEstPrivacyFee({ feePTokenEst })(dispatch, getState);
      // }
      // if (minFeePTokenEst) {
      //   await actionEstMinPrivacyFee({ minFeePTokenEst })(dispatch, getState);
      // }
      // await dispatch(actionFetchedValidAddr({ isAddressValidated }));
    }
  };

export { actionInit, actionFetching, actionFetchedMaxNativeFee, actionFetchedMaxPTokenFee };
