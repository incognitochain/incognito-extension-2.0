import React from "react";
import Header from "@components/Header";
import { AddressBar, TotalBalance, FollowTokensList, LockWallet, Settings } from "@module/Assets/features";
import { SearchIcon } from "@components/Icons";
import { useHistory } from "react-router-dom";
import { route as ImportTokensRoute } from "@module/ImportToken";

const Assets = React.memo(() => {
  const history = useHistory();
  const navigateImportTokens = () => {
    history.push(ImportTokensRoute);
  };
  return (
    <>
      <Header
        showBack={false}
        rightHeader={
          <>
            <Settings />
            <LockWallet />
          </>
        }
        customHeader={<SearchIcon onClick={navigateImportTokens} />}
        selectAccount
      />
      <TotalBalance />
      <AddressBar />
      <FollowTokensList />
    </>
  );
});

export default Assets;
