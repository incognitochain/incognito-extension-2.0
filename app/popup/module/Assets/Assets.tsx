import React from "react";
import { MainStyled } from "@module/Assets/Assets.styled";
import { FollowTokens } from "@module/Assets";
import Header from "@components/Header";

const Assets = React.memo(() => {
  return (
    <>
      <Header />
      <FollowTokens />
    </>
  );
});

export default Assets;
