import React from "react";
import { RouteProps } from 'react-router-dom';

export interface IRouteProps extends RouteProps {
    path: string;
    component: React.FunctionComponent | any;
    exact?: boolean;
}
