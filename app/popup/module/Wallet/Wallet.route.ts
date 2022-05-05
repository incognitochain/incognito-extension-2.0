import { lazy } from 'react';
import { IRouteProps } from "@popup/module";

export const route = '/';

const walletRoute: IRouteProps = {
    path: route,
    exact: true,
    component: lazy(() => import('./Wallet')),
    name: 'Wallet',
    to: route,
};

export default walletRoute;
