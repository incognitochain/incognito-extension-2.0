import React from "react";
import { useLoading } from "@popup/context/loading";
import { useDispatch, useSelector } from "react-redux";
import { defaultAccountWalletSelector } from "@redux/account/account.selectors";
import { sendDataSelector } from "@module/Send/Send.selector";
import { useCallAsync } from "@popup/utils/notifications";
import { useBackground } from "@popup/context/background";
import { throttle } from "lodash";
import { common } from "@constants/index";
import rpcMetric, { METRIC_TYPE } from "@services/wallet/rpcMetric";
const {
  BurningFantomRequestMeta,
  BurningPBSCRequestMeta,
  BurningPLGRequestMeta,
  // BurningPRVBEP20RequestMeta,
  // BurningPRVERC20RequestMeta,
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
    buyToken,
  } = useSelector(sendDataSelector);
  const { showLoading } = useLoading();
  const { popupState, request } = useBackground();
  const callAsync = useCallAsync();
  const action = popupState && popupState.actions && popupState.actions[0];
  const updateMetric = () => rpcMetric.updateMetric({ type: METRIC_TYPE.CONFIRM_SWAP });

  const handleUnShieldCrypto = throttle(async () => {
    try {
      if (!inputOriginalAmount || !inputAddress || disabledForm) {
        return;
      }
      updateMetric().then();
      showLoading({ value: true });
      let network = "";
      let burningRequestMeta = BurningRequestMeta;
      if (buyToken.isErc20Token || buyToken.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.ETH) {
        network = "eth";
      } else if (buyToken.isPolygonErc20Token || buyToken.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.MATIC) {
        network = "plg";
        burningRequestMeta = BurningPLGRequestMeta;
      } else if (buyToken.isFantomErc20Token || buyToken.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.FTM) {
        network = "ftm";
        burningRequestMeta = BurningFantomRequestMeta;
      } else if (buyToken.isBep20Token || buyToken.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB) {
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

        burnAmount: estimatedBurnAmount || inputOriginalAmount,
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
