import React from "react";
import styled, { ITheme } from "styled-components";

const Styled = styled.div<{ paddingTop: boolean }>`
  flex: 1;
  display: block;
  border-radius: 26px 26px 0 0;
  overflow: hidden;
  background: ${({ theme }: { theme: ITheme }) => theme.content};
  padding-top: ${({ paddingTop }: { paddingTop: boolean }) => (paddingTop ? "24" : "0")}px;
`;

interface IProps {
  children?: React.ReactNode;
  paddingTop?: boolean;
  className?: string;
}

const WrapContent = React.memo((props: IProps) => {
  const { children, paddingTop = false, className } = props;
  return (
    <Styled className={`scroll-view wrap-content ${className ? className : ""}`} paddingTop={paddingTop}>
      {children}
    </Styled>
  );
});

export default WrapContent;
