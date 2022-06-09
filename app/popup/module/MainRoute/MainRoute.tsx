import CreateNewKeyRouteStack from "@/popup/pages/CreateNewKey/CreateNewKeyRouteStack";
import { PopupState } from "@core/types";
import enhance from "@module/MainRoute/MainRoute.enhance";
import { Paths } from "@popup/components/routes/paths";
import { useBackground } from "@popup/context/background";
import CreateAccountPage from "@popup/pages/CreateAccount/CreateAccountPage";
import { GetStartedPage } from "@popup/pages/GetStarted/GetStartedPage";
import HomeRouteStack from "@popup/pages/Home/HomeRouteStack";
import ImportMasterKeyRouteStack from "@popup/pages/Import/ImportMasterKeyRouteStack";
import RestoreWalletPage from "@popup/pages/RestoreWallet/RestoreWalletPage";
import SettingsPage from "@popup/pages/Settings/Settings";
import NetworkPage from "@popup/pages/Network/Network";
import { UnlockPage } from "@popup/pages/Unlock/UnlockPage";
import React, { Suspense } from "react";
// import NotFoundPage from "@popup/pages/NotFound/NotFoundPage";
import { RouteProps } from "react-router";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import styled from "styled-components";
import { IRouteProps } from "..";
import { route as AssetsRoute } from "@module/Assets/Assets.route";

const context = require.context("@popup/module", true, /\.route.tsx?/);

const Styled = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
`;

const defaultRoute = (key: string, props: RouteProps, popupState: PopupState, isNotification: boolean) => {
  const rest = Object.assign({}, props);
  delete rest.component;
  return (
    <Route
      key={key}
      {...rest}
      render={(props: RouteComponentProps) => {
        switch (popupState.walletState) {
          case "locked":
            return <Redirect to={{ pathname: Paths.unlockPage }} />;
          case "uninitialized":
            return <Redirect to={{ pathname: Paths.getStatedPage }} />;
          case "unlocked":
            return <Redirect to={{ pathname: AssetsRoute }} />;
        }
      }}
    />
  );
};
const MainRoute = () => {
  const { popupState, isNotification } = useBackground();
  const [routes, setRoutes] = React.useState<Array<IRouteProps>>([]);
  const handleGetRoutes = () => {
    const allRoutes: IRouteProps[] = [];
    context.keys().map((path: string) => allRoutes.push(context(`${path}`).default));
    setRoutes([...allRoutes]);
  };

  React.useEffect(() => {
    handleGetRoutes();
  }, []);

  if (!popupState) {
    return null;
  }
  return (
    <Styled className="full-screen">
      <Suspense fallback="loading">
        <Switch>
          {routes.map((route) => (
            <Route {...route} key={route.path} />
          ))}
          <Route exact path={Paths.homeRouteStack} component={HomeRouteStack} />
          <Route exact path={Paths.createNewKeyStack} component={CreateNewKeyRouteStack} />
          <Route exact path={Paths.importMasterKeyStack} component={ImportMasterKeyRouteStack} />
          <Route exact path={Paths.createAccountPage} component={CreateAccountPage} />
          <Route exact path={Paths.restoreWalletPage} component={RestoreWalletPage} />
          <Route exact path={Paths.getStatedPage} component={GetStartedPage} />
          <Route exact path={Paths.unlockPage} component={UnlockPage} />
          <Route exact path={Paths.settingsPage} component={SettingsPage} />
          <Route exact path={Paths.networkPage} component={NetworkPage} />
          {defaultRoute(`default-route`, {}, popupState, isNotification)}
        </Switch>
      </Suspense>
    </Styled>
  );
};

export default enhance(React.memo(MainRoute));
