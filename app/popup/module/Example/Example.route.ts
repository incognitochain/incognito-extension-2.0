import { lazy } from 'react';
import { IRouteProps } from "@popup/module";

export const route = '/example';

const exampleRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./Example')),
};

export default exampleRoute;
