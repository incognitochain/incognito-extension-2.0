import React from "react";
import Header from "@components/Header";
import WrapContent from "@components/Content/Content";
import { Network } from "./features/Items";

const Settings: React.FC = React.memo(() => {
  return (
    <>
      <Header title="Settings" />
      <WrapContent className="default-padding-horizontal">
        <Network />
      </WrapContent>
    </>
  );
});

export default Settings;
