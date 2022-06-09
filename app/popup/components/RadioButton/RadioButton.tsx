import styled, { ITheme } from "styled-components";
import React from "react";

const Contariner = styled.div`
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
}

export const RadioButton = (props: RadioButtonProps) => {
  const { isChecked } = props;
  return <Contariner className="center">{isChecked && <FillContent />}</Contariner>;
};
