import React from "react";
import styled from "styled-components";
import Header from "@components/Header";
import { useSelector } from "react-redux";
import { selectedPrivacyToken } from "@redux/selectedPrivacy";
import WrapContent from "@components/Content/Content";

const Styled = styled.div`
  height: 100%;
`;

const TokenDetail = React.memo(() => {
  const tokenSelected = useSelector(selectedPrivacyToken);
  console.log(tokenSelected);
  return (
    <Styled>
      <Header title={tokenSelected.symbol} />
      <WrapContent />
    </Styled>
  );
});

export default TokenDetail;
