import { AVAILABLE_NETWORKS, PopupState } from "@core/types";
import { ActionManager } from "./action-manager";
import { Store } from "../store";

export class PopupStateResolver {
  private store: Store;
  private actionManager: ActionManager;

  constructor(store: Store, actionManager: ActionManager) {
    this.store = store;
    this.actionManager = actionManager;
  }

  get = (): PopupState => {
    let state: PopupState = {
      walletState: "uninitialized",
      accounts: [],
      selectedNetwork: this.store.selectedNetwork,
      authorizedOrigins: [],
      actions: this.actionManager.getOrderedActions(),
      storeData: {},
      reqResponse: null,
      accountDetail: undefined,
    };

    if (this.store.hasSecretBox()) {
      state.walletState = "locked";
    }

    if (this.store.hasWallet()) {
      state.walletState = "unlocked";
      // state.accounts = this.store.wallet?.getPublicKeysAsBs58() || [];
      // state.authorizedOrigins = this.store.authorizedOrigins;
    }

    return state;
  };
}
