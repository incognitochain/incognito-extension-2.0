import { SetVersionAction, VersionActionType } from "./version.types";

const setVersion = (version: string): SetVersionAction => ({
  type: VersionActionType.SET,
  payload: {
    version,
  },
});

export { setVersion };
