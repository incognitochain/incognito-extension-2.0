import { PrimaryButtonStyled } from "@popup/components/Core/Buttons";
import styled, { ITheme } from "styled-components";

const PrimaryButtonContaniner = styled(PrimaryButtonStyled)`
  margin-top: 8px;
`;

const CircleIconContainer = styled.div`
  margin-top: 180px;
`;

const Title = styled.p`
  margin-top: 24px;
`;

const PasswordText = styled.p`
  width: 100%;
  text-align: left;
  margin-top: 80px;
  margin-left: 0px;
  margin-bottom: 8px;
`;

const ForgotYourPasswordStyled = styled.p`
  margin-top: 24px;
  text-align: center;
  color: ${({ theme }: { theme: ITheme }) => theme.colorP9};
`;

export { CircleIconContainer, Title, PasswordText, PrimaryButtonContaniner, ForgotYourPasswordStyled };
