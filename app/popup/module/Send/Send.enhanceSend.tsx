import React from "react";
import { useLoading } from "@popup/context/loading";
import { useDispatch, useSelector } from "react-redux";
import { defaultAccountWalletSelector } from "@redux/account/account.selectors";
import { route as routeConfirmTx } from "@module/Send/features/ConfirmTx/ConfirmTx.route";
import { getConfirmTxBuilder } from "@module/Send/features/ConfirmTx/ConfirmTx.utils";
import { sendDataSelector } from "@module/Send/Send.selector";
import { useHistory } from "react-router-dom";
import { useCallAsync } from "@popup/utils/notifications";
import { useBackground } from "@popup/context/background";
import rpcMetric, { METRIC_TYPE } from "@services/wallet/rpcMetric";
import { AppThunkDispatch } from "@redux/store";
import convert from "@utils/convert";

const { PrivacyVersion, ACCOUNT_CONSTANT } = require("incognito-chain-web-js/build/web/wallet");

export interface TInner {
  handleSendAnonymously: () => any;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  // const accountSender = useSelector(defaultAccountWalletSelector);
  const updateMetric = () => rpcMetric.updateMetric({ type: METRIC_TYPE.SEND });

  const { inputMemo, networkFeeAmount, isMainCrypto, selectedPrivacy, networkFeeToken, tokenPDecimals } =
    useSelector(sendDataSelector);

  const { amountValue, addressValue, memoValue } = props;

  const { showLoading } = useLoading();
  const history = useHistory();
  const dispatch: AppThunkDispatch = useDispatch();

  const callAsync = useCallAsync();
  const { request } = useBackground();

  const handleSendAnonymously = async () => {
    try {
      updateMetric().then();
      showLoading({ value: true });

      const inputOriginalAmount = convert
        .toOriginalAmount({
          humanAmount: `${convert.toNumber({ text: amountValue, autoCorrect: true }) || 0}`,
          decimals: tokenPDecimals,
        })
        .toString();

      let payload: any = {
        fee: networkFeeAmount,
        info: memoValue,
        txType: ACCOUNT_CONSTANT.TX_TYPE.SEND,
        tokenID: selectedPrivacy?.tokenId,
        version: PrivacyVersion.ver3,
      };
      if (isMainCrypto) {
        payload = {
          ...payload,
          prvPayments: [
            {
              PaymentAddress: addressValue,
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
              PaymentAddress: addressValue,
              Amount: inputOriginalAmount,
              Message: memoValue,
            },
          ],
        };
      }

      // console.log("payload === ", payload);

      await callAsync(request("popup_create_and_send_transaction", { isMainCrypto, payload }), {
        onSuccess: (result: any) => {
          const { reqResponse: tx } = result.result;
          console.log("SEND RESULT: ", result);
          if (!tx) return;
          const confirmData = getConfirmTxBuilder({
            tx,
            address: addressValue,
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
