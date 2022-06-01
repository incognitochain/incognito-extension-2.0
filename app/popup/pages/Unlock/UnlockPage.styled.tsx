import React from "react";
import styled, { ITheme } from "styled-components";
import { H4, P2_Regular, P1 } from "@popup/theme/Theme";
import { PrimaryButton } from "@popup/components/Core/Buttons";

const PrimaryButtonContaniner = styled(PrimaryButton)`
  margin-top: 8px;
`;

const CircleImage = styled.img`
  width: 72px;
  height: 72px;
  margin-top: 180px;
`;

const Title = styled(H4)`
  width: 163px;
  height: 32px;
  margin-top: 24px;
`;

const TextInputWithIcon = styled.input`
  padding-left: 16px;
  padding-right: 50px;
  width: 100%;
  height: 48px;
  background: #404040;
  border-radius: 8px;
  border-width: 1;
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  :focus {
    border: 1px solid white;
  }
  :hover {
    outline: none !important;
    border: 1px solid white;
  }
  ::placeholder {
    color: #9c9c9c;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.02em;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;

const PasswordText = styled(P2_Regular)`
  width: 100%;
  text-align: left;
  margin-top: 80px;
  margin-left: 0px;
  margin-bottom: 8px;
`;

const ForgotYourPasswordStyled = styled(P1)`
  margin-top: 24px;
  text-align: center;
  height: 26px;
`;

export const CircleImageStyled = () => <CircleImage src="./icons/ic_circle.png" />;

export { Title, TextInputWithIcon, PasswordText, PrimaryButtonContaniner, ForgotYourPasswordStyled };
