import styled, { ITheme } from "styled-components";
import React from "react";
import { UnCheckIcon, CheckedIcon } from "@popup/components/Icons";

const Contariner = styled.button`
  width: 17px;
  height: 17px;
`;

interface CheckBoxButtonProps {
  isChecked?: boolean;
  onClick?: () => void;
}

export const CheckBoxButton = (props: CheckBoxButtonProps) => {
  const { isChecked, onClick = () => {} } = props;
  return (
    <Contariner className="center" onClick={onClick}>
      {isChecked ? <CheckedIcon /> : <UnCheckIcon />}
    </Contariner>
  );
};
