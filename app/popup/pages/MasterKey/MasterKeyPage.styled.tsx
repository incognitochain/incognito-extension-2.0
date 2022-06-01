import { P2_Medium } from "@popup/theme/Theme";
import styled, { ITheme } from "styled-components";
import { PrimaryButton } from "@popup/components/Core/Buttons";
import React from "react";

const YellowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
  padding: 16px;
  border-radius: 6px;
  background: #ffc043;
`;

const BookMarkImgStyled = styled.img`
  width: 24px;
  height: 24px;
`;

const BookMarkText = styled(P2_Medium)`
  margin-left: 20px;
  margin-right: 20px;
  text-align: justify;
`;

const MnemoicBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 24px;
`;

const MnemoicRowItems = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const MnemonicItemWrapper = styled.div`
  margin-bottom: 8px;
`;

const CopyButton = styled.button`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 9px 12px 10px;
  gap: 8px;

  width: 104px;
  height: 40px;

  background: #404040;
  border-radius: 8px;

  :hover {
    outline: none !important;
    border: 1px solid white;
    cursor: pointer;
  }
`;

const CopyText = styled(P2_Medium)`
  color: #ffffff;
  text-align: center;
`;

const BookMarkImg = () => <BookMarkImgStyled src={"./icons/ic_bookmark.png"} />;

const PrimaryButtonContaniner = styled(PrimaryButton)`
  margin-top: 90px;
`;

export {
  YellowBox,
  BookMarkImg,
  BookMarkText,
  MnemoicBox,
  MnemoicRowItems,
  MnemonicItemWrapper,
  CopyButton,
  CopyText,
  PrimaryButtonContaniner,
};
