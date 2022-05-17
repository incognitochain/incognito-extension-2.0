/* eslint-disable no-undef */
import { Paths } from "@popup/components/routes/paths";
import { useBackground } from "@popup/context/background";
import { useCallAsync } from "@popup/utils/notifications";
import HomeBasePage from "@popup/pages/Home/HomeBasePage";
import React, { ReactElement, useCallback, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const HomeBase: React.FC = () => {
  console.log("HomeBase");

  const history = useHistory();
  const { request } = useBackground();
  const callAsync = useCallAsync();

  const renderContent: ReactElement | any = useCallback(() => {
    return (
      <HomeBasePage
        onBack={() => {
          history.goBack();
        }}
      />
    );
  }, []);

  return renderContent();
};
export default HomeBase;
