import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "@popup/app";
import { unregisterServiceWorker } from "./core/service-worker";
import { App as AppTest } from "@popup/pages/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/popup/popup-preprocessor";

if (store && persistor)
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

// ReactDOM.render(
//   <React.StrictMode>
//     <AppTest />
//   </React.StrictMode>,
//   document.getElementById("root"),
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregisterServiceWorker();
