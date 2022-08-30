import axios, { AxiosError } from "axios";
import { camelCaseKeys } from "@popup/utils";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";

const TIMEOUT = 20000;

const HEADERS = { "Content-Type": "application/json" };

const createAxiosInstance = ({ baseURL = "" }: { baseURL: string }) => {
  const instance = axios.create({
    baseURL,
    timeout: TIMEOUT,
    headers: {
      ...HEADERS,
    },
    adapter: fetchAdapter,
  });

  instance.interceptors.request.use(
    (req) => {
      req.headers = {
        ...req.headers,
      };
      return req;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (res) => {
      const result = res?.data?.Result;
      const error = res?.data?.Error;
      if (error) {
        return Promise.reject(camelCaseKeys(error));
      }
      return Promise.resolve(result);
    },
    (axiosError: AxiosError) => {
      if (axiosError?.isAxiosError && !axiosError?.response) {
        throw new Error("Send request API failed");
      }
      const { response: { data } = {} } = axiosError;
      const { error } = data || {};
      return Promise.reject(camelCaseKeys(error || axiosError));
    },
  );

  return instance;
};

export default createAxiosInstance;
