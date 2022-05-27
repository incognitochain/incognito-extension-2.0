import CreateNewKeyRouteStack from "@/popup/pages/CreateNewKey/CreateNewKeyRouteStack";
import { GetStartedPage } from "@popup/pages/GetStarted/GetStartedPage";
import HomeRouteStack from "@popup/pages/Home/HomeRouteStack";
import ImportMasterKeyRouteStack from "@popup/pages/Import/ImportMasterKeyRouteStack";
// import NotFoundPage from "@popup/pages/NotFound/NotFoundPage";
import React from "react";
import { RouteProps } from "react-router";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import { PopupState } from "../../../core/types";
import { useBackground } from "../../context/background";
import { Paths } from "./paths";
import { UnlockPage } from "../../pages/Unlock/UnlockPage";
import CreateAccountPage from "@popup/pages/CreateAccount/CreateAccountPage";

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
            return <Redirect to={{ pathname: Paths.homeRouteStack }} />;
        }
      }}
    />
  );
};

const RoutesBase: React.FC = () => {
  const { popupState, isNotification } = useBackground();
  if (!popupState) {
    return null;
  }
  return (
    <Switch>
      <Route exact path={Paths.getStatedPage} component={GetStartedPage} />
      <Route exact path={Paths.unlockPage} component={UnlockPage} />
      <Route exact path={Paths.homeRouteStack} component={HomeRouteStack} />
      <Route exact path={Paths.createNewKeyStack} component={CreateNewKeyRouteStack} />
      <Route exact path={Paths.importMasterKeyStack} component={ImportMasterKeyRouteStack} />
      <Route exact path={Paths.createAccountPage} component={CreateAccountPage} />
      {defaultRoute(`default-route`, {}, popupState, isNotification)}
    </Switch>
  );
};

export const Routes = RoutesBase;
