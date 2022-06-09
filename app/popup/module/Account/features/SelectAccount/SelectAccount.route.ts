import { lazy } from "react";
import { IRouteProps } from "@popup/module";

const accountRoute: IRouteProps = {
  path: "/select-account-page",
  exact: true,
  component: lazy(() => import("./SelectAccountPage")),
};

export const route = "/select-account-page";

export default accountRoute;
