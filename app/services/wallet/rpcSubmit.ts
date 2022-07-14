import createAxiosInstance from "@services/wallet/axios";
import { AxiosInstance } from "axios";

class RpcSubmit {
  http: AxiosInstance;
  constructor() {
    this.http = createAxiosInstance({ baseURL: "https://api-webapp-staging.incognito.org/" });
  }

  submitUnshieldTx(payload: any) {
    return this.http.post("submitunshieldtx", payload);
  }
}

const rpcSubmit = new RpcSubmit();
export default rpcSubmit;
