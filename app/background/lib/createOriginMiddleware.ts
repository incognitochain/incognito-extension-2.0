import { isKindOfWalletAction } from "@core/types";
import { Store } from "../store";

export default function createOriginMiddleware(opts: { origin: string; store: Store }) {
  // console.log("[createOriginMiddleware] ", { opts });
  return function originMiddleware(req: any, res: any, next: any) {
    // console.log("[originMiddleware] ", { req, res, next });
    const { origin, store } = opts;

    req.origin = origin;

    if (origin.startsWith("chrome-extension://")) {
      //todo: should check for full ext url
      next();
      return;
    }

    if (store.isOriginAuthorized(origin)) {
      next();
      return;
    }
    if (isKindOfWalletAction(req.method)) {
      next();
      return;
    }
    // if (
    //   req.method === "wallet_requestAccounts" ||
    //   req.method === "wallet_getCluster" ||
    //   req.method === "wallet_getState"
    // ) {
    //   next();
    //   return;
    // }
    res.err = "authorized origin require to request: " + req.method;
    return;
  };
}
