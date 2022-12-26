import SelectedPrivacy from "@model/SelectedPrivacyModel";
import { RootState } from "@redux-sync-storage/reducers/index";
import { formValueSelector, isValid, isSubmitting } from "redux-form";
import BigNumber from "bignumber.js";
import convert from "@utils/convert";
import format from "@utils/format";
import { ISignTransactionData, ISignTransactionState } from "@module/SignTransaction/SignTransaction.types";
import { PRV, PRV_ID } from "@constants/common";
import { FORM_CONFIGS } from "@module/SignTransaction/SignTransaction.constant";

const getSignTransactionData = ({
  sign,
  selectedPrivacy,
  getDataByTokenID,
  state,
}: {
  sign: ISignTransactionState;
  selectedPrivacy: SelectedPrivacy;
  getDataByTokenID: (tokenID: string) => SelectedPrivacy;
  state: RootState;
}): ISignTransactionData => {
  const _signSelector = sign;
  const prvToken = getDataByTokenID(PRV_ID);
  const { prvPayments, networkFee, tokenPayments, metadata } = _signSelector;

  // handle token
  const tokenSendOriginalAmount = tokenPayments
    .reduce((prev, curr) => {
      return prev.plus(curr.Amount || 0);
    }, new BigNumber(0))
    .toNumber();

  const tokenSendAmountText = format.formatAmount({
    originalAmount: tokenSendOriginalAmount,
    decimals: selectedPrivacy.pDecimals,
    clipAmount: false,
  });

  // handle prv
  const prvSendOriginalAmount = prvPayments
    .reduce((prev, curr) => {
      return prev.plus(curr.Amount || 0);
    }, new BigNumber(0))
    .toNumber();

  const prvSendAmountText = format.formatAmount({
    originalAmount: prvSendOriginalAmount,
    decimals: PRV.pDecimals,
    clipAmount: false,
  });

  const networkFeeText = format.formatAmount({
    originalAmount: networkFee,
    decimals: PRV.pDecimals,
    clipAmount: false,
  });

  // Form Selector
  const formSelector = formValueSelector(FORM_CONFIGS.formName);

  const receiverAddress = formSelector(state, FORM_CONFIGS.toAddress);

  let inputOriginalAmount = prvSendOriginalAmount;
  let inputAmountText = prvSendAmountText;

  let maxInputOriginalAmount = prvToken.amount || 0;
  let maxInputAmountText = convert
    .toHumanAmount({
      originalAmount: maxInputOriginalAmount,
      decimals: prvToken.pDecimals,
    })
    .toString();

  const paymentFeeTokenID = metadata && metadata.PaymentFeeTokenID;
  const isSendPRVPaymentTokenFee = paymentFeeTokenID && paymentFeeTokenID !== PRV_ID;
  if (paymentFeeTokenID) {
    delete metadata.PaymentFeeTokenID;
  }
  let feeTokenAmount = 0;
  let feeTokenAmountStr = "";
  let feeTokenData;
  if (tokenSendOriginalAmount) {
    if (isSendPRVPaymentTokenFee && paymentFeeTokenID) {
      // handle display token FEE
      feeTokenData = getDataByTokenID(paymentFeeTokenID);
      if (feeTokenData.symbol) {
        feeTokenAmount = tokenSendOriginalAmount;
        feeTokenAmountStr = format.formatAmount({
          originalAmount: feeTokenAmount,
          decimals: feeTokenData.pDecimals,
          clipAmount: false,
        });
      }
    } else {
      inputAmountText = tokenSendAmountText;
      inputOriginalAmount = tokenSendOriginalAmount;
      maxInputOriginalAmount = selectedPrivacy.amount || 0;
      maxInputAmountText = convert
        .toHumanAmount({
          originalAmount: maxInputOriginalAmount,
          decimals: selectedPrivacy.pDecimals,
        })
        .toString();
    }
  }

  const valid = isValid(FORM_CONFIGS.formName)(state);
  const submitting = isSubmitting(FORM_CONFIGS.formName)(state);

  // Set default error
  let errorMessage = "";
  if (valid) {
    const inputNum = convert.toNumber({ text: inputAmountText, autoCorrect: true });
    const maxInputNum = convert.toNumber({ text: maxInputAmountText, autoCorrect: true });
    const isInputValid = new BigNumber(inputNum).lt(maxInputNum);
    const inValidPRV = new BigNumber(prvSendOriginalAmount || 0).plus(networkFee || 0).gte(prvToken.amount || 0);
    if (!isInputValid) {
      errorMessage = "Your balance is insufficient.";
    } else if (inValidPRV) {
      errorMessage = `Not enough amount cover ${format.formatAmount({
        decimals: PRV.pDecimals,
        originalAmount: new BigNumber(prvSendOriginalAmount || 0).plus(networkFee || 0).toNumber(),
      })} PRV.`;
    } else if ((networkFee || 0) > prvToken.amount) {
      errorMessage = `Not enough PRV cover network fee.`;
    }
  }

  const disabledForm =
    !valid || submitting || !inputOriginalAmount || !networkFee || !receiverAddress || !!errorMessage;

  return {
    isSignAndSendTransaction: _signSelector.isSignAndSendTransaction,
    info: _signSelector.info,
    prvPayments: _signSelector.prvPayments,
    tokenPayments: _signSelector.tokenPayments,
    tokenID: _signSelector.tokenID,
    metadata: _signSelector.metadata,
    networkFee: _signSelector.networkFee,
    txType: _signSelector.txType,

    receiverAddress,

    tokenSendOriginalAmount,
    tokenSendAmountText,

    prvSendOriginalAmount,
    prvSendAmountText,
    networkFeeText,

    selectedPrivacy,

    inputOriginalAmount,
    inputAmountText,
    maxInputOriginalAmount,
    maxInputAmountText,

    disabledForm,
    errorMessage,

    feeTokenData,
    feeTokenAmount,
    feeTokenAmountStr,
  };
};

export { getSignTransactionData };
