import { lazy } from "react";
import { IRouteProps } from "@popup/module";

export const route = "/token-detail";

const QRCodeRoute: IRouteProps = {
  path: route,
  component: lazy(() => import("./TokenDetail")),
};

export default QRCodeRoute;
