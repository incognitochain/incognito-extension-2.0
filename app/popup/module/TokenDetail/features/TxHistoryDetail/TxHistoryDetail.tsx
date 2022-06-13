import React from "react";
import HistoryItem, { IHistoryItem } from "@module/History/features/HistoryItem";
import WrapContent from "@components/Content/Content";
import Header from "@components/Header";
import enhance from "@module/TokenDetail/features/TxHistoryDetail/TxHistoryDetail.enhance";

interface IProps {
  factories: IHistoryItem[];
}

const TxHistoryDetail = React.memo((props: IProps & any) => {
  const { factories } = props;
  return (
    <>
      <Header title="History" />
      <WrapContent className="default-padding-horizontal default-padding-top">
        {factories.map((item: IHistoryItem) => (
          <HistoryItem key={item.title} {...item} />
        ))}
      </WrapContent>
    </>
  );
});

export default enhance(TxHistoryDetail);
