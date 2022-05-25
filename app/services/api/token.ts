import { cachePromise, EXPIRED_TIME, KEYS } from "@services/cache";
import http from "@services/http";
import PTokenModel from "@model/pTokenModel";
import IncognitoCoinInfoModel from "@model/IncognitoCoinInfoModel";

const getTokenListNoCache = () => {
  return http.get("coins/tokenlist").then((res: any) => res.map((token: any) => new PTokenModel(token, res)));
};

export const getTokensInfo = (tokenIDs: any = []) => {
  return http
    .post("coins/tokeninfo", { TokenIDs: tokenIDs })
    .then((res: any) => res?.map((token: any) => new PTokenModel(token, res)))
    .catch((error: any) => {
      console.log("error", error);
      return [];
    });
};

export const getTokenList = ({ expiredTime = EXPIRED_TIME } = {}) => {
  return cachePromise(KEYS.P_TOKEN, getTokenListNoCache, expiredTime);
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
