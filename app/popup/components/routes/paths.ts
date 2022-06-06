import { compile } from "path-to-regexp";
export type PathsKeyMap = {
  [PathsKeyType: string]: string;
};

export type PathsKeyType = "/create-new-key" | "/master-key-pharse";
export const Paths = {
  restore: "/restore",
  login: "/login",
  welcome: "/welcome",
  authorizedWebsites: "/authorized-websites",
  tokens: "/tokens",
  accountDetail: "/accounts/:accountAddress/:signerAddress",
  accounts: "/accounts",
  notifications: "/notifications",
  lockWallet: "/lock-wallet",
  transactionDetail: "/transaction/:transactionID/:accountAddress/:signerAddress",

  getStatedPage: "/get-started-page",
  createNewKeyPage: "/create-new-key",
  masterKeyPhrasePage: "/master-key-pharse",
  masterKeyPhraseConfirmPage: "/master-key-pharse-confirm",
  masterKeyPhraseCreatedPage: "/master-key-pharse-created",
  createNewKeyStack: "/create-new-key-stack",
  signInPage: "/signin-page",
  passwordPage: "/password-page",

  importMasterKeyPage: "/import-master-key",
  importMasterKeyStack: "/import-master-key-stack",

  homeRouteStack: "/",
  unlockPage: "/unlock-page",
  createAccountPage: "/create-account-page",
  restoreWalletPage: "/restore-wallet-page",
  settingsPage: "/settings-page",
  networkPage: "/network-page",
};

export const PathsKey: PathsKeyMap = {
  "/create-new-key": "Create new key",
  "/master-key-pharse": "Master key pharse",
  "/master-key-pharse-confirm": "Master key pharse",
  "/master-key-pharse-created": "TEST",
  "/signin-page": "",
};

export const Links = {
  restore: compile(Paths.restore),
  login: compile(Paths.login),
  welcome: compile(Paths.welcome),
  notifications: compile(Paths.notifications),
  authorizedWebsites: compile(Paths.authorizedWebsites),
  tokens: compile(Paths.tokens),
  accounts: compile(Paths.accounts),
  accountDetail: compile(Paths.accountDetail),
  transactionDetail: compile(Paths.transactionDetail),
  getStatedPage: compile(Paths.getStatedPage),
  createNewKeyPage: compile(Paths.createNewKeyPage),
  masterKeyPhrasePage: compile(Paths.masterKeyPhrasePage),
  masterKeyPhraseConfirmPage: compile(Paths.masterKeyPhraseConfirmPage),
  masterKeyPhraseCreatedPage: compile(Paths.masterKeyPhraseCreatedPage),
  signInPage: compile(Paths.signInPage),
  createNewKeyStack: compile(Paths.createNewKeyStack),
  passwordPage: compile(Paths.passwordPage),
  importMasterKeyStack: compile(Paths.importMasterKeyStack),
  importMasterKeyPage: compile(Paths.importMasterKeyPage),
  homeRouteStack: compile(Paths.homeRouteStack),
  unlockPage: compile(Paths.unlockPage),
};
