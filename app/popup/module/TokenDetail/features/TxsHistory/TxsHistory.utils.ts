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
    // console.log(" history SDK ", history)
    const _formatedAmount = format.amountVer2({
      originalAmount: convert.toNumber({ text: history.amount }),
      decimals: selectedPrivacy.pDecimals,
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
    } else if (history.statusStr === "Success") {
      statusColor = colors.colorP2;
    } else {
      statusColor = colors.colorP8;
    }

    let receiverAddress = history.receiverAddress
    let tokenReceivers =  history.tokenReceivers

    let tempAddress

    if (tokenReceivers && Array.isArray(tokenReceivers)) {
      tempAddress = tokenReceivers.find(item => item != receiverAddress)
    }

    return {
      amountStr: `${_formatedAmount} ${selectedPrivacy.symbol}`,
      feeStr: `${_formatedFee} PRV`,
      memo: history.memo,
      receiverAddress: tempAddress || receiverAddress,
      statusStr: history.statusStr,
      timeStr: _formatedTime,
      txID: history.txId,
      txTypeStr: history.txTypeStr,
      statusColor,
    };
  });
};

export { getTxsHistoryBuilder };
