import { getReduxSyncStorage } from "@redux/store/chrome-storage";

let reduxStore: any;

const initRedux = async () => {
  const { reduxSyncStorage } = await getReduxSyncStorage();
  reduxStore = reduxSyncStorage;
};

initRedux();

export {};
