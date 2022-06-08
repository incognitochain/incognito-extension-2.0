import React from "react";
import { useLoading } from "@popup/context/loading";
import { useSelector } from "react-redux";
import { defaultAccountWalletSelector } from "@redux/account/account.selectors";
import { getConfirmTxBuilder, route as routeConfirmTx } from "@module/Send/features/ConfirmTx";
import accountService from "@services/wallet/accountService";
import { sendDataSelector } from "@module/Send/Send.selector";
import { useHistory } from "react-router-dom";
const { PrivacyVersion, ACCOUNT_CONSTANT } = require("incognito-chain-web-js/build/web/wallet");

export interface TInner {
  handleSendAnonymously: () => any;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
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
  } = useSelector(sendDataSelector);
  const { showLoading } = useLoading();
  const history = useHistory();

  const handleSendAnonymously = async () => {
    try {
      if (!inputOriginalAmount || !inputAddress || disabledForm) {
        return;
      }
      showLoading({ value: true });
      let tx;
      let payload = {
        accountSender,
        fee: networkFeeAmount,
        info: inputMemo,
        txType: ACCOUNT_CONSTANT.TX_TYPE.SEND,
        tokenID: selectedPrivacy?.tokenId,
        version: PrivacyVersion.ver3,
      };
      if (isMainCrypto) {
        // Handle send native token
        tx = await accountService.createAndSendNativeToken({
          ...payload,
          prvPayments: [
            {
              PaymentAddress: inputAddress,
              Amount: inputOriginalAmount,
              Message: inputMemo,
            },
          ],
        });
      } else {
        // Handle send privacy token
        tx = await accountService.createAndSendPrivacyToken({
          ...payload,
          tokenID: selectedPrivacy?.tokenId,
          tokenPayments: [
            {
              PaymentAddress: inputAddress,
              Amount: inputOriginalAmount,
              Message: inputMemo,
            },
          ],
        });
      }
      const confirmData = getConfirmTxBuilder({
        tx,
        address: inputAddress,
        amount: inputOriginalAmount,
        networkFee: networkFeeAmount,
        networkFeeToken: networkFeeToken,
        sendToken: selectedPrivacy,
      });
      history.push(routeConfirmTx, { confirmTx: confirmData });
    } catch (e) {
      console.log("SEND ERROR: ", e);
      // handle error
      alert("SEND ERROR");
    } finally {
      showLoading({ value: false });
    }
  };
  return <WrappedComponent {...{ ...props, handleSendAnonymously }} />;
};

export default enhance;
