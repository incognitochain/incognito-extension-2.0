import React from "react";
import styled, { ITheme } from "styled-components";

const Styled = styled.div`
  flex: 1;
  display: flex;
  border-radius: 26px 26px 0 0;
  overflow: hidden;
  background: ${({ theme }: { theme: ITheme }) => theme.content};
  padding-top: 16px;
`;

interface IProps {
  children?: React.ReactNode;
}

const WrapContent = React.memo((props: IProps) => {
  const { children } = props;
  return <Styled className="default-padding-horizontal">{children}</Styled>;
});

export default WrapContent;
