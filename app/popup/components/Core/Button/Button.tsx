import React from "react";
import styled, { ITheme } from "styled-components";

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

export default Button;
