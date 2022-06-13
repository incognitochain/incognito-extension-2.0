import SelectedPrivacy from "@model/SelectedPrivacyModel";
import format from "@utils/format";
import convert from "@utils/convert";
import { IHistory, IHistoryFromSDK } from "@module/TokenDetail/features/TxsHistory/TxsHistory.interfaces";
import { Colors } from "@theme/Theme.styled";

const getTxsHistoryBuilder = ({
  txsHistory = [],
  selectedPrivacy,
  colors,
}: {
  txsHistory: IHistoryFromSDK[];
  selectedPrivacy: SelectedPrivacy;
  colors: Colors;
}): IHistory[] => {
  return txsHistory.map((history) => {
    const _formatedAmount = format.formatAmount({
      originalAmount: convert.toNumber({ text: history.amount }),
      decimals: selectedPrivacy.pDecimals,
      clipAmount: false,
    });

    const _formatedFee = format.formatAmount({
      originalAmount: convert.toNumber({ text: (history.fee || 0).toString() }),
      decimals: 9,
      clipAmount: false,
    });

    const _formatedTime = format.formatDateTime({
      dateTime: history.time,
    });
    let statusColor;
    if (history.statusStr === "Failed") {
      statusColor = colors.colorP4;
    } else if (history.statusStr === "Completed") {
      statusColor = colors.colorP5;
    } else {
      statusColor = colors.primaryP8;
    }

    return {
      amountStr: `${_formatedAmount} ${selectedPrivacy.symbol}`,
      feeStr: `${_formatedFee} PRV`,
      memo: history.memo,
      receiverAddress: history.receiverAddress,
      statusStr: history.statusStr,
      timeStr: _formatedTime,
      txID: history.txId,
      txTypeStr: history.txTypeStr,
      statusColor,
    };
  });
};

export { getTxsHistoryBuilder };
