import styled, { ITheme } from "styled-components";
import React from "react";

const PrimaryButton1 = styled.button`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  background: ${({ theme }: { theme: ITheme }) => theme.colorP3};
  padding: 12px;
  gap: 10px;
  width: 100%;
  height: 50px;
  border-radius: 8px;
  letter-spacing: -0.02em;

  :disabled {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
    background: ${({ theme }: { theme: ITheme }) => theme.colorP7};
    :hover {
      opacity: 1;
      cursor: default;
    }
  }
`;

const SecondaryButton1 = styled.button`
  color: ${({ theme }: { theme: ITheme }) => theme.colorP3};
  background: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  padding: 12px;
  gap: 10px;
  width: 100%;
  height: 50px;
  border-radius: 8px;
  letter-spacing: -0.02em;

  :disabled {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
    background: ${({ theme }: { theme: ITheme }) => theme.colorP7};
    :hover {
      opacity: 1;
      cursor: default;
    }
  }
`;

const PrimaryButtonStyled = styled(PrimaryButton1).attrs({
  className: "fs-medium fw-medium center hover-with-cursor",
})``;
const SecondButtonStyled = styled(SecondaryButton1).attrs({
  className: "fs-medium fw-medium center hover-with-cursor",
})``;

const PrimaryButton = styled.button`
  color: ${({ theme }: { theme: ITheme }) => theme.black};
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
  border-radius: 8px;
  height: 50px;
  margin: auto;
  padding: 0 11px;
  width: 100%;
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  background-color: ${({ theme }: { theme: ITheme }) => theme.colorP3};

  :hover {
    outline: none !important;
    opacity: 0.9;
  }

  &.btn-disabled {
    background-color: ${({ theme }: { theme: ITheme }) => theme.colorP7};
  }
  :disabled {
    background-color: ${({ theme }: { theme: ITheme }) => theme.colorP7};
    :hover {
      opacity: 1;
    }
  }
  .loading {
    position: absolute;
    right: 20%;
  }
`;

const Button = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { customContent, title, disabled, className = "", ...rest } = props;
  return (
    <Styled
      type="button"
      className={`btn-container ${disabled ? "btn-disabled" : ""} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {customContent || title}
    </Styled>
  );
};

export { PrimaryButton1, PrimaryButton, SecondaryButton, Button, PrimaryButtonStyled, SecondButtonStyled };
