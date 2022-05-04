export interface MasterKeyModelProps {
  name: string;
  isActive?: boolean;
  passphrase?: string;
  mnemonic?: string;
  deletedAccountIds?: string[];
  isMasterless?: boolean;
}

export interface MasterKeyModelActions {}
