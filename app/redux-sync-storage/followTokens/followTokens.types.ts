import { Action } from "redux";
import PTokenModel from "@model/pTokenModel";

export type PToken = {
  address: string;
  change: string;
  contractId: string;
  createdAt: string;
  currencyType: number;
  decimals: number;
  default: boolean;
  defaultPairToken: string;
  defaultPoolPair: string;
  deletedAt: string;
  externalPriceUSD: number;
  hasSameSymbol: boolean;
  id: undefined;
  image: "";

  listChildToken: PToken[];
  name: string;
  network: string;
  pDecimals: number;
  pSymbol: string;
  pairPrv: boolean;
  parentID: number;
  pricePrv: number;
  priceUsd: number;
  symbol: string;
  tokenId: string;
  type: number;

  updatedAt: string;
  userId: number;
  verified: boolean;
};

export type SelectedPrivacy = {
  amount: number;
  change: string;
  contractId: string;
  currencyType: number;
  decimals: number;
  defaultPairToken: string;
  defaultPoolPair: string;
  displayName: string;
  externalPriceUSD: number;
  externalSymbol: string;
  formatAmount: string;
  formatAmountNoClip: string;
  formatBalanceByUsd: string;
  formatPriceByPrv: string;
  formatPriceByUsd: string;
  hasSameSymbol: number;
  iconUrl: string;
  incognitoTotalSupply: number;

  isBNB: boolean;
  isBSC: boolean;
  isBep2Token: boolean;
  isBep20Token: boolean;
  isCentralized: boolean;
  isDecentralized: boolean;
  isDeposable: boolean;
  isETH: boolean;
  isErc20Token: boolean;
  isFantomErc20Token: boolean;
  isIncognitoToken: boolean;
  isMATIC: boolean;
  isMainCrypto: boolean;
  isPRV: boolean;
  isPToken: boolean;
  isPolygonErc20Token: boolean;
  isPrivateCoin: boolean;
  isPrivateToken: boolean;
  isToken: boolean;
  isUSDT: boolean;
  isVerified: boolean;
  isWithdrawable: boolean;

  name: string;
  network: string;
  networkName: string;

  pDecimals: number;
  pairWithPrv: boolean;
  paymentAddress?: string;
  pricePrv: number;
  priceUsd: number;
  rootNetworkName: string;
  shortName: string;
  symbol: string;
  tokenId: string;

  listChildToken?: PToken[];
};

export enum FollowTokenActionType {
  SET = "REDUX_SYNC_STORAGE/FOLLOW_TOKEN/SET",
  SET_PTOKEN = "REDUX_SYNC_STORAGE/FOLLOW_TOKEN/SET_PTOKEN",
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------

export interface SetFollowTokenListAction extends Action {
  type: FollowTokenActionType.SET;
  payload: {
    followTokenList: SelectedPrivacy[];
  };
}

export interface SetPTokenListAction extends Action {
  type: FollowTokenActionType.SET_PTOKEN;
  payload: {
    pTokens: PTokenModel[];
  };
}

//----------------------------------------------

export type FollowTokenActions = SetFollowTokenListAction | SetPTokenListAction;

export {};
