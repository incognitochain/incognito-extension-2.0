import { PrimaryButtonStyled, SecondButtonStyled } from "@popup/components/Core/Buttons";
import styled, { ITheme } from "styled-components";

const CircleIconContainer = styled.div`
  margin-top: 180px;
`;

const IncognitoContainer = styled.div`
  margin-top: 16px;
`;

const PrimaryButtonWrapper = styled(PrimaryButtonStyled)`
  margin-top: 120px;
`;

const SecondaryButtonWrapper = styled(SecondButtonStyled)`
  margin-top: 8px;
`;

const Title = styled.p`
  color: ${({ theme }: { theme: ITheme }) => theme.colorP7};
  text-align: start;
`;

export { CircleIconContainer, IncognitoContainer, PrimaryButtonWrapper, SecondaryButtonWrapper, Title };
