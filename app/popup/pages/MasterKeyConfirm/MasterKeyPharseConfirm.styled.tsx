import { P2_Medium, P1_Regular } from "@popup/theme/Theme";
import styled, { ITheme } from "styled-components";
import { PrimaryButton, SecondaryButton } from "@popup/components/Core/Buttons";

const DescriptionText = styled(P2_Medium)`
  margin-top: 24px;
  color: #ffffff;
  text-align: justify;
`;

const PrimaryButtonContaniner = styled(PrimaryButton)`
  margin-top: 90px;
`;

const SecondaryButtonContaniner = styled(SecondaryButton)`
  margin-top: 35px;
`;

const MnemonicTextPickArea = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  height: 140px;
  padding: 15px;
  background: #404040;
  border-radius: 8px;
`;

const MnemonicsText = styled(P1_Regular)`
  color: #ffffff;
  text-align: justify;
`;

export { DescriptionText, MnemonicTextPickArea, PrimaryButtonContaniner, SecondaryButtonContaniner, MnemonicsText };
