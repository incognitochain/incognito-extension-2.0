import { AccountActionType } from "./account.types";

const setAccountDefauntName = (name: string) => ({
  type: AccountActionType.SET,
  payload: {
    name,
  },
});

export { setAccountDefauntName };
