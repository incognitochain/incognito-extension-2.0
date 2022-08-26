export interface IHistoryFromSDK {
  amount: string;
  fee: number;
  memo: string;
  metadata?: any;
  receiverAddress: string;
  senderSeal: string;
  status: number;
  statusStr: string;
  time: number;
  tokenID: string;
  txId: string;
  txType: number;
  txTypeStr: string;
  versionTx?: number;
}

export interface IHistory {
  amountStr: string;
  feeStr: string;
  memo: string;
  receiverAddress: string;
  statusStr: string;
  timeStr: string;
  txID: string;
  txTypeStr: string;
  statusColor: string;
}

export interface IRequestHistory {
  tokenID: string;
  isPToken: boolean;
  version: number;
}
