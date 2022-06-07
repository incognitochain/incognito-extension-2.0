import { PrimaryButtonStyled } from "@popup/components/Core/Buttons";
import styled, { ITheme } from "styled-components";

const TextInputWraper = styled.div`
  margin-top: 8px;
`;

const MasterKeyNameText = styled.p`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  margin-top: 24px;
  text-align: left;
`;

const ContentText1 = styled.p`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  margin-top: 32px;
`;

const ContentText2 = styled.p`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
`;

const RowCheckBox = styled.div`
  height: 50px;
  margin-top: 80px;
`;

const CheckBoxDescription = styled.p`
  margin-left: 16px;

  &.activeColor {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  }

  &.deactiveColor {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
  }
`;

const PrimaryButtonContaniner = styled(PrimaryButtonStyled)`
  margin-top: 32px;
`;

export {
  MasterKeyNameText,
  TextInputWraper,
  ContentText1,
  ContentText2,
  RowCheckBox,
  CheckBoxDescription,
  PrimaryButtonContaniner,
};
