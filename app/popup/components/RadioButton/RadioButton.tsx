import styled, { ITheme } from "styled-components";
import React from "react";

const Contariner = styled.button`
  background: "transparent";
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid ${({ theme }: { theme: ITheme }) => theme.colorP7};
`;

const FillContent = styled.label`
  background: ${({ theme }: { theme: ITheme }) => theme.colorP10};
  width: 70%;
  height: 70%;
  border-radius: 50%;
`;

interface RadioButtonProps {
  isChecked?: boolean;
  onClick?: () => void;
}

export const RadioButton = (props: RadioButtonProps) => {
  const { isChecked, onClick = () => {} } = props;
  return (
    <Contariner className="center" onClick={onClick}>
      {isChecked && <FillContent />}
    </Contariner>
  );
};
