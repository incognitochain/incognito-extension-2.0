import { createContext, useContext } from "react";

export type CreateNewKeyBaseType = {
  setRoutePath?: (path: string) => void;
};

export type CreateNewKeyPageType = {
  masterKeyName?: string;
  checkBoxAccept?: boolean;
};

export type MasterKeyPhrasePageType = {
  phraseList?: string[];
  setPhraseList?: (phraseList: string[]) => void;
};

export type CreateNewKeyRouteContextType = CreateNewKeyBaseType &
  CreateNewKeyPageType &
  MasterKeyPhrasePageType;

export const CreateNewKeyContextInit: CreateNewKeyRouteContextType = {};

export const CreateNewKeyContext = createContext<CreateNewKeyRouteContextType | null>(
  CreateNewKeyContextInit,
);
export const useCreateNewKeyContext = (): CreateNewKeyRouteContextType =>
  useContext(CreateNewKeyContext) as CreateNewKeyRouteContextType;
