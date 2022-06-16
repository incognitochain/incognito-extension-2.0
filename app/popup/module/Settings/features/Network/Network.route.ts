import { lazy } from "react";
import { IRouteProps } from "@popup/module";

export const route = "/network";

const networkRoute: IRouteProps = {
  path: route,
  component: lazy(() => import("./Network")),
};

export default networkRoute;
