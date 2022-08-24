import {
  // SendActionTypes,
  SendFetchingAction,
  SendFetchingPayload,
  SendFreeDataAction,
  SendSetBurnFeeAction,
  SendSetBurnFeePayload,
  SendSetInitFormAction,
  SendSetInitFormPayload,
  SendSetNetworkFeeAction,
  SendSetNetworkFeePayload,
  SendSetUnshieldAction,
  SendSetUnshieldPayload,
} from "@module/Send/Send.types";
import { AppThunkDispatch } from "@redux/store";
import { RootState } from "@redux/reducers";
import { sendDataSelector } from "@module/Send/Send.selector";
import { batch } from "react-redux";
import { SendActionTypes } from "@module/Send/Send.constant";
const { PRVIDSTR, ACCOUNT_CONSTANT } = require("incognito-chain-web-js/build/web/wallet");

const actionFetching = (payload: SendFetchingPayload): SendFetchingAction => ({
  type: SendActionTypes.FETCHING,
  payload,
});

const actionSetNetworkFee = (payload: SendSetNetworkFeePayload): SendSetNetworkFeeAction => ({
  type: SendActionTypes.SET_NETWORK_FEE,
  payload,
});

const actionSetBurnFee = (payload: SendSetBurnFeePayload): SendSetBurnFeeAction => ({
  type: SendActionTypes.SET_BURN_FEE,
  payload,
});

const actionSetInitForm = (payload: SendSetInitFormPayload): SendSetInitFormAction => ({
  type: SendActionTypes.SET_INIT_FORM,
  payload,
});

const actionFetchFee = () => async (dispatch: AppThunkDispatch, getState: () => RootState) => {
  const state = getState();
  // const { init, isFetching } = sendDataSelector(state);
  const { init, isFetching } = {
    init: true,
    isFetching: false,
  }; //HARD CODE, WILL CHANGE AFTER

  try {
    if (init || isFetching) return;
    batch(() => {
      dispatch(actionFetching({ isFetching: true }));
      dispatch(
        actionSetNetworkFee({
          networkFee: ACCOUNT_CONSTANT.MAX_FEE_PER_TX,
          networkFeeToken: PRVIDSTR,
        }),
      );
      dispatch(actionSetInitForm({ init: true }));
    });
  } catch (error) {
    throw error;
  } finally {
    dispatch(actionFetching({ isFetching: false }));
  }
};

const actionFreeData = (): SendFreeDataAction => ({
  type: SendActionTypes.FREE_DATA,
});

const actionSetUnshieldData = (payload: SendSetUnshieldPayload): SendSetUnshieldAction => ({
  type: SendActionTypes.UNSHIELD,
  payload,
});

export { actionFetching, actionSetBurnFee, actionFetchFee, actionFreeData, actionSetUnshieldData };
