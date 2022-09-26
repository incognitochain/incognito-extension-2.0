import React from "react";
import { useLoading } from "@popup/context/loading";
import { useDispatch } from "react-redux";
import { useBackground } from "@popup/context/background";
import { throttle } from "lodash";
import rpcMetric, { METRIC_TYPE } from "@services/wallet/rpcMetric";
import { change } from "redux-form";
import { FORM_CONFIGS as SIGN_FORM_CONFIGS } from "@module/SignTransaction/SignTransaction.constant";
const { PrivacyVersion } = require("incognito-chain-web-js/build/web/wallet");

export interface TInner {
  handleSendAnonymously: () => any;
}

const enhanceSignTxs = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const { showLoading } = useLoading();
  const { popupState, request } = useBackground();
  const dispatch = useDispatch();
  const action = popupState && popupState.actions && popupState.actions[0];
  const updateMetric = () => rpcMetric.updateMetric({ type: METRIC_TYPE.CONFIRM_SWAP });

  const { info, prvPayments, tokenPayments, tokenID, metadata, networkFee, txType, isSignAndSendTransaction } = props;
  const handleSendCrypto = throttle(async () => {
    try {
      showLoading({ value: true });
      updateMetric().then();
      await request("popup_authoriseTransaction", {
        actionKey: action?.key,
        isSignAndSendTransaction,
        fee: networkFee,
        tokenID,
        txType,
        version: PrivacyVersion.ver3,
        prvPayments,
        tokenPayments,
        metadata,
        info,
      });
    } catch (e) {
      showLoading({ value: false });
    } finally {
      showLoading({ value: false });
      setTimeout(() => {
        dispatch(change(SIGN_FORM_CONFIGS.formName, SIGN_FORM_CONFIGS.amount, ""));
        window.close();
      }, 1000);
    }
  }, 2000);
  return <WrappedComponent {...{ ...props, handleSendCrypto }} />;
};

export default enhanceSignTxs;
