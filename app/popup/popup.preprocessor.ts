import { Store } from "redux";
import { Persistor } from "redux-persist";

interface BackgroundEnvProps {
  store: Store;
  persistor: Persistor;
}

const checkSupport = (): BackgroundEnvProps | Error | any => {
  // chrome.runtime.getBackgroundPage((window: any) => {
  //   console.log("getBackgroundPage window ", window);
  // });
};

// const { store, persistor } = checkSupport() as BackgroundEnvProps;
checkSupport();

export default {};
