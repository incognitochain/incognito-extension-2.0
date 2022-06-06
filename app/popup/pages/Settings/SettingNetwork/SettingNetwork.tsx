import { Paths } from "@popup/components/routes/paths";
import NetworkIcon from "@popup/components/Icons/NetworkIcon";
import RightArrowIcon from "@popup/components/Icons/RightArrowIcon";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import SettingItem from "../SettingItem/SettingItem";
import serverService, { ServerModel } from "@services/wallet/Server";
const SettingNetwork: React.FC = () => {
  const history = useHistory();

  const [serverDefault, setServerDefault] = useState<ServerModel | null>(null);

  useEffect(() => {
    const getServerDefault = async () => {
      const serverDefault = await serverService.getDefault();
      setServerDefault(serverDefault);
    };
    getServerDefault();
  }, []);

  if (!serverDefault) return null;
  return (
    <SettingItem
      onClick={() => {
        history.push(Paths.networkPage);
      }}
      leftView={<NetworkIcon />}
      title="Network"
      description={serverDefault.name || ""}
      rightView={<RightArrowIcon />}
    />
  );
};
export default SettingNetwork;
