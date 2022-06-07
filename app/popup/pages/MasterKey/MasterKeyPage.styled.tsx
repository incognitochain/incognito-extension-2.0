import { PrimaryButtonStyled } from "@popup/components/Core/Buttons";
import styled, { ITheme } from "styled-components";

const YellowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
  padding: 16px;
  border-radius: 6px;
  background: ${({ theme }: { theme: ITheme }) => theme.colorP8};
`;

const BookMarkContainer = styled.div``;

const BookMarkText = styled.p`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP6};
  margin-left: 10px;
  margin-right: 10px;
  letter-spacing: -0.02em;
`;

const MnemoicBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 24px;
`;

const MnemoicRowItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const MnemonicItemWrapper = styled.div`
  margin-bottom: 8px;
`;

const CopyButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CopyButton = styled.button`
  margin-top: 20px;
  padding: 9px 12px 10px;
  gap: 8px;
  width: 104px;
  height: 40px;
  background: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
  border-radius: 8px;
`;

const CopyText = styled.p`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
`;

const PrimaryButtonContaniner = styled(PrimaryButtonStyled)`
  margin-top: 80px;
`;

export {
  YellowBox,
  BookMarkContainer,
  BookMarkText,
  MnemoicBox,
  MnemoicRowItems,
  MnemonicItemWrapper,
  CopyButtonContainer,
  CopyButton,
  CopyText,
  PrimaryButtonContaniner,
};
