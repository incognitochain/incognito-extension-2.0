import React from "react";
import { RouteProps } from 'react-router-dom';

export interface IRouteProps extends RouteProps {
    id?: string | number;
    name: string;
    to: string;
    path: string;
    component: React.FunctionComponent | any;
}
