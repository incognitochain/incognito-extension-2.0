import Header from "@components/BaseComponent/Header";
import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";
import { useCallAsync } from "@popup/utils/notifications";
import React from "react";
import { useHistory } from "react-router-dom";
import { BodyLayoutWrapper } from "./Network.styled";
import NetworkItem from "./NetworkItem/NetworkItem";

const NetworkPage: React.FC = () => {
  const history = useHistory();
  const callAsync = useCallAsync();
  const { request } = useBackground();
  const { showLoading } = useLoading();

  return (
    <>
      <Header title="Network" onBackClick={() => history.goBack()} />
      <BodyLayoutWrapper>
        <NetworkItem title="Network 1" description="aaaaaa" />
        <NetworkItem title="Network 2" description="bbbbbb" disabled />
        <NetworkItem title="Network 3" description="cccccc" disabled />
      </BodyLayoutWrapper>
    </>
  );
};
export default NetworkPage;
