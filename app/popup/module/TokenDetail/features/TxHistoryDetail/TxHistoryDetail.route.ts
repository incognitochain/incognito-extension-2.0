import { lazy } from "react";
import { IRouteProps } from "@popup/module";

export const route = "/tx-history-detail";

const TxHistoryDetailRoute: IRouteProps = {
  path: route,
  component: lazy(() => import("./TxHistoryDetail")),
};

export default TxHistoryDetailRoute;
