import CreateNewKeyRouteStack from "@popup/pages/CreateNewKey/CreateNewKeyRouteStack";
import { PopupState } from "@core/types";
import { Paths } from "@popup/components/routes/paths";
import { useBackground } from "@popup/context/background";
import CreateAccountPage from "@popup/pages/CreateAccount/CreateAccountPage";
import { GetStartedPage } from "@popup/pages/GetStarted/GetStartedPage";
import HomeRouteStack from "@popup/pages/Home/HomeRouteStack";
import ImportMasterKeyRouteStack from "@popup/pages/Import/ImportMasterKeyRouteStack";
import RestoreWalletPage from "@popup/pages/RestoreWallet/RestoreWalletPage";
import { UnlockPage } from "@popup/pages/Unlock/UnlockPage";
import React, { Suspense } from "react";
import { RouteProps } from "react-router";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import styled from "styled-components";
import { IRouteProps } from "..";
import { route as AssetsRoute } from "@module/Assets/Assets.route";
import { route as SignTransactionRoute } from "@module/SignTransaction/SignTransaction.route";
import { useModal } from "@module/Modal";
import { useSelector, useStore } from "react-redux";
import { isFirstTimeScanCoinsSelector, isShowConfirmScanCoins } from "@redux-sync-storage/scanCoins";
import BoxScanCoin from "@components/BoxScanCoin";
import { Loading } from "@popup/context/loading";
import throttle from "lodash/throttle";
import { route as SendRoute } from "@module/Send/Send.route";
import debounce from "lodash/debounce";

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
          case "unlocked": {
            const actionObj = popupState.actions && popupState.actions[0];
            if (isNotification) {
              if (actionObj && actionObj.action && actionObj.action.type === "sign_transaction") {
                return <Redirect to={{ pathname: SendRoute }} />;
              }
            }
            return <Redirect to={{ pathname: AssetsRoute }} />;
          }
        }
      }}
    />
  );
};

const MainRoute = () => {
  const { popupState, isNotification } = useBackground();
  const [routes, setRoutes] = React.useState<Array<IRouteProps>>([]);

  const { setModal } = useModal();

  const isScanCoins = useSelector(isFirstTimeScanCoinsSelector)(popupState);
  const showConfirmScanCoins = useSelector(isShowConfirmScanCoins)(popupState);

  const handleGetRoutes = () => {
    const allRoutes: IRouteProps[] = [];
    context.keys().map((path: string) => allRoutes.push(context(`${path}`).default));
    setRoutes([...allRoutes]);
  };

  const throttleShowModal = debounce(
    () =>
      setModal({
        data: <BoxScanCoin />,
        title: "",
        isTransparent: true,
        closable: false,
      }),
    500,
  );

  React.useEffect(() => {
    handleGetRoutes();
  }, []);

  React.useEffect(() => {
    if (showConfirmScanCoins) {
      throttleShowModal();
    }
  }, [showConfirmScanCoins]);

  if (!popupState) {
    return null;
  }

  return (
    <>
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
            {defaultRoute(`default-route`, {}, popupState, isNotification)}
          </Switch>
        </Suspense>
      </Styled>
      {isScanCoins && <Loading message="Scanning coins, please don't close the browser and wait a few minutes." />}
    </>
  );
};

export default MainRoute;
