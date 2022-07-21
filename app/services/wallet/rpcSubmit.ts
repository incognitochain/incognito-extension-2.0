import createAxiosInstance from "@services/wallet/axios";
import { AxiosInstance } from "axios";
import { isMainnet } from "@popup/configs";

class RpcSubmit {
  http: AxiosInstance;
  constructor() {
    const url = isMainnet ? "https://api-webapp.incognito.org/" : "https://api-webapp-staging.incognito.org/";
    this.http = createAxiosInstance({ baseURL: url });
  }

  submitUnshieldTx(payload: any) {
    return this.http.post("submitunshieldtx", payload);
  }
}

const rpcSubmit = new RpcSubmit();
export default rpcSubmit;
