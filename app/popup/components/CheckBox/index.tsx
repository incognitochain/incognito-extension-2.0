import React from "react";
import styled, { ITheme } from "styled-components";

const CheckedBoxImg = styled.img`
  width: 24px;
  height: 24px;
  margin: 0;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

interface CheckBoxProps {
  isActive: boolean;
  onClicked?: () => void;
}

const CheckBox = (props: CheckBoxProps) => {
  const { isActive = false, onClicked = () => {} } = props;
  return isActive ? (
    <CheckedBoxImg src="./icons/ic_checked_box.png" onClick={onClicked} />
  ) : (
    <CheckedBoxImg src="./icons/ic_check_box.png" onClick={onClicked} />
  );
};

export default CheckBox;
