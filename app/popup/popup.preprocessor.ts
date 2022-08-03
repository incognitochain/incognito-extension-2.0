import { Store } from "redux";
import { Persistor } from "redux-persist";

interface BackgroundEnvProps {
  store: Store;
  persistor: Persistor;
}

const checkSupport = (): BackgroundEnvProps | Error | any => {
  const backgroundEnv = chrome.runtime.getBackgroundPage((window: any) => {
    console.log("333 window ", window);
  });

  console.log("2222 backgroundEnv ", backgroundEnv);
};

// const { store, persistor } = checkSupport() as BackgroundEnvProps;
checkSupport();

// export { store, persistor };

export default {};
