import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "@popup/app";
import { unregisterServiceWorker } from "./core/service-worker";
import { App as AppTest } from "@popup/pages/app";

ReactDOM.render(
  <React.StrictMode>
    <AppTest />
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregisterServiceWorker();
