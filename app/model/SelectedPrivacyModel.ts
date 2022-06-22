import { common, CONSTANT_CONFIGS } from "@constants/index";
import { BIG_COINS } from "@constants/dexV2";
import { detectToken } from "@utils/misc";
import PToken from "./pTokenModel";
import { IBalance } from "@core/types";
import format from "@utils/format";
import BigNumber from "bignumber.js";
import convert from "@utils/convert";
const { PRVIDSTR } = require("incognito-chain-web-js/build/web/wallet");

function getNetworkName() {
  let name = "Unknown";
  // Native token of Ethereum network
  const isETH = this?.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.ETH;
  // Native token of Binance Smart Chain network
  const isBSC = this?.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB;
  // Native token of Binance Chain network
  const isBNB = this?.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.BNB;
  // Native token of Polygon network
  const isMATIC = this?.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.MATIC;
  // Native token of Fantom network
  const isFTM = this?.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.FTM;

  if (isBSC) {
    name = "BSC";
  } else if (isBNB) {
    name = "BNB Chain";
  } else if (this.isIncognitoToken || this.isMainCrypto) {
    name = "Incognito";
  } else if (this.isPrivateCoin) {
    name = `${this.name}`;
  } else if (this.isErc20Token) {
    name = "ERC20";
  } else if (this.isBep20Token) {
    name = "BEP20";
  } else if (this.isBep2Token) {
    name = "BEP2";
  } else if (this.isPolygonErc20Token) {
    name = "Polygon ERC20";
  } else if (this.isFantomErc20Token) {
    name = "Fantom ERC20";
  } else if (this.isIncognitoToken || this.isMainCrypto) {
    name = "Incognito";
  }

  let rootNetworkName = name;
  if (isETH || this?.isErc20Token) {
    rootNetworkName = common.NETWORK_NAME.ETHEREUM;
  } else if (isBSC || this?.isBep20Token) {
    rootNetworkName = common.NETWORK_NAME.BSC;
  } else if (isBNB || this?.isBep2Token) {
    rootNetworkName = common.NETWORK_NAME.BINANCE;
  } else if (isMATIC || this?.isPolygonErc20Token) {
    rootNetworkName = common.NETWORK_NAME.POLYGON;
  } else if (isFTM || this?.isFantomErc20Token) {
    rootNetworkName = common.NETWORK_NAME.FANTOM;
  }
  return {
    networkName: name,
    rootNetworkName,
  };
}

function combineData(pData: any, defaultData: any) {
  return pData || defaultData;
}

function getIconUrl(chainTokenImageUri: any) {
  let uri;

  if (this.tokenId === PRVIDSTR) {
    return "https://statics.incognito.org/wallet/cryptocurrency-icons/32@2x/color/prv@2x.png";
  }

  if (this.isMainCrypto || this.isPToken) {
    let formatedSymbol = String(this.symbol || this.externalSymbol).toUpperCase();
    uri = `${CONSTANT_CONFIGS.CRYPTO_ICON_URL}/${formatedSymbol}.png`;
  } else {
    uri = chainTokenImageUri;
  }

  return uri;
}

class SelectedPrivacy {
  currencyType: any;
  isToken: boolean;
  isMainCrypto: boolean;
  isPrivateToken: boolean;
  isPrivateCoin: boolean;
  isPToken: boolean;
  isIncognitoToken: any;
  isErc20Token: any;
  isBep2Token: any;
  isPolygonErc20Token: any;
  isFantomErc20Token: any;
  isBep20Token: any;
  symbol: any;
  name: any;
  shortName: any;
  displayName: any;
  contractId: any;
  decimals: any;
  pDecimals: number;
  externalSymbol: any;
  paymentAddress: any;
  isWithdrawable: any;
  isDeposable: any;
  isDecentralized: any;
  isCentralized: any;
  incognitoTotalSupply: any;
  isVerified: any;
  externalPriceUSD: any;

  pairWithPrv: any;
  networkName: string;
  rootNetworkName: string;
  isUSDT: boolean;
  isPRV: boolean;
  listChildToken: any;
  iconUrl: any;

  defaultPoolPair: any;
  defaultPairToken: any;
  network: any;
  hasSameSymbol: any;
  isETH: boolean;
  isBSC: boolean;
  isBNB: boolean;
  isMATIC: boolean;
  tokenId: string;

  priceUsd: any;
  pricePrv: any;
  change: any;

  amount: number;

  formatAmount?: string;
  formatPriceByUsd?: string;
  formatPriceByPrv?: string;
  formatAmountNoClip?: string;
  formatBalanceByUsd?: string;

  constructor(pTokenData: PToken | any = {}, _tokenID: string, followTokens: IBalance[]) {
    const tokenId = pTokenData?.tokenId;
    const isUnknown = _tokenID !== PRVIDSTR && !tokenId;
    const unknownText = "Incognito Token";

    this.amount = 0;
    this.currencyType = pTokenData.currencyType;
    this.isMainCrypto = _tokenID === PRVIDSTR; // PRV
    this.isToken = tokenId !== PRVIDSTR && !!tokenId;
    this.isPToken = !!pTokenData.pSymbol;

    // ERC20 tokens, BEP2 tokens
    this.isPrivateToken = pTokenData?.type === common.PRIVATE_TOKEN_TYPE.TOKEN;

    // native coins pETH, pBTC, pTOMO,...
    this.isPrivateCoin = pTokenData?.type === common.PRIVATE_TOKEN_TYPE.COIN;

    // pToken is private token (pETH <=> ETH, pBTC <=> BTC, ...)
    this.isIncognitoToken = (!this.isPToken && !this.isMainCrypto) || detectToken.ispNEO(tokenId); // is tokens were issued from users
    this.isErc20Token = this.isPrivateToken && this.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.ERC20;
    this.isBep2Token = this.isPrivateToken && this.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.BNB_BEP2;
    this.isPolygonErc20Token =
      this.isPrivateToken && this.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.POLYGON_ERC20;
    this.isFantomErc20Token =
      this.isPrivateToken && this.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.FANTOM_ERC20;
    this.isBep20Token = this.isPrivateToken && this.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20;
    this.symbol = combineData.call(this, pTokenData?.pSymbol, "");
    this.name = combineData.call(this, pTokenData?.name, isUnknown ? unknownText : "Privacy");
    this.displayName = combineData.call(this, `Privacy ${pTokenData?.symbol}`, isUnknown ? unknownText : "Privacy");

    this.tokenId = _tokenID ? _tokenID : this.isMainCrypto ? PRVIDSTR : tokenId;
    this.contractId = pTokenData.contractId;
    this.decimals = this.isMainCrypto ? common.DECIMALS.MAIN_CRYPTO_CURRENCY : pTokenData.decimals;
    this.pDecimals = this.isMainCrypto ? common.DECIMALS.MAIN_CRYPTO_CURRENCY : pTokenData.pDecimals || 0;
    this.externalSymbol = pTokenData.symbol;
    this.isWithdrawable = this.isPToken;
    this.isDeposable = this.isPToken;
    this.isDecentralized =
      this.isErc20Token ||
      (this.isToken && this.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.ETH) ||
      this.isBep20Token ||
      (this.isToken && this.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB) ||
      this.isPolygonErc20Token ||
      (this.isToken && this.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.MATIC) ||
      this.isFantomErc20Token ||
      (this.isToken && this.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.FTM);
    this.isCentralized = this.isToken && !this.isDecentralized;
    this.incognitoTotalSupply = (this.isIncognitoToken && Number(pTokenData?.totalSupply)) || 0;
    this.isVerified = combineData.call(this, pTokenData?.verified, !isUnknown); // PRV always is verified
    this.priceUsd = pTokenData?.priceUsd || 0;
    this.externalPriceUSD = pTokenData?.externalPriceUSD || 0;
    this.pricePrv = pTokenData?.pricePrv || 0;
    this.pairWithPrv = pTokenData?.pairPrv;
    const { networkName, rootNetworkName } = getNetworkName.call(this);
    this.networkName = networkName;
    this.rootNetworkName = rootNetworkName;
    this.isUSDT = this.tokenId === BIG_COINS.USDT;
    this.isPRV = this.tokenId === BIG_COINS.PRV;
    this.symbol = this.externalSymbol || this.symbol || "";
    // if (!this.symbol && this.isIncognitoToken && !this.isMainCrypto) {
    //   this.symbol = "INC";
    // }
    this.listChildToken = pTokenData?.listChildToken;
    this.iconUrl = getIconUrl.call(this, pTokenData.image);
    this.change = pTokenData?.change;
    this.defaultPoolPair = pTokenData?.defaultPoolPair;
    this.defaultPairToken = pTokenData?.defaultPairToken;
    this.network = pTokenData.network;
    this.hasSameSymbol = pTokenData.hasSameSymbol;

    this.shortName = this.name;
    if (this.name && this.name.includes("(")) {
      const splitArr_1 = this.name.split("(");
      const splitArr_2 = this.name.split(")");
      if (splitArr_1[0] && splitArr_1[0].trim()) {
        this.shortName = splitArr_1[0];
      } else if (splitArr_2[1]) {
        this.shortName = splitArr_2[1];
      }
    }

    // Native Token of Network
    this.isETH = this?.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.ETH;
    this.isBSC = this?.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB;
    this.isBNB = this?.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.BNB;
    this.isMATIC = this?.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.MATIC;

    // amount
    const followToken = followTokens.find(({ id }) => id === tokenId);
    if (followToken) {
      const { amount } = followToken;
      this.amount = new BigNumber(amount || "0").toNumber();

      const formatPriceByUsd = format.formatAmount({
        humanAmount: this.priceUsd,
        decimals: this.pDecimals,
        decimalDigits: false,
      });

      const formatPriceByPrv = format.formatAmount({
        humanAmount: this.pricePrv,
        decimals: this.pDecimals,
        decimalDigits: false,
      });

      const formatAmount = format.amountVer2({
        originalAmount: Number(amount || 0),
        decimals: this.pDecimals,
      });

      const formatAmountNoClip = format.formatAmount({
        originalAmount: Number(amount || 0),
        decimals: this.pDecimals,
        decimalDigits: true,
        clipAmount: false,
      });

      const formatBalanceByUsd = format.amountVer2({
        originalAmount: convert.toOriginalAmount({
          humanAmount: new BigNumber(convert.toString({ text: formatAmount.toString() }))
            .multipliedBy(convert.toString({ text: formatPriceByUsd }))
            .toString(),
          decimals: this.pDecimals,
        }),
        decimals: this.pDecimals,
      });
      this.formatPriceByUsd = formatPriceByUsd;
      this.formatPriceByPrv = formatPriceByPrv;
      this.formatAmount = formatAmount;
      this.formatAmountNoClip = formatAmountNoClip;
      this.formatBalanceByUsd = formatBalanceByUsd;
    }
  }
}

export default SelectedPrivacy;
