import { lazy } from "react";
import { IRouteProps } from "@popup/module";

const configsRoute: IRouteProps = {
  path: "/configs",
  exact: true,
  component: lazy(() => import("./Configs")),
};

export const route = "/configs";

export default configsRoute;
