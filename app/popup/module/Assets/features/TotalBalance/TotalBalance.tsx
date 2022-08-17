import React from "react";
import styled, { ITheme } from "styled-components";
// import { useSelector } from "react-redux";
// import sharedSelectors from "@redux/shared/shared.selectors";

const Styled = styled.p`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  text-align: center;
  margin-top: 20px;
`;

const TotalBalance = React.memo(() => {
  // const totalShield = useSelector(sharedSelectors.followTokensUSDAmountSelector);
  // return <Styled className="fs-avglarge fw-medium">{`$${totalShield}`}</Styled>;
  return <Styled className="fs-avglarge fw-medium">{`$0`}</Styled>;
});

export default TotalBalance;
