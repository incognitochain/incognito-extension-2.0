import React from "react";
import { IHistoryItem } from "@module/TokenDetail/features/HistoryItem";
import { ellipsisCenter } from "@popup/utils";
import { useLocation } from "react-router-dom";
import PTokenModel from "@model/pTokenModel";
const { PRVIDSTR } = require("incognito-chain-web-js/build/web/wallet");

export const getNetworkName = (token: PTokenModel) => {
  const { network } = token;
  return `${network} network`;
};

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any, ref: any) => {
  const location = useLocation() as any;
  const token = location.state.data;
  const { symbol, tokenId, contractId, verified, isUnified } = token;

  const infosFactories: IHistoryItem[] = [
    {
      title: "Origin",
      desc: getNetworkName(token),
    },
    {
      title: "Original Ticker",
      desc: symbol,
    },

    {
      title: "Coin ID",
      desc: ellipsisCenter({ limit: 7, str: tokenId }),
      copyData: tokenId,
    },
    {
      title: "Contract ID",
      desc: ellipsisCenter({ limit: 8, str: contractId }),
      // link: link(),
      disabled: !contractId || isUnified,
      copyData: contractId,
    },
  ];

  const listChild = tokenId === PRVIDSTR ? token.listChildToken : token.listUnifiedToken;
  if (listChild && listChild.length > 0) {
    listChild.forEach((child: PTokenModel) => {
      infosFactories.push({
        title: `${child.network} ID`,
        desc: ellipsisCenter({ limit: 8, str: child?.contractId }),
        copyData: child?.contractId,
      });
    });
  }

  return <WrappedComponent {...{ ...props, infosFactories, isVerified: verified, selectedPrivacy: token }} />;
};

export default enhance;
