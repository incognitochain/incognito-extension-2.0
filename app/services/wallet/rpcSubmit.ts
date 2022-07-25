import createAxiosInstance from "@services/wallet/axios";
import { AxiosInstance } from "axios";
import Server from "@services/wallet/Server";

class RpcSubmit {
  http: AxiosInstance;
  constructor() {
    const url = "https://api-webapp.incognito.org/";
    this.http = createAxiosInstance({ baseURL: url });
  }

  async submitUnshieldTx(payload: any) {
    await changeBaseUrl();
    return this.http.post("submitunshieldtx", payload);
  }
}

export const changeBaseUrl = async () => {
  const isMainnet = await Server.isMainnetDefault();
  rpcSubmit.http.defaults.baseURL = isMainnet
    ? "https://api-webapp.incognito.org/"
    : "https://api-webapp-staging.incognito.org/";
};

const rpcSubmit = new RpcSubmit();
export default rpcSubmit;
