import { ChangeNetworkAction, NetworkActionType } from "./network.types";
import { ServerModel } from "@services/wallet/Server";

const changeNetwork = (network: ServerModel): ChangeNetworkAction => ({
  type: NetworkActionType.CHANGE,
  payload: {
    currentNetwork: network,
  },
});

export { changeNetwork };
