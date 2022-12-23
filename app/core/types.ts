import { AccountDetail } from "@redux-sync-storage/account/account.types";

export const ENVIRONMENT_TYPE_POPUP = "popup";
export const ENVIRONMENT_TYPE_BACKGROUND = "background";
export const ENVIRONMENT_TYPE_NOTIFICATION = "notification"; // will be supported soon
export const INPAGE_MESSAGE_STREAM = "incognito.inpage";
export const CONTENT_MESSAGE_STREAM = "incognito.cs";
export const MUX_PROVIDER_SUBSTREAM = "incognito.provider";
export const MUX_CONTROLLER_SUBSTREAM = "incognito.controller";
export const CHROME_CONN_CS = "incognito.cs";
export const EVENT_UPDATE_BADGE = "updateBadge";
export const EVENT_UPDATE_ACTIONS = "updateActions";

export type AccountInfo = {
  paymentAddress: string;
  keyDefine: string;
  balances: any[];
};

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

export type IncognitoSignTransactionResponse = {
  data: any;
};

export type VersionedData = {
  version: string;
  data: StoredData;
};

export type StoredData = {
  secretBox: SecretBox | undefined;
  accountCount: number;
  authorizedOrigins: string[];
};

export type WalletState = "locked" | "unlocked" | "uninitialized";

export type IBalance = {
  amount: string;
  id: string;
  swipable: boolean;
};

export type PopupState = {
  walletState: WalletState;
  accounts: string[];
  authorizedOrigins: string[];
  actions: OrderedAction[];
  storeData?: any;
  reqResponse: null;
  accountDetail?: AccountDetail;
};

export type ActionKey = {
  tabId: string;
  origin: string;
  uuid: string;
};

export type OrderedAction = { key: ActionKey; action: Action };
export type Action = ActionSignTransaction | ActionRequestAccounts | IncognitoSignTransaction;

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

export type IncognitoSignTransaction = BaseAction<any> & {
  type: "sign_transaction";
  tabId: string;
};

export type BaseAction<T> = {
  resolve: (resp: T) => void;
  reject: (error: Error) => void;
};

export type WallActions =
  | "wallet_signTransaction"
  | "wallet_requestAccounts"
  | "wallet_getCluster"
  | "wallet_getState"
  | "wallet_make_signature";

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
  | "popup_changeNetwork"
  | "popup_changeAccount"
  | "popup_addToken"
  | "popup_createAccount"
  | "popup_switchAccount"
  | "popup_followTokensBalance"
  | "popup_switchNetwork"
  | "popup_create_and_send_transaction"
  | "popup_request_scan_coins"
  | "popup_request_account_detail"
  | "popup_getFollowTokenList"
  | "popup_getPTokenList"
  | "popup_scan_coins_box_click"
  | "popup_request_clear_storage_scan_coins"
  | "popup_addNewFollowToken"
  | "popup_request_txs_history"
  | "popup_removeFollowToken"
  | "popup_importKeyChain"
  | "popup_requestBackupPrivateKeys"
  | "popup_requestRestorePrivateKeys"
  | "popup_requestRevealMasterKeyPhrase"
  | "popup_requestSwitchMasterKey"
  | "popup_requestGetAmountAccountsOfMasterless"
  | "popup_hdWalletConnect";

export type Markdown = string;

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
  // data: Network;
  data: {};
};

export type NotificationAccountsChanged = {
  type: "accountsChanged";
  data: AccountInfo[];
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

export const WalletActionsList = [
  "wallet_signTransaction",
  "wallet_requestAccounts",
  "wallet_getPaymentAddress",
  "wallet_getState",
  "wallet_getBalance",
  "wallet_showPopup",
  "wallet_make_signature",
] as const;

export type WalletActionsType = typeof WalletActionsList[number];

export function isKindOfWalletAction(actionType: string): actionType is WalletActionsType {
  return (WalletActionsList as readonly string[]).includes(actionType);
}

type WalletStructSDK = {
  PassPhrase: string;
  Mnemonic: string;
  MasterAccount: any;
  Name: string; //$[NetworkName]-master-[name], Ex.. ($mainnet-master-abc)
  Seed: any;
  Storage: any;
  Network: string;
  measureStorage: any;
  IsMasterless: boolean;
  RootName: string; //Shorten Name. Ex.. (abc)
  RpcClient: string;
  RpcCoinService: string;
  PrivacyVersion: number;
  UseLegaceEncoding: boolean;
  PubsubService: string;
  RpcRequestService: string;
  AuthToken: string;
  RpcApiService: string;
  PortalService: string;
  IsBIP44: boolean;
  deletedAccountIds: any[];
};

type WalletMethods = {
  save(aesKey?: string): void;
  import(mnemonic: string, aesKey: string, name: string, storage: any): void;
  listAccountNoCache(): Promise<any>;
};

export type WalletSDK = WalletStructSDK & WalletMethods;

export type BackupPriavteKeyType = {
  privateKey: string;
  accountName: string;
}[];
