import { MasterKeyActionType, MasterKeyActiveType, SetMasterKeyActiveAction } from "./masterkey.types";

const setVersion = (masterKeyActiveType: MasterKeyActiveType): SetMasterKeyActiveAction => ({
  type: MasterKeyActionType.SET,
  payload: {
    masterKeyActiveType,
  },
});

export { setVersion };
