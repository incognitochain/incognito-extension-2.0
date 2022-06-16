import NetworkIcon from "@components/Icons/NetworkIcon";
import RightArrowIcon from "@components/Icons/RightArrowIcon";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import serverService, { ServerModel } from "@services/wallet/Server";
import { SettingItem } from "@module/Settings";
import { route as routeNetwork } from "@module/Settings/features/Network";

const Network: React.FC = () => {
  const history = useHistory();
  const [serverDefault, setServerDefault] = useState<ServerModel | null>(null);
  const getServerDefault = async () => {
    const serverDefault = await serverService.getDefault();
    setServerDefault(serverDefault);
  };

  useEffect(() => {
    getServerDefault().then();
  }, []);

  if (!serverDefault) return null;

  return (
    <SettingItem
      onClick={() => history.push(routeNetwork)}
      leftView={<NetworkIcon />}
      title="Network"
      description={serverDefault.name || ""}
      rightView={<RightArrowIcon />}
    />
  );
};
export default Network;
