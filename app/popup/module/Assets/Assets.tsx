import React from "react";
import Header from "@components/Header";
import { AddressBar, TotalBalance, FollowTokens } from "@module/Assets/features";

const Assets = React.memo(() => {
  return (
    <>
      <Header selectAccount />
      <TotalBalance />
      <AddressBar />
      <FollowTokens />
    </>
  );
});

export default Assets;
