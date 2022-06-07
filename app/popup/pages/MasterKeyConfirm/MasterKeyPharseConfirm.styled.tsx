import { PrimaryButtonStyled } from "@popup/components/Core/Buttons";
import styled, { ITheme } from "styled-components";

const DescriptionText = styled.p`
  margin-top: 24px;
  padding-left: 8px;
  padding-right: 8px;
  letter-spacing: -0.02em;
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
`;

const PrimaryButtonContaniner = styled(PrimaryButtonStyled)`
  margin-top: 30px;
`;

const MnemonicTextPickArea = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  height: 140px;
  padding: 15px;
  background: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
  border-radius: 8px;
`;

const MnemonicsText = styled.p`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  text-align: justify;
`;

export { DescriptionText, MnemonicTextPickArea, PrimaryButtonContaniner, MnemonicsText };
