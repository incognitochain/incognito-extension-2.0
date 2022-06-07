import React, { useState } from "react";
import styled, { ITheme } from "styled-components";

const Container = styled.button`
  box-sizing: border-box;

  width: 103px;
  height: 40px;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 9px 16px 10px 12px;
  gap: 8px;

  border: 1px solid ${({ theme }: { theme: ITheme }) => theme.primaryP9};
  border-radius: 8px;

  :hover {
    outline: none !important;
    border: 1px solid yellow;
    cursor: pointer;
  }

  :disabled {
    :hover {
      opacity: 1;
      border: 1px solid ${({ theme }: { theme: ITheme }) => theme.primaryP9};
      cursor: default;
    }
    :active {
      background: transparent;
    }
  }

  &.selected-color {
    background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
  }

  &.none-selecte-color {
    background-color: transparent;
  }
`;

const IndexText = styled.p`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
  text-align: left;
`;

const TitleText = styled.p`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
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

  const isSelected = selected && !disabled;

  const onClickItem = () => {
    setSelected(!selected);
    onClick && onClick();
  };

  return (
    <Container
      disabled={disabled}
      onClick={onClickItem}
      className={`${isSelected ? "selected-color" : "none-selecte-color"}`}
    >
      <IndexText className="fs-small fw-regular">#{index + 1}</IndexText>
      <TitleText className="fs-small fw-regular">{title}</TitleText>
    </Container>
  );
};

export default MnemonicItem;
