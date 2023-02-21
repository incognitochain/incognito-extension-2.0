import React from "react";
import { useLocation } from "react-router";
import { IHistory } from "@module/TokenDetail/features/TxsHistory";
import { IHistoryItem } from "@module/TokenDetail/features/HistoryItem";
import { ellipsisCenter } from "@popup/utils";
import CONSTANT_CONFIGS from "@constants/config";

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const { state }: { state: any } = useLocation();
  const { history }: { history: IHistory } = state || {};
  const factories: IHistoryItem[] = React.useMemo(() => {
    let result = []
    result =  [
      {
        title: "TxID:",
        desc: ellipsisCenter({ limit: 7, str: history.txID }),
        copyData: history.txID,
        link: `${CONSTANT_CONFIGS.EXPLORER_CONSTANT_CHAIN_URL}/tx/${history.txID}`,
      },
      {
        title: "Receiver:",
        desc: ellipsisCenter({ limit: 8, str: history.receiverAddress }),
        copyData: history.receiverAddress,
      },
      {
        title: "Amount:",
        desc: history.amountStr,
      },
      {
        title: "Status:",
        desc: history.statusStr,
        descColor: history.statusColor,
      },
      {
        title: "Type:",
        desc: history.txTypeStr,
      },
      {
        title: "Fee:",
        desc: history.feeStr,
      },
      {
        title: "Time:",
        desc: history.timeStr,
      },
    ];

    if (history.toAddressStr) {
      result.push({
        title: "To address:",
        desc: ellipsisCenter({ limit: 8, str: history.toAddressStr }),
        copyData: history.toAddressStr,
      })
    }

    if (history.memo) {
      result.push({
        title: "ID:",
        desc: history.memo,
        copyData: history.memo,
      })
    }

    return result
  }, [history]);

  return <WrappedComponent {...{ ...props, factories }} />;
};

export default enhance;
