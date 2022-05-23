import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { AppHotReload } from "@popup/app";
import { App as AppTest } from "@popup/pages/app";
import { unregisterServiceWorker } from "./core/service-worker";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const useHotReload = false;

if (useHotReload) {
  // Hot reload support implement UI
  ReactDOM.render(
    <React.StrictMode>
      <AppHotReload />
    </React.StrictMode>,
    document.getElementById("root"),
  );
} else {
  const { store, persistor } = require("@popup/popup.preprocessor");
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppTest />
        </PersistGate>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregisterServiceWorker();
