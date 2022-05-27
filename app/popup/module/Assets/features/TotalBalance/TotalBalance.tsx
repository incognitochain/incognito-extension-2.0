import React from "react";
import styled, { ITheme } from "styled-components";

const Styled = styled.p`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  text-align: center;
  margin-top: 20px;
`;

const TotalBalance = React.memo(() => {
  return <Styled className="fs-avglarge fw-medium">$100,000,05</Styled>;
});

export default TotalBalance;
