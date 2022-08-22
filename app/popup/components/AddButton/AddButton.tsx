import styled, { ITheme } from "styled-components";
import React from "react";

interface AddButtonProps {
  onClick?: () => void;
  className?: string;
}

const Styled = styled.button`
  background: ${({ theme }: { theme: ITheme }) => theme.content};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  position: relative;
`;

export const AddButton = (props: AddButtonProps) => {
  const { onClick = () => {}, className } = props;
  return (
    <Styled type="button" className={`icon center hover ${className || ""}`} onClick={onClick}>
      <p className="fw-bold" style={{ color: "white", marginTop: -4, fontSize: 30 }}>
        +
      </p>
    </Styled>
  );
};
