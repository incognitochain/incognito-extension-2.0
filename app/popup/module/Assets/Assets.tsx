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

const Assets = React.memo(() => {
  const history = useHistory();
  const navigateImportTokens = () => {
    // history.push(routeImportToken);
  };

  const navigateSetting = () => {
    history.push(routeSettings);
  };

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
        customHeader={<SearchIcon onClick={navigateImportTokens} />}
        selectAccount
      />
      {/* <TotalBalance />
      <AddressBar />
      <FollowTokensList /> */}
    </>
  );
});

// export default compose(withPToken, withBalance)(Assets);

export default Assets;
