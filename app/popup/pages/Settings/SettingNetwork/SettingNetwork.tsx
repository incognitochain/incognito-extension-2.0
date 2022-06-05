import { Paths } from "@popup/components/routes/paths";
import NetworkIcon from "@popup/components/Icons/NetworkIcon";
import RightArrowIcon from "@popup/components/Icons/RightArrowIcon";
import React from "react";
import { useHistory } from "react-router";
import SettingItem from "../SettingItem/SettingItem";

const SettingNetwork: React.FC = () => {
  const history = useHistory();
  return (
    <SettingItem
      onClick={() => {
        history.push(Paths.networkPage);
      }}
      leftView={<NetworkIcon />}
      title="Network"
      description="Testnet"
      rightView={<RightArrowIcon />}
    />
  );
};
export default SettingNetwork;
