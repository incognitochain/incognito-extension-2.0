import React from "react";
import Header from "@components/Header";
import { AddressBar, TotalBalance, FollowTokensList, LockWallet } from "@module/Assets/features";
import { SearchIcon, SettingIcon } from "@components/Icons";
import { useHistory } from "react-router-dom";
import { route as routeImportToken } from "@module/AddToken";
import { route as routeSettings } from "@module/Settings/Settings.route";
import { compose } from "recompose";
import withPToken from "@module/MainRoute/MainRoute.withPToken";
import withBalance from "@module/MainRoute/MainRoute.withBalance";
import Storage from "@services/storage";
import rpcMetric, { METRIC_TYPE } from "@services/wallet/rpcMetric";
import { AddButton } from "@components/AddButton/AddButton";
import { useBackground } from "@popup/context/background";

let isUpdated = false;
const Assets = React.memo(() => {
  const history = useHistory();
  const { request } = useBackground();
  const navigateImportTokens = () => {
    // history.push(routeImportToken);
  };

  const navigateSetting = () => {
    history.push(routeSettings);
  };

  const updateMetric = async () => {
    isUpdated = true;
    rpcMetric.updateMetric({ type: METRIC_TYPE.OPEN }).then();
    try {
      const KEY = "FIRST_TIME_INSTALL";
      const isInstalled = await Storage.getItem(KEY);
      if (!isInstalled) {
        rpcMetric.updateMetric({ type: METRIC_TYPE.INSTALL }).then(() => Storage.setItem(KEY, "success"));
      }
    } catch (e) {
      console.log("METRIC INSTALL ERROR: ", e);
    }
  };

  React.useEffect(() => {
    if (isUpdated) return;
    updateMetric().then();
  }, [isUpdated]);

  const getTokensList = async () => {
    request("popup_getPTokenList", {});
  };

  React.useEffect(() => {
    getTokensList();
  }, []);

  return (
    <>
      <Header
        showBack={false}
        rightHeader={
          <>
            <SettingIcon onClick={navigateSetting} />
            <LockWallet />
          </>
        }
        customHeader={<AddButton onClick={navigateImportTokens} />}
        selectAccount
      />
      <TotalBalance />
      <AddressBar />
      <FollowTokensList />
    </>
  );
});

export default compose(withPToken, withBalance)(Assets);

// export default Assets;
