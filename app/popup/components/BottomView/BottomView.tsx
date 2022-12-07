import React, { memo } from "react";
import styled, { ITheme } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0px;
  position: absolute;
  padding: 16px 24px 16px 24px;
  left: 0;
  right: 0;
  bottom: 0;
  height: 85px;
  width: 100%;
  border-radius: 16px 16px 0px 0px;
  background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
`;

interface Props {
  children?: React.ReactNode;
}

const BottomView = React.memo((props: Props) => {
  const { children } = props;
  return <Container>{children}</Container>;
});

export default BottomView;
