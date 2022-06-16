import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import HistoryItem, { IHistoryItem } from "@module/TokenDetail/features/HistoryItem";
import { route as routeTokenDetail } from "@module/TokenDetail";
import Header from "@components/Header";
import { selectedPrivacyToken } from "@redux/selectedPrivacy";
import { IConfirmTx } from "@module/Send/features/ConfirmTx";
import WrapContent from "@components/Content/Content";

const Styled = styled.div`
  p.confirm-title {
    text-align: center;
    margin-bottom: 30px;
    margin-top: 24px;
  }
`;

const ConfirmTx = () => {
  const { state }: { state: any } = useLocation();
  const historyState = useHistory();
  const { confirmTx }: { confirmTx: IConfirmTx } = state;
  const selectedPrivacyTokenId = useSelector(selectedPrivacyToken).tokenId;
  if (!confirmTx) {
    return <Redirect to="/" />;
  }
  const itemsFactories: IHistoryItem[] = [
    {
      title: "TxID",
      desc: confirmTx.txID,
      copyData: confirmTx.txID,
      // link: `${server.exploreChainURL}/tx/${confirmTx.txId}`,
    },
    {
      title: "To address",
      desc: confirmTx.address,
      copyData: confirmTx.address,
    },
    {
      title: "Time",
      desc: confirmTx.time,
    },
    {
      title: "Amount",
      desc: `${confirmTx.formatedAmount}`,
    },
    {
      title: "Network fee",
      desc: `${confirmTx.formatedNetworkFee}`,
    },
  ];
  return (
    <Styled>
      <Header onGoBack={() => historyState.push(`${routeTokenDetail}/${selectedPrivacyTokenId}`)} title=" " />
      <WrapContent className="default-padding-horizontal">
        <p className="confirm-title fw-medium fs-avglarge center-text">Sent.</p>
        {itemsFactories.map((item: IHistoryItem) => (
          <HistoryItem key={item.title} {...item} />
        ))}
      </WrapContent>
    </Styled>
  );
};

export default React.memo(ConfirmTx);
