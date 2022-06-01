import React from "react";
import styled from "styled-components";
import Header from "@components/Header";
import { useSelector } from "react-redux";
import { selectedPrivacyToken } from "@redux/selectedPrivacy";

const Styled = styled.div``;

const TokenDetail = React.memo(() => {
  const tokenSelected = useSelector(selectedPrivacyToken);
  console.log(tokenSelected);
  return (
    <Styled>
      <Header title={tokenSelected.symbol} />
    </Styled>
  );
});

export default TokenDetail;
