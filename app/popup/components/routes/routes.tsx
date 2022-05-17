import CreateNewKeyRouteStack from "@popup/pages/CreateNewKey/CreateNewKeyRouteStack";
import { GetStartedPage } from "@popup/pages/GetStarted/GetStartedPage";
import HomeRouteStack from "@popup/pages/Home/HomeRouteStack";
import ImportMasterKeyRouteStack from "@popup/pages/Import/ImportMasterKeyRouteStack";
import { UnlockPage } from "@popup/pages/Unlock/UnlockPage";
import React from "react";
import { RouteProps } from "react-router";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import { PopupState } from "../../../core/types";
import { useBackground } from "../../context/background";
import { AccountDetail } from "../../pages/account-detail";
import { AuthorizedWebsitesPage } from "../../pages/authorized-websites";
import { LoginPage } from "../../pages/login-page";
import { NotificationPage } from "../../pages/notification-page";
import { RestoreWalletPage } from "../../pages/restore-wallet-page";
import { SignInPage } from "../../pages/SignInPage/SignInPage";
import { TransactionDetail } from "../../pages/transaction-detail";
import { WalletPage } from "../../pages/wallet-page";
import { Paths } from "./paths";

const routes: {
  [path: string]: React.ComponentType<any>;
} = {
  [Paths.authorizedWebsites]: AuthorizedWebsitesPage,
  [Paths.accounts]: WalletPage,
  [Paths.notifications]: NotificationPage,
  [Paths.accountDetail]: AccountDetail,
  [Paths.transactionDetail]: TransactionDetail,
};

const secureRoute = (key: string, props: RouteProps, popupState: PopupState) => {
  const Component = props.component as React.ComponentType<any>;
  const rest = Object.assign({}, props);
  delete rest.component;
  return (
    <Route
      key={key}
      {...rest}
      render={(props: RouteComponentProps): React.ReactNode => {
        console.log("secureRoute ", popupState.walletState);
        // If the user is not authenticated, redirect to signup
        if (popupState.walletState !== "unlocked") {
          const redirectTo = popupState.walletState === "locked" ? Paths.login : Paths.welcome;
          return (
            <Redirect
              to={{
                pathname: redirectTo,
                state: { from: props.location },
              }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

const unsecureRoute = (key: string, props: RouteProps, popupState: PopupState) => {
  const Component = props.component as React.ComponentType<any>;
  const rest = Object.assign({}, props);
  delete rest.component;
  return (
    <Route
      key={key}
      {...rest}
      render={(props: RouteComponentProps) => {
        console.log("unsecureRoute ", popupState.walletState);
        if (popupState?.walletState === "unlocked") {
          return (
            <Redirect
              to={{
                pathname: Paths.accounts,
                state: { from: props.location },
              }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

const defaultRoute = (key: string, props: RouteProps, popupState: PopupState, isNotification: boolean) => {
  const rest = Object.assign({}, props);
  delete rest.component;
  return (
    <Route
      key={key}
      {...rest}
      render={(props: RouteComponentProps) => {
        console.log("defaultRoute ", popupState.walletState);
        switch (popupState.walletState) {
          case "locked":
            return <Redirect to={{ pathname: Paths.unlockPage }} />;
          case "uninitialized": {
            return <Redirect to={{ pathname: Paths.getStatedPage }} />;
          }
          case "unlocked": {
            // } //   return <Redirect to={{ pathname: Paths.accounts }} />; // } else { //   return <Redirect to={{ pathname: Paths.notifications }} />; // if (popupState.actions.length > 0) {
            return <Redirect to={{ pathname: Paths.homeRouteStack }} />;
          }
        }
      }}
    />
  );
};

const RoutesBase: React.FC = () => {
  console.log("RoutesBase render ...");
  const { popupState, isNotification } = useBackground();
  if (!popupState) {
    // return <SplashScreenPage />;
    return null;
  }
  return (
    <>
      <Switch>
        {Object.keys(routes).map((path) => {
          return secureRoute(
            `authenticated-route${path.replace("/", "-")}`,
            {
              exact: true,
              path: path,
              component: routes[path],
            },
            popupState,
          );
        })}
        {/* unsecure-only routes */}
        {unsecureRoute(
          `restore-route`,
          {
            exact: true,
            path: Paths.restore,
            component: RestoreWalletPage,
          },
          popupState,
        )}
        {unsecureRoute(
          `login-route`,
          {
            exact: true,
            path: Paths.login,
            component: LoginPage,
          },
          popupState,
        )}
        {/* {unsecureRoute(
          `welcome-route`,
          {
            exact: true,
            path: Paths.getStatedPage,
            // component: MasterKeyPharsePage,
            // component: CreateWalletPage,
            // component: KnownTokensPage,
            // component: CreateNewKeyPage,
            component: CreateWalletPage,
          },
          popupState,
        )} */}

        <Route path={Paths.getStatedPage} component={GetStartedPage}></Route>
        <Route path={Paths.signInPage} component={SignInPage}></Route>
        <Route path={Paths.unlockPage} component={UnlockPage}></Route>
        <Route path={Paths.createNewKeyStack} component={CreateNewKeyRouteStack}></Route>
        <Route path={Paths.importMasterKeyStack} component={ImportMasterKeyRouteStack}></Route>
        <Route path={Paths.homeRouteStack} component={HomeRouteStack}></Route>
        {defaultRoute(`default-route`, {}, popupState, isNotification)}
      </Switch>
    </>
  );
};

export const Routes = RoutesBase;
