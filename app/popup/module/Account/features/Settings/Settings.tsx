import { Paths } from "@components/routes/paths";
import {
  BackupIcon,
  CreateNewKeyChainIcon,
  ImportAKeyChainIcon,
  RestoreIcon,
  RevealRecoveryPhraseIcon,
} from "@popup/components/Icons";
import { getMasterKeyActiveTypeSelector } from "@redux-sync-storage/masterkey/masterkey.selectors";
import React, { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SettingItem from "./SettingItem/SettingItem";
import { SettingItemType } from "./SettingItem/SettingItem.type";
import { Container } from "./Settings.styled";

const SettingItemList: SettingItemType[] = [
  {
    key: "Create a new keychain",
    icon: <CreateNewKeyChainIcon />,
    name: "Create a new keychain",
    visible: true,
    onClick: () => {},
    belongTo: ["Masterkey"],
  },
  {
    key: "Reveal recovery phrase",
    icon: <RevealRecoveryPhraseIcon />,
    name: "Reveal recovery phrase",
    visible: true,
    onClick: () => {},
    belongTo: ["Masterkey"],
  },
  {
    key: "Import a keychain",
    icon: <ImportAKeyChainIcon />,
    name: "Import a keychain",
    visible: true,
    onClick: () => {},
    belongTo: ["Masterkey", "Masterless"],
  },
  {
    key: "Back up",
    icon: <BackupIcon />,
    name: "Back up",
    visible: true,
    onClick: () => {},
    belongTo: ["Masterkey", "Masterless"],
  },
  {
    key: "Restore",
    icon: <RestoreIcon />,
    name: "Restore",
    visible: true,
    onClick: () => {},
    belongTo: ["Masterkey", "Masterless"],
  },
];

const Settings = () => {
  const history = useHistory();
  const masterKeyTypeActive = useSelector(getMasterKeyActiveTypeSelector);

  const itemOnClick = (item: SettingItemType) => {
    switch (item.key) {
      case "Create a new keychain":
        history.push(Paths.createAccountPage);
        break;

      case "Reveal recovery phrase":
        history.push(Paths.revealRecoveryPhrase);
        break;

      case "Import a keychain":
        history.push(Paths.importKeyChain);
        break;

      case "Back up":
        history.push(Paths.backupPrivateKeys);
        break;

      case "Restore":
        history.push(Paths.restorePrivateKeys);
        break;
      default:
        break;
    }
  };

  const renderSettingItem = useCallback((item: SettingItemType) => {
    return <SettingItem {...item} onClick={() => itemOnClick(item)} />;
  }, []);

  return (
    <Container>
      {SettingItemList &&
        SettingItemList.length > 0 &&
        SettingItemList.filter((item) => item.visible && item.belongTo.includes(masterKeyTypeActive)).map((item) =>
          renderSettingItem(item),
        )}
    </Container>
  );
};

export default memo(Settings);
