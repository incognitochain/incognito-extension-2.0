import { ConfigNetworkAction, ConfigNetworkPayload, ConfigsActionType } from "@redux/configs";

const actionUpdateNetwork = (payload: ConfigNetworkPayload): ConfigNetworkAction => ({
  type: ConfigsActionType.UPDATE_NETWORK,
  payload,
});

export { actionUpdateNetwork };
