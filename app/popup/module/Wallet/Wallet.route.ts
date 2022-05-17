import { lazy } from 'react';
import { IRouteProps } from "@popup/module";

export const route = '/';

const walletRoute: IRouteProps = {
    path: route,
    component: lazy(() => import('./Wallet')),
};

export default walletRoute;
