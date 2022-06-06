import React from "react";
import styled, { ITheme } from "styled-components";

const Styled = styled.button`
  padding-left: 8px;
  padding-right: 8px;
  border: 1px solid ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  border-radius: 4px;
  min-height: 24px;
`;

const MaxBtn = React.memo((props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Styled type="button" {...props}>
      <p>Max</p>
    </Styled>
  );
});

export default MaxBtn;
