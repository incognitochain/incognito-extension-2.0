import { lazy } from "react";
import { IRouteProps } from "@popup/module";

export const route = "/send";

const sendRoute: IRouteProps = {
  path: "/send",
  component: lazy(() => import("./Send")),
};

export default sendRoute;
