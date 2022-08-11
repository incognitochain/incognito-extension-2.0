import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./reset.css";
import { AppHotReload, App } from "@popup/app";
import { App1 } from "@popup/app";
import { App as AppTest } from "@popup/pages/app";
// import { unregisterServiceWorker } from "./core/service-worker";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createStore } from "redux";
import rootReducers, { superRootReducer } from "@redux/reducers/index";
import { render } from "react-dom";
import { persistor } from "@/redux/store/store";
import getReduxStore from "@redux/store/chrome-storage";
import { persistReducer, persistStore } from "redux-persist";
import { FULL_NODE, TESTNET_TOKENS } from "@background/MainRoute.constants";
// const useHotReload = false;
// const { store, persistor } = require("@popup/popup.preprocessor");

chrome.tabs.query({ active: true, currentWindow: true }, (_tab) => {
  (async () => {
    console.log("POPUP ==> OPEN");
    chrome.runtime.connect();
    const { store } = await getReduxStore();
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root"),
    );
  })();
});

// ReactDOM.render(
//   <React.StrictMode>
//     <div style={{ width: 300, height: 300, backgroundColor: "lightgrey" }}></div>
//   </React.StrictMode>,
//   document.getElementById("root"),
// );

// if (useHotReload) {
//   // Hot reload support implement UI
//   ReactDOM.render(
//     <React.StrictMode>
//       <AppHotReload />
//     </React.StrictMode>,
//     document.getElementById("root"),
//   );
// } else {
//   const { store, persistor } = require("@popup/popup.preprocessor");
//   console.log("1 store ", store);
//   console.log("1 persistor ", persistor);
//   ReactDOM.render(
//     <React.StrictMode>
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <App />
//         </PersistGate>
//       </Provider>
//     </React.StrictMode>,
//     document.getElementById("root"),
//   );
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// unregisterServiceWorker();
