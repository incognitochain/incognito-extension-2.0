import React from "react";
import styled from "styled-components";
import Header from "@components/Header";
import { useSelector } from "react-redux";
import { selectedPrivacyToken } from "@redux/selectedPrivacy";
import WrapContent from "@components/Content/Content";
import { ArrowCircleIcon } from "@components/Icons";
import { Extra, ActionsGroup } from "@module/TokenDetail/features";
import { useHistory } from "react-router-dom";
import { route as routeWallet } from "@module/Assets/Assets.route";

const Styled = styled.div`
  height: 100%;
  .wrap-content {
    flex-direction: column;
  }
`;

const TokenDetail = React.memo(() => {
  const tokenSelected = useSelector(selectedPrivacyToken);
  const history = useHistory();
  console.log(tokenSelected);
  return (
    <Styled>
      <Header
        onGoBack={() => history.push(routeWallet)}
        rightHeader={<ArrowCircleIcon />}
        title={tokenSelected.symbol}
      />
      <WrapContent>
        <Extra />
        <ActionsGroup />
      </WrapContent>
    </Styled>
  );
});

export default TokenDetail;
