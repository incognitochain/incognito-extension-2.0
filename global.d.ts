import { Persistor } from "redux-persist";
import { Store } from "redux";

declare global {
  namespace NodeJS {
    interface Global {
      isMainnet: any;
      severDefault: any;
      homeConfig: any;
      network: any;
      __DEV__: boolean
    }
  }
  interface Window {
    store: Store;
    persistor: Persistor;
    Go: any;
    network: any;
  }
}

export default {
  global,
};