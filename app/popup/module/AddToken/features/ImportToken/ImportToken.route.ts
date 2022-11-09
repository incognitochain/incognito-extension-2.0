import { lazy } from "react";
import { IRouteProps } from "@popup/module";

export const route = "/import-token-info";

const ImportTokenRoute: IRouteProps = {
  path: route,
  component: lazy(() => import("./ImportToken")),
};

export default ImportTokenRoute;
