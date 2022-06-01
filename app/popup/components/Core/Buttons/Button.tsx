import styled, { ITheme } from "styled-components";
import React from "react";

const PrimaryButton = styled.button`
  color: ${({ theme }: { theme: ITheme }) => "white"};
  background: ${({ theme }: { theme: ITheme }) => "#1A73E8"};
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  gap: 10px;
  width: 100%;
  height: 50px;
  border-radius: 8px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height, or 144% */

  text-align: center;
  letter-spacing: -0.02em;

  /* Primary/White */

  color: #ffffff;

  :hover {
    outline: none !important;
    opacity: 0.9;
  }
  :disabled {
    background-color: #c0c0c0;
    color: #ffffff;
    :hover {
      opacity: 1;
    }
  }
`;

const SecondaryButton = styled.button`
  color: ${({ theme }: { theme: ITheme }) => "#1A73E8"};
  background: ${({ theme }: { theme: ITheme }) => "white"};
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  gap: 10px;
  width: 100%;
  height: 50px;
  border-radius: 8px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height, or 144% */

  text-align: center;
  letter-spacing: -0.02em;

  :hover {
    outline: none !important;
    opacity: 0.9;
  }

  :disabled {
    background-color: #c0c0c0;
    color: #ffffff;
    :hover {
      opacity: 1;
    }
  }
`;

interface IProps {
  customContent?: React.ReactNode;
  title: string;
  disabled?: boolean;
  loading?: boolean;
}

const Styled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  height: 40px;
  margin: auto;
  padding: 0 11px;
  width: 100%;
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  &.btn-disabled {
  }
  .loading {
    position: absolute;
    right: 20%;
  }
`;

const Button = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { customContent, title, disabled, className = "", ...rest } = props;
  return (
    <Styled className={`btn-container ${disabled ? "btn-disabled" : ""}  ${className}`} disabled={disabled} {...rest}>
      {customContent || title}
    </Styled>
  );
};

export { PrimaryButton, SecondaryButton, Button };
