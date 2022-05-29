import { Cluster, clusterApiUrl, TransactionInstruction } from "@solana/web3.js";

export const ENVIRONMENT_TYPE_POPUP = "popup";
export const ENVIRONMENT_TYPE_BACKGROUND = "background";
export const ENVIRONMENT_TYPE_NOTIFICATION = "notification"; // will be supported soon
export const INPAGE_MESSAGE_STREAM = "sol.inpage";
export const CONTENT_MESSAGE_STREAM = "sol.cs";
export const MUX_PROVIDER_SUBSTREAM = "sol.provider";
export const MUX_CONTROLLER_SUBSTREAM = "sol.controller";
export const CHROME_CONN_CS = "sol.cs";
export const EVENT_UPDATE_BADGE = "updateBadge";
export const EVENT_UPDATE_ACTIONS = "updateActions";

export const DEFAULT_NETWORK: Network = {
  title: "Devnet",
  cluster: "devnet",
  endpoint: clusterApiUrl("devnet"),
};

export const AVAILABLE_NETWORKS: Network[] = [
  { title: "Mainnet Beta", cluster: "mainnet-beta", endpoint: clusterApiUrl("mainnet-beta") },
  { title: "Devnet", cluster: "devnet", endpoint: clusterApiUrl("devnet") },
  { title: "Testnet", cluster: "testnet", endpoint: clusterApiUrl("testnet") },
  // { title: "Break", cluster: "testnet", endpoint: "https://break-api.testnet.solana.com" },
];
export type RequestAccountsResp = {
  accounts: string[];
};

export type SignatureResult = {
  publicKey: string;
  signature: string;
};
export type SignTransactionResp = {
  signatureResults: SignatureResult[];
};

export type Network = {
  title: string;
  cluster: Cluster | string;
  endpoint: string;
};

export type MintAddressTokens = { [mintAddress: string]: Token };
export type NetworkTokens = { [network: string]: MintAddressTokens };

export type VersionedData = {
  version: string;
  data: StoredData;
};

export type StoredData = {
  secretBox: SecretBox | undefined;
  accountCount: number;
  selectedNetwork: Network | any;
  selectedAccount: string;
  authorizedOrigins: string[];
};

export type WalletState = "locked" | "unlocked" | "uninitialized";

export type PopupState = {
  walletState: WalletState;
  accounts: string[];
  selectedAccount: string;
  selectedNetwork: Network;
  availableNetworks: Network[];
  authorizedOrigins: string[];
  actions: OrderedAction[];
  storeData?: any;
};

export type ActionKey = {
  tabId: string;
  origin: string;
  uuid: string;
};

export type OrderedAction = { key: ActionKey; action: Action };
export type Action = ActionSignTransaction | ActionRequestAccounts;

export type ActionRequestAccounts = BaseAction<RequestAccountsResp> & {
  type: "request_accounts";
  // action payload
  tabId: string;
  origin: string;
};

export type ActionSignTransaction = BaseAction<SignTransactionResp> & {
  type: "sign_transaction";
  // action payload
  message: string;
  signers: string[];
  details?: Markdown[];
  tabId: string;
};

export type BaseAction<T> = {
  resolve: (resp: T) => void;
  reject: any;
};
export type WallActions = "wallet_signTransaction" | "wallet_requestAccounts" | "wallet_getCluster" | "wallet_getState";

export type PopupActions =
  | "popup_getState"
  | "popup_createWallet"
  | "popup_importWallet"
  | "popup_restoreWallet"
  | "popup_unlockWallet"
  | "popup_lockWallet"
  | "popup_authoriseTransaction"
  | "popup_declineTransaction"
  | "popup_authoriseRequestAccounts"
  | "popup_deleteAuthorizedWebsite"
  | "popup_declineRequestAccounts"
  | "popup_addWalletAccount"
  | "popup_sendSolToken"
  | "popup_sendSplToken"
  | "popup_sendTransaction"
  | "popup_changeNetwork"
  | "popup_changeAccount"
  | "popup_addToken"
  | "popup_removeToken"
  | "popup_updateToken"
  | "popup_createAccount"
  | "popup_switchAccount";

export type PendingSignTransaction = {
  message: string;
  signers: string[];
  details?: Markdown[];
  tabId: string;
};

export type Markdown = string;

export type DecodedInstruction = {
  instruction: TransactionInstruction;
  instructionType: string;
  properties: { [key: string]: any };
};

export type Token = {
  mintAddress: string;
  name: string;
  symbol: string;
  decimals: number;
};

export type PendingRequestAccounts = {
  tabId: string;
  origin: string;
};

export type SecretBox = {
  passphraseEncrypted: string;
  salt: string;
};

export type Notification =
  | NotificationNetworkChanged
  | NotificationAccountsChanged
  | NotificationPopupStateChanged
  | NotificationStateChanged;

export type NotificationNetworkChanged = {
  type: "clusterChanged";
  data: Network;
};

export type NotificationAccountsChanged = {
  type: "accountsChanged";
  data: string[];
};

export type NotificationPopupStateChanged = {
  type: "popupStateChanged";
  data: PopupState;
};

export type NotificationStateChanged = {
  type: "stateChanged";
  data: {
    state: WalletState;
  };
};
