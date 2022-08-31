import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./reset.css";
import { App } from "@popup/app";
// import { unregisterServiceWorker } from "./core/service-worker";
import { Provider } from "react-redux";
import { getReduxSyncStorage } from "@redux-sync-storage/store/store";
import { SplashScreen } from "@popup/pages/SplashScreen/SplashScreen";

function reloadPopup() {
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}

function initPopup() {
  chrome.tabs.query({ active: true, currentWindow: true }, (_tab) => {
    (async () => {
      const { reduxSyncStorage } = await getReduxSyncStorage();
      // console.log("[POPUP] reduxSyncStorage ", reduxSyncStorage);
      return ReactDOM.render(
        <Provider store={reduxSyncStorage}>
          <App />
        </Provider>,
        document.getElementById("root"),
      );
    })();
    ReactDOM.render(<SplashScreen />, document.getElementById("root"));
  });
}

function init() {
  const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
  if (publicUrl.origin !== window.location.origin) {
    // Our service worker won't work if PUBLIC_URL is on a different origin
    // from what our page is served on. This might happen if a CDN is used to
    // serve assets; see https://github.com/facebook/create-react-app/issues/2374
    return;
  }
  window.addEventListener("load", () => {
    const swUrl = `${publicUrl.origin}/static/js/background.js`;
    fetch(swUrl, {
      headers: { "Service-Worker": "script" },
    })
      .then((response) => {
        if (response.status === 200) {
          navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
            if (!serviceWorkerRegistration.active === null || serviceWorkerRegistration.active?.state !== "activated") {
              reloadPopup();
            } else {
              initPopup();
            }
          });
        } else {
          reloadPopup();
        }
      })
      .catch(() => {
        console.log("No internet connection found. App is running in offline mode.");
        reloadPopup();
      });
  });
}
// (() => {

// })();

ReactDOM.render(<SplashScreen />, document.getElementById("root"));

init();
