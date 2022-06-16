import { lazy } from "react";
import { IRouteProps } from "@popup/module";

export const route = "/add-token";

const AddTokenRoute: IRouteProps = {
  path: route,
  component: lazy(() => import("./AddToken")),
};

export default AddTokenRoute;
