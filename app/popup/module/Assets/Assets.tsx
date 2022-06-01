import React from "react";
import Header from "@components/Header";
import { AddressBar, TotalBalance, FollowTokensList } from "@module/Assets/features";
import { withBalance } from "@module/Assets/Assets.withBalance";

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

export default withBalance(Assets);
