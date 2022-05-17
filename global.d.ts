import { Persistor } from "redux-persist";
import { Store } from "redux";

declare global {
  namespace NodeJS {
    interface Global {
      isMainnet: any;
      severDefault: any;
      homeConfig: any;
      __DEV__: boolean
    }
  }
  interface Window {
    store: Store;
    persistor: Persistor;
    Go: any;
  }
}

export default {
  global,
};