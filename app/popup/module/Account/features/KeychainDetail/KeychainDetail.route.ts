import { lazy } from "react";
import { IRouteProps } from "@popup/module";

export const route = "/keychain-detail";

const routeKeychainDetailList: IRouteProps = {
  path: route,
  component: lazy(() => import("./KeychainDetail.list")),
};

export default routeKeychainDetailList;
