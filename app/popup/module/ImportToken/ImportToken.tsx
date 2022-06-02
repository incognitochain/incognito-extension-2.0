import React from "react";
import styled from "styled-components";
import Header from "@components/Header";
import { useSelector } from "react-redux";
import { selectedPrivacyToken } from "@redux/selectedPrivacy";
import WrapContent from "@components/Content/Content";

const Styled = styled.div``;

const ImportToken = React.memo(() => {
  const tokenSelected = useSelector(selectedPrivacyToken);
  console.log(tokenSelected);
  return (
    <Styled>
      <Header title="Import Tokens" />
      <WrapContent></WrapContent>
    </Styled>
  );
});

export default ImportToken;
