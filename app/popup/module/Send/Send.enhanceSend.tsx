import React from "react";
import { useLoading } from "@popup/context/loading";
import { useSelector } from "react-redux";
import { defaultAccountWalletSelector } from "@redux/account/account.selectors";
import { getConfirmTxBuilder, route as routeConfirmTx } from "@module/Send/features/ConfirmTx";
import { sendDataSelector } from "@module/Send/Send.selector";
import { useHistory } from "react-router-dom";
import { useCallAsync } from "@popup/utils/notifications";
import { useBackground } from "@popup/context/background";
import rpcMetric, { METRIC_TYPE } from "@services/wallet/rpcMetric";
const { PrivacyVersion, ACCOUNT_CONSTANT } = require("incognito-chain-web-js/build/web/wallet");

export interface TInner {
  handleSendAnonymously: () => any;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const accountSender = useSelector(defaultAccountWalletSelector);
  const updateMetric = () => rpcMetric.updateMetric({ type: METRIC_TYPE.SEND });

  const {
    inputMemo,
    networkFeeAmount,
    inputAddress,
    inputOriginalAmount,
    isMainCrypto,
    selectedPrivacy,
    disabledForm,
    networkFeeToken,
  } = useSelector(sendDataSelector);
  const { showLoading } = useLoading();
  const history = useHistory();

  const callAsync = useCallAsync();
  const { request } = useBackground();

  const handleSendAnonymously = async () => {
    try {
      if (!inputOriginalAmount || !inputAddress || disabledForm) {
        return;
      }
      updateMetric().then();
      showLoading({ value: true });
      let payload: any = {
        accountSender,
        fee: networkFeeAmount,
        info: inputMemo,
        txType: ACCOUNT_CONSTANT.TX_TYPE.SEND,
        tokenID: selectedPrivacy?.tokenId,
        version: PrivacyVersion.ver3,
      };
      if (isMainCrypto) {
        payload = {
          ...payload,
          prvPayments: [
            {
              PaymentAddress: inputAddress,
              Amount: inputOriginalAmount,
              Message: inputMemo,
            },
          ],
        };
      } else {
        // Handle send privacy token
        payload = {
          ...payload,
          tokenID: selectedPrivacy?.tokenId,
          tokenPayments: [
            {
              PaymentAddress: inputAddress,
              Amount: inputOriginalAmount,
              Message: inputMemo,
            },
          ],
        };
      }

      await callAsync(request("popup_create_and_send_transaction", { isMainCrypto, payload }), {
        onSuccess: (result: any) => {
          const { reqResponse: tx } = result.result;
          console.log("SEND RESULT: ", result);
          if (!tx) return;
          const confirmData = getConfirmTxBuilder({
            tx,
            address: inputAddress,
            amount: inputOriginalAmount,
            networkFee: networkFeeAmount,
            networkFeeToken: networkFeeToken,
            sendToken: selectedPrivacy,
          });
          history.push(routeConfirmTx, { confirmTx: confirmData });
        },
        onError: (error) => {
          console.log("SEND ERROR: ", error);
        },
        onFinish: () => {
          showLoading({ value: false });
          console.log("SEND FINISH: ");
        },
      });
    } catch (e) {
      showLoading({ value: false });
    } finally {
      showLoading({ value: false });
    }
  };
  return <WrappedComponent {...{ ...props, handleSendAnonymously }} />;
};

export default enhance;
