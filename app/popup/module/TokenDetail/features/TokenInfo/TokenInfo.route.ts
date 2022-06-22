import { lazy } from "react";
import { IRouteProps } from "@popup/module";

export const route = "/token-info";

const TokenInfoRoute: IRouteProps = {
  path: route,
  component: lazy(() => import("./TokenInfo")),
};

export default TokenInfoRoute;
