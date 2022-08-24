import React, { createContext, useContext, useEffect, useState } from "react";
import pump from "pump";
import { createObjectMultiplex } from "../../core/utils";
import {
  ENVIRONMENT_TYPE_NOTIFICATION,
  ENVIRONMENT_TYPE_POPUP,
  MUX_CONTROLLER_SUBSTREAM,
  Network,
  Notification,
  PopupActions,
  PopupState,
  Token,
} from "../../core/types";
import RpcEngine from "json-rpc-engine";

const PortStream = require("extension-port-stream");
const createJsonRpcStream = require("json-rpc-middleware-stream");
const JSON_RPC = "2.0";

let isNotification = false;
if (window.location.hash === "#notification") {
  isNotification = true;
}

interface RPCResp<T> {
  id: number;
  jsonrpc: string;
  result: T;
}

interface BackgroundContextType {
  isNotification: boolean;
  popupState: PopupState | undefined;
  request: (method: PopupActions, params: any) => Promise<RPCResp<PopupState>>;
  changeNetwork: (network: Network) => void;
  changeAccount: (account: string) => void;
}

export const BackgroundContext = createContext<BackgroundContextType | null>(null);

export const getEnvironmentType = () => {
  if (isNotification) {
    return ENVIRONMENT_TYPE_NOTIFICATION;
  } else {
    return ENVIRONMENT_TYPE_POPUP;
  }
};

export function BackgroundProvider(props: React.PropsWithChildren<{}>) {
  let [engine, setEngine] = useState<any>();
  const [state, setState] = useState<PopupState>();

  const setupStreams = () => {
    const windowType = getEnvironmentType();
    console.log("Window type detected: %s", windowType);
    const bgPort = chrome.runtime.connect({ name: windowType });
    const bgStream = new PortStream(bgPort);
    const popupMux = createObjectMultiplex("popup-ext-mux");
    // not sure why we do this
    popupMux.setMaxListeners(25);

    pump(bgStream, popupMux, bgStream, (err) => {
      console.log("Background stream <> mux disconnected", err);
    });

    const jsonRpcConnection = createJsonRpcStream();
    pump(jsonRpcConnection.stream, popupMux.createStream(MUX_CONTROLLER_SUBSTREAM), jsonRpcConnection.stream, (err) => {
      console.log("JsonRPC stream <> controller sub-stream disconnected", err);
    });

    // @ts-ignore FIXME: Type definition in json-rpc-engine is incorrect, RpcEngine is not exported
    const rpcEngine = new RpcEngine();
    rpcEngine.push(jsonRpcConnection.middleware);
    // json rpc notification listener
    jsonRpcConnection.events.on("notification", (resp: Notification) => {
      console.log("jsonRpcConnection resp ", resp);
      switch (resp.type) {
        case "popupStateChanged":
          console.log("Received state change notification %O", resp.data);
          setState(resp.data);
          return;
        default:
          console.log("Received unhandled notification [%s] %O", resp.type, resp.data);
      }
    });
    setEngine(rpcEngine);
    engine = rpcEngine;
    getBackgroundState();
  };

  const getBackgroundState = () => {
    console.log("retrieving popup state from background");
    request("popup_getState", {}).catch((err) => {
      console.log("error received popup state from background %O", err);
    });
  };

  useEffect(() => {
    setupStreams();
  }, []);

  const request: BackgroundContextType["request"] = (method: PopupActions, params: any) => {
    return new Promise<RPCResp<PopupState>>(function (resolve, reject) {
      const requestId = Math.random().toFixed(10);
      let request = { id: requestId, jsonrpc: JSON_RPC, method: method };
      if (params) {
        request = Object.assign(request, { params: params });
      }
      engine.handle(request, function (err: any, response: any) {
        // console.log(" engine.handle ", { request, err, response });
        if (err) {
          reject(err);
        } else {
          const res = response as RPCResp<PopupState>;
          console.log("received new popup state from background: %O", res);
          setState(res.result);
          resolve(res);
        }
      });
    });
  };

  const changeNetwork: BackgroundContextType["changeNetwork"] = (network: Network) => {
    console.log("Changing network from A to B");
    request("popup_changeNetwork", { cluster: network.cluster })
      .then((state) => {
        console.log("Changed network DONE");
      })
      .catch((err) => {
        console.log("Unable to switch network ERROR ", err);
      });
  };

  const changeAccount: BackgroundContextType["changeAccount"] = (account: string) => {
    request("popup_changeAccount", { account: account })
      .then((state) => {
        console.log("Changed account to [%s]", state.result);
      })
      .catch((err) => {
        console.log("Unable to switch account from [%s] to [%s]", account, err);
      });
  };

  return (
    <BackgroundContext.Provider
      value={{
        request,
        isNotification,
        popupState: state,
        changeNetwork,
        changeAccount,
      }}
    >
      {props.children}
    </BackgroundContext.Provider>
  );
}

export function usePopupState(): PopupState {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("Background not found, usePopupState must be used within the BackgroundProvider");
  }
  if (!context.popupState) {
    throw new Error("No popup state, use popupState() should only be called after the routes");
  }

  return context.popupState;
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("Background not found, useBackground must be used within the BackgroundProvider");
  }
  return context;
}
