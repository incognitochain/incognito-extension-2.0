import React from "react";
import { useLocation } from "react-router";
import { IHistory } from "@module/TokenDetail/features/TxsHistory";
import { IHistoryItem } from "@module/TokenDetail/features/HistoryItem";
import { ellipsisCenter } from "@popup/utils";

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const { state }: { state: any } = useLocation();
  const { history }: { history: IHistory } = state || {};

  const factories: IHistoryItem[] = React.useMemo(() => {
    return [
      {
        title: "TxID:",
        desc: ellipsisCenter({ limit: 8, str: history.txID }),
        copyData: history.txID,
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
    ];
  }, [history]);

  return <WrappedComponent {...{ ...props, factories }} />;
};

export default enhance;
