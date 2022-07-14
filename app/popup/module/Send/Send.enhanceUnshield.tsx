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
import { common } from "@/constants";
const { PrivacyVersion, ACCOUNT_CONSTANT } = require("incognito-chain-web-js/build/web/wallet");
const {
  BurningFantomRequestMeta,
  BurningPBSCRequestMeta,
  BurningPLGRequestMeta,
  BurningPRVBEP20RequestMeta,
  BurningPRVERC20RequestMeta,
  BurningRequestMeta,
} = require("incognito-chain-web-js/build/wallet");
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
      let network = "";
      let burningRequestMeta = BurningRequestMeta;
      if (selectedPrivacy.isErc20Token || selectedPrivacy.isETH) {
        network = "eth";
      } else if (
        selectedPrivacy.isPolygonErc20Token ||
        selectedPrivacy.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.MATIC
      ) {
        network = "plg";
        burningRequestMeta = BurningPLGRequestMeta;
      } else if (
        selectedPrivacy.isFantomErc20Token ||
        selectedPrivacy.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.FTM
      ) {
        network = "ftm";
        burningRequestMeta = BurningFantomRequestMeta;
      } else if (
        selectedPrivacy.isBep20Token ||
        selectedPrivacy.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB
      ) {
        network = "bsc";
        burningRequestMeta = BurningPBSCRequestMeta;
      }
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
        network,
        burningRequestMeta,
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
