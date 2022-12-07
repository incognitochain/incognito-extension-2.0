import React, { useState, useLayoutEffect } from "react";

import Header from "@components/Header";
import Body from "@popup/components/layout/Body";
// import { MenuOption } from "@popup/components/MenuOption/index";
import KeyChainsTabBar, { TabBarItemType } from "./SelectAccount.KeyChainsTabBar";
import { MasterKeyLabel } from "./SelectAccount.MasterKeyLabel";
import { Container } from "./SelectAccount.styled";

import AccountList from "../AccountList/AccountList";
import Settings from "../Settings/Settings";

let cacheActiveTab: TabBarItemType;

const SelectAccount = React.memo(() => {
  const [activeTabType, setActiveTabType] = useState<TabBarItemType>("MasterKey");

  const activeTabOnClick = (type: TabBarItemType) => {
    setActiveTabType(type);
    cacheActiveTab = type;
  };

  useLayoutEffect(() => {
    if (cacheActiveTab) {
      setActiveTabType(cacheActiveTab);
    }
  }, []);
  return (
    <Container>
      <Header title="Keychains" rightHeader={<MasterKeyLabel />} />
      <Body>
        <KeyChainsTabBar activeTabOnClick={activeTabOnClick} activeTab={activeTabType} />
        <div className="scroll-view body-container">
          {activeTabType === "MasterKey" ? <AccountList /> : <Settings />}
        </div>
      </Body>
    </Container>
  );
});

export default SelectAccount;
