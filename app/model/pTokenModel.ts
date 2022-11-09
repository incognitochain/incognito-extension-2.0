import TokenModel from "./TokenModel";

class PToken {
  id?: any;
  address?: any;
  createdAt?: any;
  updatedAt?: any;
  deletedAt?: any;
  tokenId?: any;
  symbol?: any;
  name?: any;
  contractId?: any;
  decimals?: any;
  pDecimals?: any;
  type?: any;
  pSymbol?: any;
  default?: any;
  userId?: any;
  verified?: any;
  currencyType?: any;
  priceUsd?: any;
  externalPriceUSD?: any;
  pairPrv?: boolean;
  change?: any;
  pricePrv?: any;
  defaultPoolPair?: any;
  defaultPairToken?: any;
  network?: any;
  image?: any;
  hasSameSymbol?: boolean;
  listChildToken?: any;
  parentID?: any;
  isUnified: boolean;
  listUnifiedToken: any;

  constructor(data: any = {}, pTokens = []) {
    const pairPrv = data?.CurrentPrvPool !== 0;
    this.id = data.ID;
    this.address = data.ContractID;
    this.createdAt = data.CreatedAt;
    this.updatedAt = data.UpdatedAt;
    this.deletedAt = data.DeletedAt;
    this.tokenId = data.TokenID;
    this.symbol = data.Symbol;
    this.name = data.Name;
    this.contractId = data.ContractID;
    this.decimals = data.Decimals;
    this.pDecimals = data.PDecimals;
    this.type = data.Type; // coin or token
    this.pSymbol = data.PSymbol;
    this.default = data.Default;
    this.userId = data.UserID;
    this.verified = data.Verified;
    this.currencyType = data.CurrencyType; // including ERC20, BEP1, BEP2,...
    this.priceUsd = data?.PriceUsd;
    this.externalPriceUSD = data?.ExternalPriceUSD; // current market price
    this.pairPrv = pairPrv;
    this.change = data?.PercentChange24h || "";
    this.pricePrv = data?.PricePrv || 0;
    this.defaultPoolPair = data?.DefaultPoolPair;
    this.defaultPairToken = data?.DefaultPairToken;
    this.network = data?.Network;
    this.image = data?.Image;
    const tokens = pTokens && pTokens.filter((_token: any) => _token.Symbol && _token.Symbol === data.Symbol);
    this.hasSameSymbol = tokens && tokens.length > 1;
    if (data && data.ListChildToken instanceof Array) {
      this.listChildToken = data.ListChildToken.map((item: any) => {
        let newItem = new PToken(item);
        newItem.parentID = item.ParentID;
        return newItem;
      });
    } else {
      this.listChildToken = [];
    }
    if (data && data.ListUnifiedToken instanceof Array) {
      this.listUnifiedToken = data.ListUnifiedToken.map((item: any) => {
        let newItem = new PToken(item);
        newItem.parentID = item.ParentID;
        return newItem;
      });
    } else {
      this.listUnifiedToken = [];
    }
    this.isUnified = this.listUnifiedToken && this.listUnifiedToken.length > 0;
  }

  /**
   * Convert to data structure of token which stored in wallet object
   */
  convertToToken() {
    return TokenModel.toJson({
      id: this.tokenId,
      isPrivacy: true,
      name: this.name,
      symbol: this.pSymbol,
      isInit: false,
      // listTxs,
      // image,
      // amount
    });
  }
}

export default PToken;
