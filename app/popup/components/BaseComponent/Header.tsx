import React from "react";
import styled, { ITheme } from "styled-components";
import { BackIcon } from "@popup/components/Icons";

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

const BackIconContainer = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 24px;
`;

const TitleStyled = styled.p`
  margin-left: 12px;
  text-align: left;
`;

const RightViewContainer = styled.div`
  position: absolute;
  right: 0;
  margin-right: 24px;
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
      <BackIconContainer className="hover-with-cursor" onClick={onBackClick}>
        <BackIcon />
      </BackIconContainer>
      <TitleStyled className="fw-medium fs-large">{title}</TitleStyled>
      {rightView && <RightViewContainer>{rightView}</RightViewContainer>}
    </Container>
  );
};

export default Header;
