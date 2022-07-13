import React from "react";
import { useLoading } from "@popup/context/loading";
import { useSelector } from "react-redux";
import { defaultAccountWalletSelector } from "@redux/account/account.selectors";
import { getConfirmTxBuilder, route as routeConfirmTx } from "@module/Send/features/ConfirmTx";
import { sendDataSelector } from "@module/Send/Send.selector";
import { useHistory } from "react-router-dom";
import { useCallAsync } from "@popup/utils/notifications";
import { useBackground } from "@popup/context/background";
import { throttle } from "lodash";
const { PrivacyVersion, ACCOUNT_CONSTANT } = require("incognito-chain-web-js/build/web/wallet");

export interface TInner {
  handleSendAnonymously: () => any;
}

const enhanceUnshield = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const accountSender = useSelector(defaultAccountWalletSelector);
  const {
    inputMemo,
    networkFeeAmount,
    inputAddress,
    inputOriginalAmount,
    isMainCrypto,
    selectedPrivacy,
    disabledForm,
    networkFeeToken,
    isSend,
    isUnified,

    burnFee,
    burnFeeToken,
    burnFeeID,
    receiverAddress,
    feeAddress,

    receiverTokenID,

    estimatedBurnAmount,
    estimatedExpectedAmount,
  } = useSelector(sendDataSelector);
  const { showLoading } = useLoading();
  const { popupState, request } = useBackground();
  const callAsync = useCallAsync();
  const action = popupState && popupState.actions && popupState.actions[0];

  const handleUnShieldCrypto = throttle(async () => {
    try {
      if (!inputOriginalAmount || !inputAddress || disabledForm) {
        return;
      }
      showLoading({ value: true });
      await request("popup_authoriseTransaction", {
        actionKey: action?.key,
        networkFee: networkFeeAmount,
        networkFeeToken,

        isUnshield: !isSend,
        isUnified,

        burnFee: String(burnFee),
        burnFeeToken: burnFeeToken.tokenId,
        burnFeeID,

        burnAmount: inputOriginalAmount,
        burnToken: selectedPrivacy.tokenId,

        receiverAddress,
        feeAddress,

        receiverTokenID,

        estimatedBurnAmount, // estimate fee unified
        estimatedExpectedAmount, // estimate fee unified
      });
    } catch (e) {
      showLoading({ value: false });
    } finally {
      showLoading({ value: false });
      setTimeout(() => {
        window.close();
      }, 1000);
    }
  }, 2000);
  return <WrappedComponent {...{ ...props, handleUnShieldCrypto }} />;
};

export default enhanceUnshield;
