import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { IRouteProps } from '..';

const context = require.context('@popup/module', true, /\.route.tsx?/);

const MainRoute = () => {
    const [routes, setRoutes] = React.useState<Array<IRouteProps>>([]);
    const handleGetRoutes = () => {
        const allRoutes: IRouteProps[] = [];
        context.keys().map((path: string) => allRoutes.push(context(`${path}`).default));
        setRoutes([...allRoutes]);
    };
    React.useEffect(() => {
        handleGetRoutes();
    }, []);


    console.log('routes:::: ', routes)

    return (
        <Switch>
            <Suspense fallback="loading">
                {routes.map((route: IRouteProps) => (
                    <Route {...route} key={route.path} />
                ))}
            </Suspense>
        </Switch>
    );
};

export default React.memo(MainRoute);
