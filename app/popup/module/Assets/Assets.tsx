import React from "react";
import Header from "@components/Header";
import { AddressBar, TotalBalance, FollowTokensList, LockWallet } from "@module/Assets/features";
import { SearchIcon } from "@components/Icons";

const Assets = React.memo(() => {
  return (
    <>
      <Header showBack={false} rightHeader={<LockWallet />} customHeader={<SearchIcon />} selectAccount />
      <TotalBalance />
      <AddressBar />
      <FollowTokensList />
    </>
  );
});

export default Assets;
