import React from "react";
import styled, { ITheme } from "styled-components";
import { Row } from "@popup/theme";
import btcLogo from "./btc.png";

export interface IToken {
  name: string;
  symbol: string;
  amount: string;
  usdAmount: string;
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

interface ITokenProps extends IToken {
  index: number;
}

const Token = React.memo((props: ITokenProps) => {
  const { name, symbol, usdAmount, amount } = props;
  return (
    <Styled className="default-padding-horizontal">
      <img className="logo noselect" src={btcLogo} alt="logo-icon" />
      <Row className="wrap-content">
        <div>
          <p className="fs-medium noselect">{symbol}</p>
          <p className="desc-text fs-small noselect">{name}</p>
        </div>
        <div>
          <p className="fs-medium text-align-right noselect">{usdAmount}</p>
          <p className="text-align-right desc-text fs-small noselect">{amount}</p>
        </div>
      </Row>
    </Styled>
  );
});

export default Token;
