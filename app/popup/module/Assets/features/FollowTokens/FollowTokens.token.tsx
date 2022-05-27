import React from "react";
import styled from "styled-components";
import { Row } from "@popup/theme";
import btcLogo from "./btc.png";

interface IToken {
  name: string;
  symbol: string;
  amount: string;
  usdAmount: string;
}

const Styled = styled(Row)`
  height: 74px;
  align-items: center;
  :hover {
    background: red;
  }
  .wrap-content {
    justify-content: space-between;
  }
`;

const Token = React.memo((props: IToken) => {
  const { name, symbol, usdAmount, amount } = props;
  return (
    <Styled>
      <img src={btcLogo} style={{ width: 40, height: 40 }} alt="logo-icon" />
      <Row className="wrap-content">
        <div>
          <p>{symbol}</p>
          <p>{name}</p>
        </div>
        <div>
          <p>{usdAmount}</p>
          <p>{amount}</p>
        </div>
      </Row>
    </Styled>
  );
});

export default Token;
