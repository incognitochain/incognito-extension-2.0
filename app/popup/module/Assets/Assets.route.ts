import { lazy } from 'react';
import { IRouteProps } from "@popup/module";

export const route = '/';

const assetsRoute: IRouteProps = {
    path: route,
    component: lazy(() => import('./Assets')),
};

export default assetsRoute;
