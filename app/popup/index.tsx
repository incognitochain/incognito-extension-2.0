import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./reset.css";
import { App } from "@popup/app";
// import { unregisterServiceWorker } from "./core/service-worker";
import { Provider } from "react-redux";
import { getReduxSyncStorage } from "@redux-sync-storage/store/store";

chrome.tabs.query({ active: true, currentWindow: true }, (_tab) => {
  (async () => {
    chrome.runtime.connect();
    const { reduxSyncStorage } = await getReduxSyncStorage();
    console.log("[POPUP] reduxSyncStorage ", reduxSyncStorage);
    return ReactDOM.render(
      <Provider store={reduxSyncStorage}>
        <App />
      </Provider>,
      document.getElementById("root"),
    );
  })();
  return null;
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// unregisterServiceWorker();
