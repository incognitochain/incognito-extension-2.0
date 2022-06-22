import { cachePromise } from "./cache";
import { setTokenHeader } from "@services/http";
import { getAccesTokenFromServer } from "./api/auth";

export const getTokenNoCache = async () => {
  return await getAccesTokenFromServer();
};

export const getToken = async () => {
  const result = await cachePromise("AUTH_TOKEN", () => getTokenNoCache(), 100000000000);
  return result;
};

export const login = async () => {
  // const token = await getToken();
  // setTokenHeader(token);
  // return token;
};

export default {
  getTokenNoCache,
  getToken,
};
