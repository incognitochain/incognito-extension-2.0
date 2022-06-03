import {
  SendFetchingAction,
  SendFetchingPayload,
  SendActionTypes,
  SendSetMaxPRVFeePayload,
  SendSetMaxPRVFeeAction,
  SendSetMaxPTokenFeePayload,
  SendSetMaxPTokenFeeAction,
} from "@module/Send";

const actionInit = () => ({
  type: SendActionTypes.INIT,
});

const actionSendFetching = (payload: SendFetchingPayload): SendFetchingAction => ({
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

export { actionInit, actionSendFetching, actionFetchedMaxNativeFee, actionFetchedMaxPTokenFee };
