import React, { useLayoutEffect, useState } from "react";

import Header from "@components/Header";
import Body from "@popup/components/layout/Body";
import KeyChainsTabBar, { TabBarItemType } from "./SelectAccount.KeyChainsTabBar";
import { MasterKeyLabel } from "./SelectAccount.MasterKeyLabel";
import { Container } from "./SelectAccount.styled";

import AccountList from "../AccountList/AccountList";
import Settings from "../Settings/Settings";

import HardwareWalletButton from "../HardwareWallet/HardwareWalletButton";

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
      <Body className="body">
        <KeyChainsTabBar activeTabOnClick={activeTabOnClick} activeTab={activeTabType} />
        <div className="list-accounts body-container">
          {activeTabType === "MasterKey" ? <AccountList /> : <Settings />}
        </div>
        {activeTabType !== "MasterKey" ? undefined : <HardwareWalletButton />}
      </Body>
    </Container>
  );
});

export default SelectAccount;
