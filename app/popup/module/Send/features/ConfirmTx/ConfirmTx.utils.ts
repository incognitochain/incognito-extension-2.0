import SelectedPrivacy from "@model/SelectedPrivacyModel";
import format from "@utils/format";
import convert from "@utils/convert";
import { IConfirmTx } from "@module/Send/features/ConfirmTx/ConfirmTx.interface";

const getConfirmTxBuilder = ({
  tx,
  amount,
  networkFee,
  address,
  sendToken,
  networkFeeToken,
}: {
  tx: any;
  amount: string;
  networkFee: number;
  address: string;
  sendToken: SelectedPrivacy;
  networkFeeToken: SelectedPrivacy;
}): IConfirmTx => {
  const _formatedAmount = format.formatAmount({
    originalAmount: convert.toNumber({ text: amount }),
    decimals: sendToken.pDecimals,
  });

  const _formatedNetworkFee = format.formatAmount({
    originalAmount: networkFee,
    decimals: networkFeeToken.pDecimals,
    clipAmount: false,
  });

  let _tx = tx.tx;
  if (_tx.Tx) {
    _tx = _tx.Tx;
  }
  const lockTime = _tx?.LockTime || 0;
  const time = format.formatDateTime({
    dateTime: lockTime * 1000,
  });

  return {
    txID: tx.hash,
    address,
    formatedAmount: `${_formatedAmount} ${sendToken.symbol}`,
    formatedNetworkFee: `${_formatedNetworkFee} ${networkFeeToken.symbol}`,
    time,
  };
};

export { getConfirmTxBuilder };
