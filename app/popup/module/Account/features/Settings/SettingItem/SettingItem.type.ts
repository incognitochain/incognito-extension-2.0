import { MasterKeyActiveType } from "@redux-sync-storage/masterkey/masterkey.types";
import { ReactElement } from "react";

export type SettingItemKey = "Create a new keychain" | "Reveal recovery phrase" | "Import a keychain" | "Back up" | "Restore"

export type SettingItemType = {
  key: SettingItemKey,
  icon: ReactElement;
  name: string;
  visible?: boolean;
  belongTo: MasterKeyActiveType[];
  onClick: (item: SettingItemType) => void
}
