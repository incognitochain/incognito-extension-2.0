import { common, CONSTANT_CONFIGS } from "@constants/index";
import { BIG_COINS } from "@constants/dexV2";
import { detectToken } from "@utils/misc";
import PToken from "./pTokenModel";

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

function combineData(pData: any, incognitoData: any, defaultData: any) {
  if (this.isPToken) {
    return pData || incognitoData;
  }

  if (this.isIncognitoToken) {
    return incognitoData || pData;
  }

  return defaultData;
}

function getIconUrl(chainTokenImageUri: any) {
  let uri;

  if (this.tokenId === common.PRV_ID) {
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
  displayName: any;
  contractId: any;
  decimals: any;
  pDecimals: any;
  externalSymbol: any;
  paymentAddress: any;
  isWithdrawable: any;
  isDeposable: any;
  isDecentralized: any;
  isCentralized: any;
  incognitoTotalSupply: any;
  isVerified: any;
  priceUsd: any;
  externalPriceUSD: any;
  pricePrv: any;
  pairWithPrv: any;
  networkName: string;
  rootNetworkName: string;
  isUSDT: boolean;
  isPRV: boolean;
  amount: any;
  listChildToken: any;
  iconUrl: any;
  change: any;
  defaultPoolPair: any;
  defaultPairToken: any;
  network: any;
  hasSameSymbol: any;
  isETH: boolean;
  isBSC: boolean;
  isBNB: boolean;
  isMATIC: boolean;
  tokenId: any;

  constructor(account: any = {}, token: any = {}, pTokenData: PToken | any = {}, _tokenID: any) {
    const tokenId = pTokenData?.tokenId || token?.id;
    const isUnknown = _tokenID !== common.PRV_ID && !tokenId;
    const unknownText = "Incognito Token";

    this.currencyType = pTokenData.currencyType;
    this.isToken = tokenId !== common.PRV_TOKEN_ID && !!tokenId; // all kind of tokens (private tokens, incognito tokens)
    this.isMainCrypto = _tokenID === common.PRV_ID; // PRV
    this.isPrivateToken = pTokenData?.type === common.PRIVATE_TOKEN_TYPE.TOKEN; // ERC20 tokens, BEP2 tokens
    this.isPrivateCoin = pTokenData?.type === common.PRIVATE_TOKEN_TYPE.COIN; // pETH, pBTC, pTOMO,...
    this.isPToken = !!pTokenData.pSymbol; // pToken is private token (pETH <=> ETH, pBTC <=> BTC, ...)
    this.isIncognitoToken = (!this.isPToken && !this.isMainCrypto) || detectToken.ispNEO(this?.tokenId); // is tokens were issued from users
    this.isErc20Token = this.isPrivateToken && this.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.ERC20;
    this.isBep2Token = this.isPrivateToken && this.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.BNB_BEP2;
    this.isPolygonErc20Token =
      this.isPrivateToken && this.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.POLYGON_ERC20;
    this.isFantomErc20Token =
      this.isPrivateToken && this.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.FANTOM_ERC20;
    this.isBep20Token = this.isPrivateToken && this.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20;
    this.symbol = combineData.call(this, pTokenData?.pSymbol, token?.symbol, common.CRYPTO_SYMBOL.PRV);
    this.name = combineData.call(this, pTokenData?.name, token?.name, isUnknown ? unknownText : "Privacy");
    this.displayName = combineData.call(
      this,
      `Privacy ${pTokenData?.symbol}`,
      token?.name,
      isUnknown ? unknownText : "Privacy",
    );

    this.tokenId = _tokenID ? _tokenID : this.isMainCrypto ? common.PRV_TOKEN_ID : tokenId;
    this.contractId = pTokenData.contractId;
    this.decimals = this.isMainCrypto ? common.DECIMALS.MAIN_CRYPTO_CURRENCY : pTokenData.decimals;
    this.pDecimals = this.isMainCrypto ? common.DECIMALS.MAIN_CRYPTO_CURRENCY : pTokenData.pDecimals || 0;
    this.externalSymbol = pTokenData.symbol;
    this.paymentAddress = account.PaymentAddress;
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
    this.incognitoTotalSupply = (this.isIncognitoToken && Number(token?.totalSupply)) || 0;
    this.isVerified = combineData.call(this, pTokenData?.verified, token?.verified, !isUnknown); // PRV always is verified
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
    if (!this.symbol && this.isIncognitoToken && !this.isMainCrypto) {
      this.symbol = "INC";
    }
    this.amount = token?.amount;
    if (this.isMainCrypto) {
      this.amount = account?.value;
      this.symbol = common.PRV.symbol;
    }
    this.amount = this.amount || 0;
    this.listChildToken = pTokenData?.listChildToken;
    this.iconUrl = getIconUrl.call(this, token?.image || pTokenData.image);
    this.change = pTokenData?.change;
    this.defaultPoolPair = pTokenData?.defaultPoolPair;
    this.defaultPairToken = pTokenData?.defaultPairToken;
    this.network = pTokenData.network;
    this.hasSameSymbol = pTokenData.hasSameSymbol;

    // Native Token of Network
    this.isETH = this?.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.ETH;
    this.isBSC = this?.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB;
    this.isBNB = this?.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.BNB;
    this.isMATIC = this?.currencyType === common.PRIVATE_TOKEN_CURRENCY_TYPE.MATIC;
  }
}

export default SelectedPrivacy;
