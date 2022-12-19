import { PrimaryButtonStyled } from "@popup/components/Core/Buttons";
import styled, { ITheme } from "styled-components";

const PasswordLabel = styled.p`
  width: 100%;
  text-align: left;
  margin-top: 30px;
  margin-bottom: 8px;
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
  margin-top: 20px;
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

const CreateNewWalletText = styled.p`
  text-align: center;
  color: ${({ theme }: { theme: ITheme }) => theme.colorP9};
  text-decoration-thickness: 0.2px;
  text-underline-offset: 5px;
  text-decoration: underline ${({ theme }: { theme: ITheme }) => theme.primaryP4};
`;

export { PrimaryButtonContaniner, DescriptionText, PasswordLabel, VerifyLabel, MnemonicTextArea, CreateNewWalletText };
