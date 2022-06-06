import Header from "@components/BaseComponent/Header";
import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";
import { useCallAsync } from "@popup/utils/notifications";
import React from "react";
import { useHistory } from "react-router-dom";
import SettingNetwork from "./SettingNetwork/SettingNetwork";
import { BodyLayoutWrapper } from "./Settings.styled";
const SettingsPage: React.FC = () => {
  const history = useHistory();
  const callAsync = useCallAsync();
  const { request } = useBackground();
  const { showLoading } = useLoading();

  return (
    <>
      <Header title="Settings" onBackClick={() => history.goBack()} />
      <BodyLayoutWrapper>
        <SettingNetwork></SettingNetwork>
      </BodyLayoutWrapper>
    </>
  );
};
export default SettingsPage;
