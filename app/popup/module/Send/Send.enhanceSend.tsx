import React from "react";
import { useSelector } from "react-redux";
import { defaultAccountWalletSelector } from "@redux/account/account.selectors";
import accountService from "@services/wallet/accountService";
import { sendDataSelector } from "@module/Send/Send.selector";
const { PrivacyVersion, ACCOUNT_CONSTANT } = require("incognito-chain-web-js/build/web/wallet");
import { useLoading } from "@popup/context/loading";

export interface TInner {
  handleSendAnonymously: () => any;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const accountSender = useSelector(defaultAccountWalletSelector);
  const { inputMemo, networkFeeAmount, inputAddress, inputOriginalAmount, isMainCrypto, selectedPrivacy } =
    useSelector(sendDataSelector);
  const { showLoading } = useLoading();

  const handleSendNativeCrypto = async () => {
    try {
      const result = await accountService.createAndSendNativeToken({
        accountSender,
        fee: networkFeeAmount,
        info: inputMemo,
        prvPayments: [
          {
            PaymentAddress: inputAddress,
            Amount: inputOriginalAmount,
            Message: inputMemo,
          },
        ],
        txType: ACCOUNT_CONSTANT.TX_TYPE.SEND,
        version: PrivacyVersion.ver3,
      });
      console.log(result);
      // Handle send
    } catch (error) {
      // send fail
      // throw error;
    }
  };

  const handleSendPrivacyToken = async () => {
    try {
      const result = await accountService.createAndSendPrivacyToken({
        accountSender,
        fee: networkFeeAmount,
        info: inputMemo,
        tokenPayments: [
          {
            PaymentAddress: inputAddress,
            Amount: inputOriginalAmount,
            Message: inputMemo,
          },
        ],
        txType: ACCOUNT_CONSTANT.TX_TYPE.SEND,
        tokenID: selectedPrivacy?.tokenId,
        version: PrivacyVersion.ver3,
      });
      console.log(result);
      // Handle send
    } catch (error) {
      // send fail
      throw error;
    }
  };

  const handleSendAnonymously = async () => {
    try {
      showLoading({ value: true });
      if (isMainCrypto) return await handleSendNativeCrypto();
      await handleSendPrivacyToken();
    } catch (e) {
      // handle error
    } finally {
      showLoading({ value: false });
    }
  };
  return <WrappedComponent {...{ ...props, handleSendAnonymously }} />;
};

export default enhance;
