import { lazy } from "react";
import { IRouteProps } from "@popup/module";

export const route = "/settings";

const settingsRoute: IRouteProps = {
  path: route,
  component: lazy(() => import("./Settings")),
};

export default settingsRoute;
