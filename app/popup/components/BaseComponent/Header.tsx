import { H4 } from "@popup/theme/Theme";
import React from "react";
import styled, { ITheme } from "styled-components";

const Container = styled.div`
  background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP6};
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 64px;
  left: 0px;
  top: 0px;
`;

const BackIconStyled = styled.img`
  width: 24px;
  height: 24px;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const BackIcon = styled(BackIconStyled)`
  margin-left: 24px;
`;

const TitleStyled = styled(H4)`
  margin-left: 12px;
  text-align: left;
`;

interface HeaderProps {
  title?: string;
  rightView?: React.ReactNode;
  onBackClick?: () => void;
}

const Header = (props: HeaderProps) => {
  const { title = "", onBackClick = () => {}, rightView } = props;
  return (
    <Container>
      <BackIcon src="./icons/ic_back.png" onClick={onBackClick} />
      <TitleStyled>{title}</TitleStyled>
      {/* TO DO */}
      {rightView && <></>}
    </Container>
  );
};

export default Header;
