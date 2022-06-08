import { lazy } from "react";
import { IRouteProps } from "@popup/module";

const confirmTxRoute: IRouteProps = {
  path: "/receive",
  exact: true,
  component: lazy(() => import("./ConfirmTx")),
};

export const route = "/receive";

export default confirmTxRoute;
