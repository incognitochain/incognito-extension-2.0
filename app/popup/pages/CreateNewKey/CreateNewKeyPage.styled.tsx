import { P2_Regular, P1_Regular } from "@popup/theme/Theme";
import styled, { ITheme } from "styled-components";
import { PrimaryButton } from "@popup/components/Buttons";

const TextInputWraper = styled.div`
  width: 100%;
  margin-top: 8px;
`;

const MasterKeyNameText = styled(P2_Regular)`
  width: 100%;
  margin-top: 24px;
  text-align: left;
`;

const ContentText1 = styled(P1_Regular)`
  width: 100%;
  margin-top: 32px;
`;

const ContentText2 = styled(P1_Regular)`
  width: 100%;
`;

const RowCheckBox = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CheckBoxDescription = styled(P1_Regular)`
  width: 100%;
  margin-left: 16px;
`;

const PrimaryButtonContaniner = styled(PrimaryButton)`
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
