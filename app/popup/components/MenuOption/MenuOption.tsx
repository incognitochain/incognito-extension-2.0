import { KeypadIcon } from "@popup/components/Icons";
import { getMasterKeyActiveTypeSelector } from "@redux-sync-storage/masterkey/masterkey.selectors";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled, { ITheme } from "styled-components";
import { useHistory } from "react-router-dom";
import { Paths } from "@components/routes/paths";
import useClickOutsideWithRef from "@popup/hooks/useClickOutsideWithRef";

interface IProps {}

type MenuItemKeyType = "Create Keychain" | "Reveal ASD recovery phrase" | "Import a keychain" | "Back up" | "Restore";
type MenuItemType = {
  key: MenuItemKeyType;
  name: string;
  icon: any;
  onClick?: () => any;
};

const Styled = styled.div`
  .menu-container {
    padding-top: 10px;
    padding-bottom: 10px;
    position: absolute;
    top: 45px;
    right: 35px;
    min-width: 120px;
    background: ${({ theme }: { theme: ITheme }) => theme.white};
    border-radius: 8px;
    box-shadow: 1px 2px 3px 0 rgba(21, 21, 21, 0.6);
    transition: all 0.3s cubic-bezier(0.35, 0, 0.25, 1);
    transform-origin: top right;
    z-index: 999999;
  }

  .menu-open {
    visibility: visible;
    transform: scale(1);
    opacity: 1;
  }

  .menu-close {
    visibility: hidden;
    transform: scale(0);
    opacity: 0;
  }

  .menu-item {
    color: ${({ theme }: { theme: ITheme }) => theme.black};
    :hover {
      background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP4};
      cursor: pointer;
    }
  }

  .content-item {
    padding-left: 15px;
    padding-right: 15px;
  }

  .break-line {
    height: 1px;
    margin-top: 10px;
    background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP3};
  }

  .switch-master-key {
    font-weight: 800;
    font-size: 30;
    color: ${({ theme }: { theme: ITheme }) => theme.colorP1};
  }
`;

const CreateKeyChainItem: MenuItemType = {
  key: "Create Keychain",
  name: "Create Keychain",
  icon: undefined,
};

const RecoveryPhraseItem: MenuItemType = {
  key: "Reveal ASD recovery phrase",
  name: "Recovery phrase",
  icon: undefined,
};

const ImportKeyChainItem: MenuItemType = {
  key: "Import a keychain",
  name: "Import a keychain",
  icon: undefined,
};

const BackupItem: MenuItemType = {
  key: "Back up",
  name: "Back up",
  icon: undefined,
};

const RestoreItem: MenuItemType = {
  key: "Restore",
  name: "Restore",
  icon: undefined,
};

const MenuOption = (props: IProps) => {
  const [showMenuItems, setShowMenuItems] = useState(false);
  const masterKeyTypeActive = useSelector(getMasterKeyActiveTypeSelector);
  const history = useHistory();

  const menuItemRef = useRef(null);

  useClickOutsideWithRef(menuItemRef, () => {
    setShowMenuItems(false);
  });

  const MenuItemOnClicked = (item: MenuItemType) => {
    console.log("ITEM CLICKED: ", item);
    switch (item.key) {
      case "Create Keychain":
        history.push(Paths.createAccountPage);
        break;
      case "Reveal ASD recovery phrase":
        console.log("Reveal ASD recovery phrase, TO DO");
        history.push(Paths.revealRecoveryPhrase);
        break;
      case "Import a keychain":
        console.log("Import a keychain, TO DO");
        history.push(Paths.importKeyChain);
        break;
      case "Back up":
        console.log("Backup , TO DO");
        history.push(Paths.backupPrivateKeys);
        break;
      case "Restore":
        console.log("Restore , TO DO");
        history.push(Paths.restorePrivateKeys);
        break;
    }
  };

  const MenuItemsList = useMemo(() => {
    // const SwitchMasterKeyItem = {
    //   key: "Switch MasterKey",
    //   name: `Swtich to ${masterKeyTypeActive === "Masterkey" ? "Masterless" : "Masterkey"}`,
    //   icon: undefined,
    // };
    if (masterKeyTypeActive === "Masterkey") {
      return [CreateKeyChainItem, RecoveryPhraseItem, ImportKeyChainItem, BackupItem, RestoreItem];
    } else {
      return [ImportKeyChainItem, BackupItem, RestoreItem];
    }
  }, [masterKeyTypeActive]);

  const showMenuOnPress = () => {
    setShowMenuItems(!showMenuItems);
  };

  const renderMenuItems = () => {
    const status = showMenuItems ? "open" : "close";

    return (
      <div ref={menuItemRef} className={`menu-container menu-${status}`}>
        {MenuItemsList.map((item: any, index: number) => {
          let className = "fs-small content-item fw-medium";
          const breakLine = index === MenuItemsList.length - 1 ? undefined : <div className="break-line"></div>;
          return (
            <div key={item.key} className="menu-item" onClick={() => MenuItemOnClicked(item)}>
              <p className={className}>{item.name}</p>
              {breakLine}
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    // document.addEventListener("mousedown", handleClickOutside);
    // return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <Styled className="">
      <KeypadIcon onClick={showMenuOnPress} />
      {renderMenuItems()}
    </Styled>
  );
};

export default MenuOption;
