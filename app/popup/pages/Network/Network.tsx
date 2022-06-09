import Header from "@components/BaseComponent/Header";
import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";
import { useCallAsync } from "@popup/utils/notifications";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BodyLayoutWrapper } from "./Network.styled";
import NetworkItem from "./NetworkItem/NetworkItem";
import serverService, { ServerModel } from "@services/wallet/Server";
import { route as AssetsRoute } from "@module/Assets/Assets.route";
import { changeBaseUrl } from "@services/http";

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
    showLoading({
      value: true,
    });

    await serverService.setDefaultServer(network);
    await changeBaseUrl();

    callAsync(request("popup_switchNetwork", {}), {
      progress: { message: "Switching..." },
      success: { message: "Switch Network Done" },
      onSuccess: (result: any) => {
        showLoading({
          value: false,
        });
        history.replace(AssetsRoute);
      },
    });
  };

  useEffect(() => {
    getServerList();
  }, []);

  return (
    <>
      <Header title="Network" onBackClick={() => history.goBack()} />
      <BodyLayoutWrapper className="scroll-view">
        {networkList.map((network: ServerModel) => (
          <NetworkItem
            key={network.id}
            title={network.name}
            description={network.address}
            disabled={!network.default}
            onClick={() => {
              handleSetDefaultNetwork(network);
            }}
          />
        ))}
      </BodyLayoutWrapper>
    </>
  );
};
export default NetworkPage;
