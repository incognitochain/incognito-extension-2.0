import { lazy } from "react";
import { IRouteProps } from "@popup/module";

const accountRoute: IRouteProps = {
  path: "/select-account",
  exact: true,
  component: lazy(() => import("./SelectAccount")),
};

export const route = "/select-account";

export default accountRoute;
