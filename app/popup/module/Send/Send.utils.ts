import { ISendData, ISendState, TypeSend } from "@module/Send/Send.types";
import SelectedPrivacy from "@model/SelectedPrivacyModel";
import { RootState } from "@redux/reducers";
import { sendSelector } from "@module/Send/Send.selector";
import { formValueSelector } from "redux-form";
import { FORM_CONFIGS } from "@module/Send/Send.constant";
import BigNumber from "bignumber.js";
import convert from "@utils/convert";
import format from "@utils/format";

interface IMaxSend {
  sendTokenID: string;
  sendTokenAmount: number;
  sendTokenPDecimal: number;
  networkFee: number;
  networkFeeTokenID: string;
  burnFee: number;
  burnFeeTokenID: string;
  screen: TypeSend;
}

const getMaxSendAmount = ({
  sendTokenID,
  sendTokenAmount,
  sendTokenPDecimal,
  networkFee,
  networkFeeTokenID,
  burnFee,
  burnFeeTokenID,
  screen,
}: IMaxSend) => {
  let maxAmount: number = new BigNumber(sendTokenAmount)
    .minus(sendTokenID === networkFeeTokenID ? networkFee : 0)
    .toNumber();

  if (screen === TypeSend.UNSHIELD) {
    maxAmount = new BigNumber(maxAmount).minus(sendTokenID === burnFeeTokenID ? burnFee : 0).toNumber();
  }
  const maxAmountText = format
    .formatAmount({
      originalAmount: maxAmount,
      decimals: sendTokenPDecimal,
    })
    .toString();
  return {
    maxAmount,
    maxAmountText,
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
  const _sendSelector = sendSelector(state);

  // Send Token
  const { amount: tokenAmount, pDecimals: tokenPDecimals, tokenId: tokenID, symbol: tokenSymbol } = selectedPrivacy;

  // Network Fee Token
  const networkFeeToken = getDataByTokenID(_sendSelector.networkFeeToken);
  const networkFeeAmount = _sendSelector.networkFee;
  const { amount: networkUserAmount } = networkFeeToken;

  // Burn Token Fee
  // Ignore case send internal
  const burnFeeToken = getDataByTokenID(_sendSelector.burnFeeToken);
  const burnFeeAmount = _sendSelector.burnFee;
  const { amount: burnUserAmount, pDecimals: burnPDecimals, tokenId: burnFeeTokenID } = burnFeeToken;

  // Form Selector
  const _formSelector = formValueSelector(FORM_CONFIGS.formName);

  const screen = _sendSelector.screen;
  const { maxAmount, maxAmountText } = getMaxSendAmount({
    sendTokenID: tokenID,
    sendTokenAmount: tokenAmount,
    sendTokenPDecimal: tokenPDecimals,

    networkFee: networkFeeAmount,
    networkFeeTokenID: networkFeeToken.tokenId,

    burnFee: burnFeeAmount,
    burnFeeTokenID: burnFeeToken.tokenId,
    screen,
  });
  console.log({
    send,
    selectedPrivacy,
    state,
  });

  return {
    maxAmount,
    maxAmountText,
    screen,
  };
};

export { getSendData };
