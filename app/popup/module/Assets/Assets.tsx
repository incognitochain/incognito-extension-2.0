import React from "react";
import Header from "@components/Header";
import FollowTokens from "@module/Assets/features/FollowTokens/FollowTokens";

const Assets = React.memo(() => {
  return (
    <>
      <Header selectAccount />
      <FollowTokens />
    </>
  );
});

export default Assets;
