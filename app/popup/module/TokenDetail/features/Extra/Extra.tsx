import React from "react";
import styled, { ITheme } from "styled-components";
import { useSelector } from "react-redux";
import { selectedPrivacyToken } from "@redux/selectedPrivacy";

const Styled = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  .logo {
    width: 50px;
    height: 50px;
    margin-top: 24px;
  }
  .amount {
    margin-top: 24px;
  }
  .price-amount {
    margin-top: 2px;
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
  }
`;

const Extra = React.memo(() => {
  const { iconUrl, formatAmount, symbol, formatBalanceByUsd } = useSelector(selectedPrivacyToken);
  return (
    <Styled>
      <img className="logo noselect" src={iconUrl} alt="token-detail-icon" />
      <p className="fs-avglarge amount">{`${formatAmount} ${symbol}`}</p>
      <p className="fs-regular price-amount">{`$${formatBalanceByUsd}`}</p>
    </Styled>
  );
});

export default Extra;
