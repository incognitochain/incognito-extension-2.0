import { cachePromise, EXPIRED_TIME, KEYS } from "@services/cache";
import http from "@services/http";
import http1 from "@services/http1";
import PTokenModel from "@model/pTokenModel";
import IncognitoCoinInfoModel from "@model/IncognitoCoinInfoModel";
import { MAINNET_FULLNODE } from "@services/wallet/Server";

const getTokenListNoCache = () => {
  return http1.get("coins/tokenlist").then((res: any) => res.map((token: any) => new PTokenModel(token, res)));
};

export const getTokensInfo = ({ tokenIDs }: { tokenIDs: string[] }) => {
  return http1
    .post("coins/tokeninfo", { TokenIDs: tokenIDs })
    .then((res: any) => res?.map((token: any) => new PTokenModel(token, res)))
    .catch((error: any) => {
      console.log("error", error);
      return [];
    });
};

export const getTokenList = ({ expiredTime = EXPIRED_TIME, network = MAINNET_FULLNODE } = {}) => {
  return cachePromise(`${KEYS.P_TOKEN}-${network ? network : ""}`, getTokenListNoCache, expiredTime);
};

const getTokenInfoNoCache =
  ({ tokenId }: any = {}) =>
  () => {
    const endpoint = tokenId ? "pcustomtoken/get" : "pcustomtoken/list";
    return http.get(endpoint, tokenId ? { params: { TokenID: tokenId } } : undefined).then((res: any) => {
      return tokenId ? new IncognitoCoinInfoModel(res) : res.map((token: any) => new IncognitoCoinInfoModel(token));
    });
  };

export const getTokenInfo = ({ tokenId }: any = {}) => {
  return cachePromise(KEYS.P_CUSTOM_TOKEN, getTokenInfoNoCache({ tokenId }));
};
