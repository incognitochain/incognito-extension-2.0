import Header from "@components/Header";
import { route } from "@module/QRCode/QRCode.route";
import BackupItem from "@popup/components/BackupItem/BackupItem";
import BottomView from "@popup/components/BottomView/BottomView";
// import BodyLayout from "@components/layout/BodyLayout";
import WrapContent from "@popup/components/Content";
import { QrCodeIcon } from "@popup/components/Icons";
import CopyIcon from "@popup/components/Icons/CopyIcon";
import SpaceView from "@popup/components/SpaceView/SpaceView";
import { useBackground } from "@popup/context/background";
import { KeyChainDetailItem } from "@popup/module/Account/features/KeychainDetail";
import copy from "copy-to-clipboard";
import { useSnackbar } from "notistack";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, PrimaryButtonContaniner } from "./styles";

const BackupPrivateKeys: React.FC = () => {
  const history = useHistory();
  const { request } = useBackground();
  const { enqueueSnackbar } = useSnackbar();

  const [backupPrivateKey, setBackupPrivateKey] = useState({
    MasterKeyAccounts: [],
    MasterlessAccounts: [],
  });

  const { MasterKeyAccounts, MasterlessAccounts } = backupPrivateKey;

  const backupAllKeyString = useMemo(() => {
    let backupString = "";
    if (MasterKeyAccounts?.length > 0) {
      backupString += "------MASTER KEYS------\n\n";
      backupString +=
        MasterKeyAccounts?.map((account: any) => {
          return `AccountName: ${account.AccountName}\nPrivateKey: ${account.PrivateKey}`;
        })?.join("\n\n") || "";
    }
    if (MasterlessAccounts?.length > 0) {
      backupString += "\n\n------MASTERLESS------\n\n";
      backupString +=
        MasterlessAccounts?.map((account: any) => {
          return `AccountName: ${account.AccountName}\nPrivateKey: ${account.PrivateKey}`;
        })?.join("\n\n") || "";
    }
    return backupString;
  }, [MasterKeyAccounts, MasterlessAccounts]);

  useLayoutEffect(() => {
    const requestKeys = async () => {
      const data: any = await request("popup_requestBackupPrivateKeys", {});
      setBackupPrivateKey(data.result?.backupPrivateKey || { MasterKeyAccounts: [], MasterlessAccounts: [] });
    };
    requestKeys();
  }, []);

  const copyAllKeysOnPress = () => {
    if (backupAllKeyString && backupAllKeyString.length < 1) return;
    copy(backupAllKeyString);
    enqueueSnackbar("Copied", { variant: "success" });
  };

  const renderMasterKeyAccounts = () => {
    if (!MasterKeyAccounts || MasterKeyAccounts.length < 1) return null;
    return (
      <>
        <p className="fs-medium fw-suppermedium margin">{"Master keys"}</p>
        {MasterKeyAccounts.map((account: any) => {
          return <BackupItem key={account.PublicKey} title={account.AccountName} content={account.PrivateKey} />;
        })}
      </>
    );
  };
  const qrCodeIconOnClick = () => {
    history.push(route, {
      title: "Back up private keys",
      label: "",
      value: backupAllKeyString,
    });
  };

  const renderMasterlessAccounts = () => {
    if (!MasterlessAccounts || MasterlessAccounts.length < 1) return null;
    return (
      <>
        <p className="fs-medium fw-suppermedium margin">{"Masterless keys"}</p>
        {MasterlessAccounts.map((account: any) => {
          return <BackupItem key={account.PublicKey} title={account.AccountName} content={account.PrivateKey} />;
        })}
      </>
    );
  };

  return (
    <Container>
      <Header title="Back up private keys" onGoBack={() => history.goBack()} />
      <WrapContent className="no-padding padding-bottom">
        {renderMasterKeyAccounts()}
        {renderMasterlessAccounts()}
      </WrapContent>

      <BottomView>
        <CopyIcon onClick={qrCodeIconOnClick} className="hover-with-cursor"></CopyIcon>
        <SpaceView width={16} />
        <PrimaryButtonContaniner onClick={copyAllKeysOnPress}>{"Copy all keys"}</PrimaryButtonContaniner>
      </BottomView>
    </Container>
  );
};

export default BackupPrivateKeys;
