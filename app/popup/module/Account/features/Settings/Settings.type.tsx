import Body from "@popup/components/layout/Body";
import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";
import { useCallAsync } from "@popup/utils/notifications";
import { useSnackbar } from "notistack";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "./Settings.styled";

const SettingItemList = [
  {
    icon: {},
    name: "Create a new keychain",
  },
  {
    icon: {},
    name: "Reveal recovery phrase",
  },
  {
    icon: {},
    name: "Import a keychain",
  },
  {
    icon: {},
    name: "Back up",
  },
  {
    icon: {},
    name: "Restore",
  },
];

const Settings = React.memo(() => {
  const { enqueueSnackbar } = useSnackbar();
  const { request } = useBackground();
  const callAsync = useCallAsync();
  const history = useHistory();
  const { showLoading } = useLoading();

  const renderSettingItem = useCallback((item: any) => {
    return <p>{item.name}</p>;
  }, []);
  return (
    <Container>
      <Body className="default-padding-horizontal">
        {SettingItemList && SettingItemList.length > 0 && SettingItemList.map((item) => renderSettingItem(item))}
      </Body>
    </Container>
  );
});

export default Settings;
