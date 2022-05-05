import React from "react";
import { RouteProps } from "react-router";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import { PopupState } from "../../../core/types";
import { useBackground } from "../../context/background";
import { AccountDetail } from "../../pages/account-detail";
import { AuthorizedWebsitesPage } from "../../pages/authorized-websites";
import { CreateWalletPage } from "../../pages/create-wallet-page";
import { KnownTokensPage } from "../../pages/known-tokens-page";
import { LoginPage } from "../../pages/login-page";
import { NotificationPage } from "../../pages/notification-page";
import { RestoreWalletPage } from "../../pages/restore-wallet-page";
import { SplashScreenPage } from "../../pages/splash-screen-page";
import { TransactionDetail } from "../../pages/transaction-detail";
import { WalletPage } from "../../pages/wallet-page";
import { Paths } from "./paths";
import { MasterKeyPharsePage } from "@/popup/pages/MasterKey/MasterKeyPage";
import { MasterKeyPharseConfirmPage } from "@/popup/pages/MasterKeyConfirm/MasterKeyPharseConfirm";
import { MasterKeyPharseCreatedPage } from "@/popup/pages/MaterKeyCreated/MasterKeyPharseCreated";
import { GetStartedPage } from "@/popup/pages/GetStarted/GetStartedPage";
import { SignInPage } from "../../pages/ImportPhrase/SignInPage";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import GetStartedRouteStack from "@/popup/pages/CreateNewKey/CreateNewKeyRouteStack";
import CreateNewKeyRouteStack from "@/popup/pages/CreateNewKey/CreateNewKeyRouteStack";
import { PasswordPage } from "@/popup/pages/Password/PasswordPage";

const routes: {
  [path: string]: React.ComponentType<any>;
} = {
  [Paths.authorizedWebsites]: AuthorizedWebsitesPage,
  [Paths.tokens]: KnownTokensPage,
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

const defaultRoute = (
  key: string,
  props: RouteProps,
  popupState: PopupState,
  isNotification: boolean,
) => {
  const rest = Object.assign({}, props);
  delete rest.component;
  return (
    <Route
      key={key}
      {...rest}
      render={(props: RouteComponentProps) => {
        switch (popupState.walletState) {
          case "locked":
            return <Redirect to={{ pathname: Paths.login }} />;
          case "uninitialized": {
            return <Redirect to={{ pathname: Paths.getStatedPage }} />;
          }
          case "unlocked":
            if (popupState.actions.length > 0) {
              return <Redirect to={{ pathname: Paths.notifications }} />;
            } else {
              return <Redirect to={{ pathname: Paths.accounts }} />;
            }
        }
      }}
    />
  );
};

const RoutesBase: React.FC = () => {
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

        {/* <Route exact path={Paths.getStatedPage} component={CreateWalletPage}></Route> */}
        {/* <Route exact path={Paths.getStatedPage} component={MasterKeyPharsePage}></Route> */}
        <Route exact path={Paths.getStatedPage} component={CreateNewKeyRouteStack}></Route>
        <Route exact path={Paths.signInPage} component={SignInPage}></Route>
        {/* <Route exact path={Paths.createNewKeyPage} component={CreateNewKeyBase}></Route> */}
        <Route exact path={Paths.createNewKeyStack} component={CreateNewKeyRouteStack}></Route>
        {defaultRoute(`default-route`, {}, popupState, isNotification)}
      </Switch>
    </>
  );
};

export const Routes = RoutesBase;
