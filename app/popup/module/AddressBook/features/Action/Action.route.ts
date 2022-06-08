import { lazy } from "react";
import { IRouteProps } from "@popup/module";

const createRoute: IRouteProps = {
  path: "/action-address-book",
  exact: true,
  component: lazy(() => import("./Action")),
};

export const route = "/action-address-book";

export default createRoute;
