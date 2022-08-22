import axios, { AxiosResponse } from "axios";
import { v4 } from "uuid";
import { CONSTANT_CONFIGS } from "@constants/index";
// import Log from "@src/services/log";
// import { CustomError, ErrorCode, ExHandler } from "./exception";
import Server from "@services/wallet/Server";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";

const CancelToken = axios.CancelToken;
const HEADERS = { "Content-Type": "application/json" };
const TIMEOUT = 45000;
const sources: any = {};

const CANCEL_MESSAGE = "Request cancelled";

export const CANCEL_KEY = "cancelPrevious";

let currentAccessToken = "";

const instance = axios.create({
  baseURL: CONSTANT_CONFIGS.API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    ...HEADERS,
    Authorization: "",
  },
  adapter: fetchAdapter,
});

let pendingSubscribers: any = [];
let isAlreadyFetchingAccessToken = false;

function onAccessTokenFetched(accessToken: any) {
  pendingSubscribers = pendingSubscribers.filter((callback: any) => callback(accessToken));
}

function addSubscriber(callback: any) {
  pendingSubscribers.push(callback);
}

async function login() {
  try {
    const tokenData: { Token: string; Expired: string } = await instance.post("/auth/new-token", {
      DeviceID: v4(),
      DeviceToken: v4(),
    });
    const token = tokenData.Token;
    setTokenHeader(token);
    return token;
  } catch (e) {
    // throw new CustomError(ErrorCode.user_login_failed, { rawError: e });
  }
}

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: "Bearer " + currentAccessToken,
      },
    };

    const path = config.url || "";
    if (path.includes(CANCEL_KEY)) {
      if (sources[path]) {
        sources[path].cancel(CANCEL_MESSAGE);
      }

      sources[path] = CancelToken.source();
      newConfig.cancelToken = sources[path].token;
    }
    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    const config = res?.config;
    const result = res?.data?.Result;
    return Promise.resolve(result);
  },
  (errorData) => {
    if (errorData?.message === CANCEL_MESSAGE) {
      // throw new CustomError(ErrorCode.api_request_cancelled);
    }

    const errResponse = errorData?.response;
    const originalRequest = errorData?.config;
    // can not get response, alert to user
    if (errorData?.isAxiosError && !errResponse) {
      // return new ExHandler(new CustomError(ErrorCode.network_make_request_failed)).throw();
    }

    // Unauthorized
    if (errResponse?.status === 401) {
      // Log.log("Token was expired");

      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;
        login().then((token: any) => {
          isAlreadyFetchingAccessToken = false;
          onAccessTokenFetched(token);
        });
      }

      const retryOriginalRequest = new Promise((resolve) => {
        addSubscriber((accessToken: any) => {
          originalRequest.headers.Authorization = "Bearer " + accessToken;
          setTokenHeader(accessToken);
          resolve(instance(originalRequest));
        });
      });

      return retryOriginalRequest;
    }

    // get response of error
    // wrap the error with CustomError to custom error message, or logging
    const data = errResponse?.data;
    if (data && data.Error) {
      // throw new CustomError(data.Error?.Code, {
      //   name: CustomError.TYPES.API_ERROR,
      //   message: data.Error?.Message,
      // });
    }

    return Promise.reject(errorData);
  },
);

export const setTokenHeader = (token: any) => {
  try {
    currentAccessToken = token;
    instance.defaults.headers.Authorization = `Bearer ${token}`;
  } catch {
    throw new Error("Can not set token request");
  }
};

export const changeBaseUrl = async () => {
  const isMainnet = await Server.isMainnetDefault();
  instance.defaults.baseURL = isMainnet
    ? "https://api-service.incognito.org"
    : "https://staging-api-service.incognito.org";
};
export default instance;
