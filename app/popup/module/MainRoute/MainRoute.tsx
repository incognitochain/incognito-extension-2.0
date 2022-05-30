import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { IRouteProps } from "..";
import styled from "styled-components";

const context = require.context("@popup/module", true, /\.route.tsx?/);

const Styled = styled.div`
  position: fixed;
  width: 100vw;
`;

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

  console.log(routes);
  return (
    <Styled>
      <Suspense fallback="loading">
        <Switch>
          {routes.map((route) => (
            <Route {...route} key={route.path} />
          ))}
        </Switch>
      </Suspense>
    </Styled>
  );
};

export default React.memo(MainRoute);
