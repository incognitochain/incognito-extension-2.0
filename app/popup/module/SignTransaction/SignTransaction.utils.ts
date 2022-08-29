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
  const { prvPayments, networkFee, tokenPayments } = _signSelector;

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

  if (tokenSendOriginalAmount) {
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

  const valid = isValid(FORM_CONFIGS.formName)(state);
  const submitting = isSubmitting(FORM_CONFIGS.formName)(state);

  const disabledForm = !valid || submitting || !inputOriginalAmount || !networkFee || !receiverAddress;

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
  };
};

export { getSignTransactionData };
