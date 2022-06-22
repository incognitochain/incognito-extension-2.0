import React from "react";
import { useSelector } from "react-redux";
import { selectedPrivacyToken } from "@redux/selectedPrivacy";
import CONSTANT_CONFIGS from "@constants/config";
import CONSTANT_COMMONS from "@constants/common";
import SelectedPrivacyModel from "@model/SelectedPrivacyModel";
import format from "@utils/format";
import { IHistoryItem } from "@module/TokenDetail/features/HistoryItem";
import { ellipsisCenter } from "@popup/utils";
const { PRVIDSTR } = require("incognito-chain-web-js/build/web/wallet");

export const getNetworkName = (selectedPrivacy: SelectedPrivacyModel) => {
  const { tokenId, networkName, network } = selectedPrivacy;
  let _network = network;
  if (tokenId === PRVIDSTR) {
    _network = networkName;
  }
  return `${_network} network`;
};

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any, ref: any) => {
  const selectedPrivacy = useSelector(selectedPrivacyToken);

  const {
    tokenId,
    isVerified,
    isBep2Token,
    isErc20Token,
    isPolygonErc20Token,
    isETH,
    isBSC,
    isMATIC,
    contractId,
    pDecimals,
    incognitoTotalSupply,
    externalSymbol,
    symbol,
  } = selectedPrivacy;

  const link = () => {
    if (isErc20Token || isETH) {
      return `${CONSTANT_CONFIGS.ETHERSCAN_URL}/token/${contractId}`;
    }
    if (isBep2Token || isBSC) {
      return `${CONSTANT_CONFIGS.BSCSCAN_URL}/token/${contractId}`;
    }
    if (isPolygonErc20Token || isMATIC) {
      return `${CONSTANT_CONFIGS.POLYGONSCAN_URL}/token/${contractId}`;
    }
    return "";
  };

  const infosFactories: IHistoryItem[] = [
    {
      title: "Origin",
      desc: getNetworkName(selectedPrivacy),
    },
    {
      title: "Original Ticker",
      desc: externalSymbol || symbol,
      link: isBep2Token && `${CONSTANT_CONFIGS.BINANCE_EXPLORER_URL}/asset/${externalSymbol}`,
    },

    {
      title: "Coin ID",
      desc: ellipsisCenter({ limit: 8, str: tokenId }),
      copyData: tokenId,
    },
    {
      title: "Contract ID",
      desc: contractId,
      link: link(),
    },
    {
      title: "Coin supply",
      desc: incognitoTotalSupply
        ? format.formatAmount({
            decimals: pDecimals,
            originalAmount: incognitoTotalSupply,
          })
        : "",
    },
  ];

  if (tokenId === PRVIDSTR) {
    const tokenChildETH = selectedPrivacy?.listChildToken.find(
      (x: SelectedPrivacyModel) => x.currencyType === CONSTANT_COMMONS.PRIVATE_TOKEN_CURRENCY_TYPE.ERC20,
    );
    const tokenChildBSC = selectedPrivacy?.listChildToken.find(
      (x: SelectedPrivacyModel) => x.currencyType === CONSTANT_COMMONS.PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20,
    );
    if (tokenChildETH && tokenChildETH?.contractId) {
      infosFactories.push({
        title: "ETH ID",
        desc: tokenChildETH?.contractId,
        link: `${CONSTANT_CONFIGS.ETHERSCAN_URL}/token/${tokenChildETH?.contractId}`,
      });
    }

    if (tokenChildBSC && tokenChildBSC?.contractId) {
      infosFactories.push({
        title: "BSC ID",
        desc: tokenChildBSC?.contractId,
        link: `${CONSTANT_CONFIGS.BSCSCAN_URL}/token/${tokenChildBSC?.contractId}`,
      });
    }
  }

  return <WrappedComponent {...{ ...props, infosFactories, isVerified, selectedPrivacy }} />;
};

export default enhance;
