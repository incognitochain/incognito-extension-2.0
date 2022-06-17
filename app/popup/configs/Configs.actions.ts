import { ConfigNetworkAction, ConfigNetworkPayload, ConfigsActionType } from "@popup/configs";

const actionUpdateNetwork = (payload: ConfigNetworkPayload): ConfigNetworkAction => ({
  type: ConfigsActionType.UPDATE_NETWORK,
  payload,
});

export { actionUpdateNetwork };
