import { lazy } from "react";
import { IRouteProps } from "@popup/module";

const addressBookRoute: IRouteProps = {
  path: "/address-book",
  exact: true,
  component: lazy(() => import("./AddressBook")),
};

export const route = "/address-book";

export default addressBookRoute;
