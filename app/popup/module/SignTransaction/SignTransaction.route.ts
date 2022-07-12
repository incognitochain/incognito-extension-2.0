import { lazy } from "react";
import { IRouteProps } from "@popup/module";

export const route = "/sign-transaction";

const signTransactionRoute: IRouteProps = {
  path: route,
  component: lazy(() => import("./SignTransaction")),
};

export default signTransactionRoute;
