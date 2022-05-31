import React, { useState } from "react";
import styled, { ITheme } from "styled-components";
import { P2_Regular, P1_Regular, P2_Medium } from "@popup/theme/Theme";

const Container = styled.button`
  box-sizing: border-box;

  width: 103px;
  height: 40px;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 9px 16px 10px 12px;
  gap: 8px;

  /* Background/Tertiary Black */

  border: 1px solid #404040;
  border-radius: 8px;

  :hover {
    outline: none !important;
    border: 1px solid yellow;
    cursor: pointer;
  }

  :active {
    background: blue;
  }

  .focus {
    color: red;
  }

  :disabled {
    :hover {
      opacity: 1;
      border: 1px solid #404040;
      cursor: default;
    }
    :active {
      background: transparent;
    }
  }
`;

const IndexText = styled(P2_Regular)`
  color: #9c9c9c;
  text-align: left;
`;

const TitleText = styled(P2_Regular)`
  color: #ffffff;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

interface MnemonicItemProps {
  index: number;
  title: string;
  disabled?: boolean;
  onClick?: () => void;
}

const MnemonicItem = (props: MnemonicItemProps) => {
  const { index = 1, title = "", disabled = true, onClick = () => {} } = props;
  const [selected, setSelected] = useState(false);

  const backgroundColor = selected && !disabled ? "#404040" : "transparent";

  const onClickItem = () => {
    setSelected(!selected);
    onClick && onClick();
  };

  return (
    <Container disabled={disabled} onClick={onClickItem} style={{ backgroundColor }}>
      <IndexText>#{index + 1}</IndexText>
      <TitleText>{title}</TitleText>
    </Container>
  );
};

export default MnemonicItem;
