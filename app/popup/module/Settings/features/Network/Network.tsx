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
import { route as routeAddNetwork } from "@module/Settings/features/Network/Add";
import { PrimaryButtonContaniner } from "./Network.styled";
import { actionLogout } from "@redux/account";
import { Paths } from "@components/routes/paths";
import { AppThunkDispatch } from "@redux/store";
import { useDispatch } from "react-redux";
import { actionUpdateNetwork } from "@popup/configs";

const NetworkPage: React.FC = () => {
  const history = useHistory();
  const callAsync = useCallAsync();
  const { request } = useBackground();
  const { showLoading } = useLoading();
  const dispatch: AppThunkDispatch = useDispatch();

  const [networkList, setNetworkList] = useState<ServerModel[]>([]);

  const getServerList = async () => {
    let serverList = (await serverService.getServerList()) || [];
    setNetworkList(serverList);
  };

  const handleSetDefaultNetwork = async (network: ServerModel) => {
    showLoading({ value: true });

    await serverService.setDefaultServer(network);
    await changeBaseUrl();
    dispatch(actionLogout());
    callAsync(request("popup_switchNetwork", {}), {
      progress: { message: "Switching..." },
      success: { message: "Switch Network Done" },
      onSuccess: () => {
        setTimeout(() => {
          history.push(Paths.unlockPage);
          callAsync(request("popup_lockWallet", {}), {
            progress: { message: "locking wallet..." },
            success: { message: "Wallet locked" },
            onSuccess: () => {
              dispatch(actionLogout());
              dispatch(actionUpdateNetwork({ network: network.address }));
              showLoading({ value: false });
            },
          });
        }, 200);
        // showLoading({ value: false });
        // history.replace(routeAssets);
      },
    });
  };

  const addNetwork = () => {
    history.push(routeAddNetwork);
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
        <PrimaryButtonContaniner onClick={addNetwork}>{"Add Network"}</PrimaryButtonContaniner>
      </WrapContent>
    </>
  );
};
export default NetworkPage;
