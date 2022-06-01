import { lazy } from "react";
import { IRouteProps } from "@popup/module";

export const route = "/qrcode";

const QRCodeRoute: IRouteProps = {
  path: route,
  component: lazy(() => import("./QRCode")),
};

export default QRCodeRoute;
