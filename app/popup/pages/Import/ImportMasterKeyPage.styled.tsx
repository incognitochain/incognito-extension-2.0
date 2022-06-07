import { PrimaryButtonStyled } from "@popup/components/Core/Buttons";
import styled, { ITheme } from "styled-components";

const MasterKeyNameLabel = styled.p`
  width: 100%;
  text-align: left;
  margin-top: 30px;
  margin-bottom: 4px;
`;

const TextInputWraper = styled.div`
  width: 100%;
  height: 48px;
  margin-top: 8px;
`;

const VerifyLabel = styled.p`
  width: 100%;
  text-align: left;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const DescriptionText = styled.p`
  margin-top: 24px;
`;

const PrimaryButtonContaniner = styled(PrimaryButtonStyled)`
  margin-top: 110px;
  margin-bottom: 10px;
`;

const MnemonicTextArea = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  height: 140px;
  background: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
  border-radius: 8px;
`;

export { PrimaryButtonContaniner, DescriptionText, MasterKeyNameLabel, VerifyLabel, TextInputWraper, MnemonicTextArea };
