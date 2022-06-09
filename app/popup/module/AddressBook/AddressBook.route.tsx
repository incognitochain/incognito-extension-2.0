import { lazy } from "react";
import { IRouteProps } from "@popup/module";

export const route = "/address-book";

const addressBookRoute: IRouteProps = {
  path: "/address-book",
  component: lazy(() => import("./AddressBook")),
};

export default addressBookRoute;
