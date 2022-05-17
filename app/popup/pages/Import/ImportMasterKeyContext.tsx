import { createContext, useContext } from "react";

export type ImportMasterKeyPageType = {
  setRoutePath?: (path: string) => void;
  mnemonic?: string;
};

export type PasswordPageType = {
  password?: string;
};

export type ImportMasterKeyRouteType = ImportMasterKeyPageType & PasswordPageType;

export const ImportMasterKeyInit: ImportMasterKeyRouteType = {
  mnemonic: "",
  password: "",
};

export const ImportMasterKeyContext = createContext<ImportMasterKeyRouteType | object>(ImportMasterKeyInit);

export const useCreateNewKeyContext = (): ImportMasterKeyRouteType =>
  useContext(ImportMasterKeyContext) as ImportMasterKeyRouteType;
