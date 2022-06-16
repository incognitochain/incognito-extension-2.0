import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";
import { useCallAsync } from "@popup/utils/notifications";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import serverService, { ServerModel } from "@services/wallet/Server";
import { route as routeAssets } from "@module/Assets";
import { changeBaseUrl } from "@services/http";
import WrapContent from "@components/Content/Content";
import { NetworkItem } from "@module/Settings/features/Network";
import Header from "@components/Header";

const NetworkPage: React.FC = () => {
  const history = useHistory();
  const callAsync = useCallAsync();
  const { request } = useBackground();
  const { showLoading } = useLoading();

  const [networkList, setNetowrkList] = useState<ServerModel[]>([]);

  const getServerList = async () => {
    let serverList = (await serverService.getServerList()) || [];
    setNetowrkList(serverList);
  };

  const handleSetDefaultNetwork = async (network: ServerModel) => {
    showLoading({ value: true });

    await serverService.setDefaultServer(network);
    await changeBaseUrl();

    callAsync(request("popup_switchNetwork", {}), {
      progress: { message: "Switching..." },
      success: { message: "Switch Network Done" },
      onSuccess: () => {
        showLoading({ value: false });
        history.replace(routeAssets);
      },
    });
  };

  useEffect(() => {
    getServerList().then();
  }, []);

  return (
    <>
      <Header title="Network" />
      <WrapContent className="default-padding-horizontal">
        {networkList.map((network: ServerModel) => (
          <NetworkItem
            key={network.id}
            title={network.name}
            description={network.address}
            isSelected={network.default}
            onClick={() => handleSetDefaultNetwork(network)}
          />
        ))}
      </WrapContent>
    </>
  );
};
export default NetworkPage;
