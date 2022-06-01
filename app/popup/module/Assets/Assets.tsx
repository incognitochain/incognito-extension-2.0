import React from "react";
import Header from "@components/Header";
import { AddressBar, TotalBalance, FollowTokensList } from "@module/Assets/features";

const Assets = React.memo(() => {
  return (
    <>
      <Header selectAccount lockWallet />
      <TotalBalance />
      <AddressBar />
      <FollowTokensList />
    </>
  );
});

export default Assets;
