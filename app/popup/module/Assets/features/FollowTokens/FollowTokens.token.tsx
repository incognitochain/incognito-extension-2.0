import React from "react";
import styled, { ITheme } from "styled-components";
import { Row } from "@popup/theme";
import SelectedPrivacy from "@model/SelectedPrivacyModel";

export interface IToken {
  id: string;
}

const Styled = styled(Row)`
  height: 74px;
  align-items: center;
  cursor: pointer;
  :hover {
    background: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
  }
  .logo {
    width: 40px;
    height: 40px;
    margin-right: 14px;
  }
  .wrap-content {
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    flex: 1;
  }
  .desc-text {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
  }
`;

const Token = React.memo((props: SelectedPrivacy) => {
  const { symbol, name, formatAmount, formatBalanceByUsd, iconUrl } = props;
  return (
    <Styled className="default-padding-horizontal">
      <img className="logo noselect" src={iconUrl} alt="logo-icon" />
      <Row className="wrap-content">
        <div>
          <p className="fs-medium noselect">{symbol}</p>
          <p className="desc-text fs-small noselect">{name}</p>
        </div>
        <div>
          <p className="fs-medium text-align-right noselect">{`$${formatBalanceByUsd}`}</p>
          <p className="text-align-right desc-text fs-small noselect">{`${formatAmount} ${symbol}`}</p>
        </div>
      </Row>
    </Styled>
  );
});

export default Token;
