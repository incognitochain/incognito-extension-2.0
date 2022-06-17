import { lazy } from "react";
import { IRouteProps } from "@popup/module";

export const route = "/add-network";

const addNetworkRoute: IRouteProps = {
  path: route,
  component: lazy(() => import("./AddNetwork")),
};

export default addNetworkRoute;
