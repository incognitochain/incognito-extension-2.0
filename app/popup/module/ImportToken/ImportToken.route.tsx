import { lazy } from "react";
import { IRouteProps } from "@popup/module";

export const route = "/import-tokens";

const ImportTokenRoute: IRouteProps = {
  path: route,
  component: lazy(() => import("./ImportToken")),
};

export default ImportTokenRoute;
