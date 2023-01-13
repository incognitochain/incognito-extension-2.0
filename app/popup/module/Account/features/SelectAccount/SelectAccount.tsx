import React, { useState, useLayoutEffect } from "react";

import Header from "@components/Header";
import Body from "@popup/components/layout/Body";
// import { MenuOption } from "@popup/components/MenuOption/index";
import KeyChainsTabBar, { TabBarItemType } from "./SelectAccount.KeyChainsTabBar";
import { MasterKeyLabel } from "./SelectAccount.MasterKeyLabel";
import { Container } from "./SelectAccount.styled";
import WrapContent from "@components/Content";
import { getAccountListSelector, getAccountDefaultNameSelector } from "@redux-sync-storage/account/account.selectors";
import { HARDWARE_DEVICE_EMULATOR } from "@constants/config";
import AccountList from "../AccountList/AccountList";
import Settings from "../Settings/Settings";
import { useLoading } from "@popup/context/loading";
import { useCallAsync } from "@popup/utils/notifications";
import { useBackground } from "@popup/context/background";

let cacheActiveTab: TabBarItemType;

const SelectAccount = React.memo(() => {
  const [activeTabType, setActiveTabType] = useState<TabBarItemType>("MasterKey");
  const { showLoading } = useLoading();
  const callAsync = useCallAsync();
  const { request } = useBackground();

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
