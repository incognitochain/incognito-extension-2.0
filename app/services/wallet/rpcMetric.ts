import createAxiosInstance from "@services/wallet/axios";
import { AxiosInstance } from "axios";

export enum METRIC_TYPE {
  INSTALL = 41,
  OPEN = 42,
  SEND = 43,
  CONFIRM_SWAP = 44,
}

class RpcMetric {
  http: AxiosInstance;
  constructor() {
    const url = "https://churn-api-coinservice.incognito.org/";
    this.http = createAxiosInstance({ baseURL: url });
  }

  async updateMetric({ type }: { type: METRIC_TYPE }) {
    try {
      const now = Math.round(new Date().getTime() / 1000);
      await this.http.post("churn", {
        created_at: now,
        type_id: type,
        app: "extension",
      });
    } catch (e) {
      console.log("UPDATE METRIC WITH ERROR: ", e);
    }
  }
}

const rpcMetric = new RpcMetric();
export default rpcMetric;
