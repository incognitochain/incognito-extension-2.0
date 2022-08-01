import { Store } from "redux";
import { Persistor } from "redux-persist";

interface BackgroundEnvProps {
  store: Store;
  persistor: Persistor;
}

const checkSupport = (): BackgroundEnvProps | Error => {
  const backgroundEnv = chrome.extension.getBackgroundPage();
  if (!backgroundEnv) return new Error("Background was not ready or Unknow");
  const { store, persistor, Go } = backgroundEnv;
  if (!store) return new Error("Store Redux was not ready or Unknow");
  if (!persistor) return new Error("Persistor was not ready or Unknow");
  if (Go) window.Go = Go;

  return { store, persistor };
};

const { store, persistor } = checkSupport() as BackgroundEnvProps;

export { store, persistor };

export default {};
