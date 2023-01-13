import { getMasterKeyActiveTypeSelector } from "@redux-sync-storage/masterkey/masterkey.selectors";
import React, { memo } from "react";
import { useSelector } from "react-redux";

import styled, { ITheme } from "styled-components";

export type TabBarItemType = "MasterKey" | "Settings";

const Styled = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  /* background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9}; */

  .underline {
    padding-bottom: 15px;
    border-bottom: 2px solid ${({ theme }: { theme: ITheme }) => theme.colorP3};
  }

  .disableTextColor {
    color: ${({ theme }: { theme: ITheme }) => theme.colorP9};
  }

  .activeTextColor {
    color: ${({ theme }: { theme: ITheme }) => theme.white};
  }

  .spaceView {
    width: 24px;
  }

  .top-view {
    display: flex;
    flex-direction: row;
    .top-left-view {
      height: 40px;
      display: flex;
    }
    .top-right-view {
      height: 40px;
      display: flex;
    }
  }

  .bottom-view {
    margin-left: 24px;
    margin-right: 24px;
    height: 1px;
    background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP11};
  }

  .title {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
    text-align: start;
  }

  .desc {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
    max-lines: 1;
    overflow: hidden;
    text-overflow: clip ellipsis;
    text-align: start;
  }
`;

interface KeyChainsTabBarProps {
  activeTabOnClick: (type: TabBarItemType) => void;
  activeTab: TabBarItemType;
}

const KeyChainsTabBar = memo((props: KeyChainsTabBarProps) => {
  const { activeTab, activeTabOnClick } = props;
  const masterKeyTypeActive = useSelector(getMasterKeyActiveTypeSelector);
  // const { enqueueSnackbar } = useSnackbar();
  // const { request } = useBackground();
  // const callAsync = useCallAsync();
  // const history = useHistory();
  // const { showLoading } = useLoading();
  // const defaultAccountName: string = useSelector(getAccountDefaultNameSelector);
  // const listAccount = useSelector(getAccountListSelector);

  const itemOnClicked = (type: TabBarItemType) => {
    if (type === activeTab) return;
    activeTabOnClick && activeTabOnClick(type);
  };

  let masterKeyClassName;
  let settingClassName;

  if (activeTab === "MasterKey") {
    masterKeyClassName = `fs-regular fw-medium underline activeTextColor`;
    settingClassName = `fs-regular fw-medium disableTextColor`;
  } else {
    masterKeyClassName = `fs-regular fw-medium disableTextColor`;
    settingClassName = `fs-regular fw-medium underline activeTextColor`;
  }

  return (
    <Styled>
      <div className="top-view default-padding-horizontal">
        <div className="top-left-view cursor" onClick={() => itemOnClicked("MasterKey")}>
          {/* <p className={masterKeyClassName}>{masterKeyTypeActive}</p> */}
          <p className={masterKeyClassName}>{"Accounts"}</p>
        </div>
        <div className="spaceView"></div>
        <div className="top-right-view cursor" onClick={() => itemOnClicked("Settings")}>
          <p className={settingClassName}>{`Setting ${masterKeyTypeActive}`}</p>
        </div>
      </div>
      <div className="bottom-view"></div>
    </Styled>
  );
});
export default KeyChainsTabBar;
