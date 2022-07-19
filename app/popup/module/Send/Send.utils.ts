import { ISendData, ISendState, TypeSend } from "@module/Send/Send.types";
import SelectedPrivacy from "@model/SelectedPrivacyModel";
import { RootState } from "@redux/reducers";
import { formValueSelector, isValid, isSubmitting } from "redux-form";
import { FORM_CONFIGS } from "@module/Send/Send.constant";
import BigNumber from "bignumber.js";
import convert from "@utils/convert";
import format from "@utils/format";
import isEmpty from "lodash/isEmpty";
const { isPaymentAddress } = require("incognito-chain-web-js/build/web/wallet");
const log = require("debug")("incognito:SendUntil");

interface IValidSend {
  sendTokenID: string;
  sendTokenAmount: number;
  sendTokenPDecimal: number;
  networkFee: number;
  networkFeeTokenID: string;
  burnFee: number;
  burnFeeTokenID: string;
  screen: TypeSend;
  extraFee?: number;
}

const getValidSendAmount = ({
  sendTokenID,
  sendTokenAmount,
  sendTokenPDecimal,
  networkFee,
  networkFeeTokenID,
  burnFee,
  burnFeeTokenID,
  extraFee,
  screen,
}: IValidSend) => {
  let maxAmount: number = new BigNumber(sendTokenAmount)
    .minus(sendTokenID === networkFeeTokenID ? networkFee : 0)
    .minus(extraFee || 0)
    .toNumber();

  // let minAmount: number = new BigNumber(sendTokenID === networkFeeTokenID ? 1 + networkFee : 1).toNumber();
  const minAmount = 1;
  if (screen === TypeSend.CONFIRM_UNSHIELD) {
    maxAmount = new BigNumber(maxAmount).minus(sendTokenID === burnFeeTokenID ? burnFee : 0).toNumber();
    // minAmount = new BigNumber(minAmount).plus(sendTokenID === burnFeeTokenID ? burnFee : 0).toNumber();
  }
  if (maxAmount <= 0) {
    maxAmount = 0;
  }

  const maxAmountText = convert
    .toHumanAmount({
      originalAmount: maxAmount,
      decimals: sendTokenPDecimal,
    })
    .toString();

  const minAmountText = format.formatAmount({
    originalAmount: minAmount,
    decimals: sendTokenPDecimal,
    clipAmount: false,
  });

  return {
    maxAmount,
    maxAmountText,

    minAmount,
    minAmountText,
  };
};

const getSendData = ({
  send,
  selectedPrivacy,
  getDataByTokenID,
  state,
}: {
  send: ISendState;
  selectedPrivacy: SelectedPrivacy;
  getDataByTokenID: (tokenID: string) => SelectedPrivacy;
  state: RootState;
}): ISendData => {
  // Send Selector
  const _sendSelector = send;
  // Send Token
  const { amount: tokenAmount, pDecimals: tokenPDecimals, tokenId: tokenID, symbol: tokenSymbol } = selectedPrivacy;

  // Network Fee Token
  const networkFeeToken = getDataByTokenID(_sendSelector.networkFeeToken);
  const networkFeeAmount = _sendSelector.networkFee;
  const { amount: networkUserBalance } = networkFeeToken;

  // Burn Token Fee
  // Ignore case send internal
  let burnFeeSymbol = "";
  const burnFeeAmount = _sendSelector.burnFee || 0;
  const burnFeeToken = getDataByTokenID(_sendSelector.burnFeeToken);
  const burnFeeText = format.formatAmount({
    originalAmount: new BigNumber(burnFeeAmount).plus(_sendSelector.extraFee || 0).toNumber(),
    decimals: networkFeeToken.pDecimals,
    clipAmount: false,
  });
  if (burnFeeToken && burnFeeToken.symbol) {
    burnFeeSymbol = burnFeeToken.symbol;
  }

  // const { amount: burnUserBalance } = burnFeeToken;

  // Form Selector
  const formSelector = formValueSelector(FORM_CONFIGS.formName);

  const screen = _sendSelector.screen;
  const isSend = screen === TypeSend.SEND;

  const { maxAmount, maxAmountText, minAmount, minAmountText } = getValidSendAmount({
    sendTokenID: tokenID,
    sendTokenAmount: tokenAmount,
    sendTokenPDecimal: tokenPDecimals,

    networkFee: networkFeeAmount,
    networkFeeTokenID: networkFeeToken.tokenId,

    burnFee: new BigNumber(burnFeeAmount).toNumber(),
    extraFee: _sendSelector.extraFee,
    burnFeeTokenID: burnFeeToken.tokenId,
    screen,
  });

  const networkFeeText = format.formatAmount({
    originalAmount: networkFeeAmount,
    decimals: networkFeeToken.pDecimals,
    clipAmount: false,
  });

  const headerTitle: string = `${isSend ? "Send" : "Swap"} ${tokenSymbol}`;
  const showMemo: boolean = isSend || selectedPrivacy.currencyType === 4 || selectedPrivacy.isBep2Token;
  const btnSubmit: string = isSend ? "Send anonymously" : "Swap my crypto";

  const valid = isValid(FORM_CONFIGS.formName)(state);
  const submitting = isSubmitting(FORM_CONFIGS.formName)(state);

  // form selector
  const inputAmount = formSelector(state, FORM_CONFIGS.amount);
  const inputAddress = formSelector(state, FORM_CONFIGS.toAddress);
  const inputMemo = formSelector(state, FORM_CONFIGS.memo);

  const isIncognitoAddress = isEmpty(inputAddress) ? false : isPaymentAddress(inputAddress);
  const isExternalAddress = isEmpty(inputAddress) ? false : !isIncognitoAddress && selectedPrivacy.isWithdrawable;

  const inputOriginalAmount = convert.toOriginalAmount({
    humanAmount: `${convert.toNumber({ text: inputAmount, autoCorrect: true }) || 0}`,
    decimals: tokenPDecimals,
  });

  const enoughNetworkFee = new BigNumber(networkUserBalance).isGreaterThanOrEqualTo(networkFeeAmount);

  const accountBalanceStr = `${format.amountVer2({
    decimals: tokenPDecimals,
    originalAmount: tokenAmount,
  })} ${tokenSymbol}`;

  const isMainCrypto = selectedPrivacy.isMainCrypto;

  const disabledForm =
    !valid ||
    submitting ||
    !inputOriginalAmount ||
    !networkFeeAmount ||
    !enoughNetworkFee ||
    (!isSend && !burnFeeAmount) ||
    (isSend && isExternalAddress) ||
    (!isSend && isIncognitoAddress);

  const buyToken = getDataByTokenID(_sendSelector.receiverTokenID);
  return {
    maxAmount,
    maxAmountText,
    screen,
    networkFeeText,
    networkFeeSymbol: networkFeeToken.symbol,
    networkFeeAmount,
    headerTitle,
    showMemo,
    btnSubmit,
    selectedPrivacy,
    isSend,
    disabledForm,
    init: _sendSelector.init,
    isFetching: _sendSelector.isFetching,
    isIncognitoAddress,
    isExternalAddress,
    inputAmount,
    inputAddress,
    inputMemo,
    inputOriginalAmount: inputOriginalAmount.toString(),

    isMainCrypto,
    networkFeeToken,

    minAmount,
    minAmountText,
    accountBalanceStr,

    burnFee: String(burnFeeAmount),
    burnFeeText,
    burnFeeToken,
    burnFeeSymbol,
    isUnified: _sendSelector.isUnified,
    burnFeeID: _sendSelector.burnFeeID,

    receiverTokenID: _sendSelector.receiverTokenID,
    receiverAddress: _sendSelector.receiverAddress,
    feeAddress: _sendSelector.feeAddress,

    estimatedBurnAmount: _sendSelector.estimatedBurnAmount,
    estimatedExpectedAmount: _sendSelector.estimatedExpectedAmount,

    buyToken,
  };
};

export { getSendData };
