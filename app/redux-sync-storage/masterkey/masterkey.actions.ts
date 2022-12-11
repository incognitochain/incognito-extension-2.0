import { MasterKeyActionType, MasterKeyActiveType, SetMasterKeyActiveAction } from "./masterkey.types";

const setMasterKeyActive = (masterKeyActiveType: MasterKeyActiveType): SetMasterKeyActiveAction => ({
  type: MasterKeyActionType.SET,
  payload: {
    masterKeyActiveType,
  },
});

export { setMasterKeyActive };
