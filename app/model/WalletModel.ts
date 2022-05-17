class WalletModel {
  IsBIP44?: boolean;
  IsMasterless?: boolean;
  MasterAccount?: any;
  Mnemonic?: string;
  Name?: string;
  Network?: string;
  PassPhrase?: string;
  PortalService?: string;
  PrivacyVersion?: number;
  PubsubService?: string;
  RootName?: string;
  RpcApiService?: string;
  RpcClient?: string;
  RpcCoinService?: string;
  RpcRequestService?: string;
  Seed?: any;
  Storage?: any;
  UseLegacyEncoding?: boolean;
  measureStorage?: any;
  constructor(data: object = {}) {}
}

export default WalletModel;
