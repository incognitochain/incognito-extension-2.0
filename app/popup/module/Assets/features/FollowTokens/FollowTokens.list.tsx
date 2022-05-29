import React from "react";
import { MainStyled } from "@module/Assets/Assets.styled";
import WrapContent from "@components/Content/Content";
import { FollowTokenItem } from "@module/Assets/features";
import { IToken } from "@module/Assets/features/FollowTokens/FollowTokens.token";

const FollowTokensList = React.memo(() => {
  const tokens = [
    { symbol: "PRV", name: "Privacy", amount: "1,000 PRV", usdAmount: "$87,000,000" },
    { symbol: "BTC", name: "Bitcoin", amount: "2,000 BTC", usdAmount: "$1,000,000" },
    { symbol: "XMR", name: "Monero", amount: "3,050 XMR", usdAmount: "$4,000,000" },
    { symbol: "ETH", name: "Ethereum", amount: "1,000 ETH", usdAmount: "$2,000,000" },
    { symbol: "LTC", name: "LiteCoin", amount: "4,00 LTC", usdAmount: "$2,000,000" },
    { symbol: "FTM", name: "Fantom", amount: "1,00 FTM", usdAmount: "$2,000,000" },
    { symbol: "MATIC", name: "Polygon", amount: "8,000 MATIC", usdAmount: "$2,000,000" },
  ];

  return (
    <WrapContent>
      <MainStyled className="scroll-view">
        {tokens.map((item: IToken, index: number) => (
          <FollowTokenItem {...item} index={index} key={item.symbol} />
        ))}
      </MainStyled>
    </WrapContent>
  );
});

export default FollowTokensList;
