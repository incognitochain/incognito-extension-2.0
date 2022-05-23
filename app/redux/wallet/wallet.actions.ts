import { WalletActionType } from "./wallet.types";

export const setWallet = (wallet: any) => ({
  type: WalletActionType.SET,
  data: wallet,
});
