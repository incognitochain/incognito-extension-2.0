import http, { changeBaseUrl } from "@services/http";

export const getWalletAccounts = async (masterAccountPublicKey: any) => {
  let result = [{ name: "Anon", id: 1 }];
  // try {
  //   const url = `hd-wallet/recovery?Key=${masterAccountPublicKey}`;
  //   await changeBaseUrl();
  //   const res: any = await http.get(url);
  //   result =
  //     res?.Accounts?.map((account: any) => ({
  //       name: account?.Name,
  //       id: account?.AccountID,
  //     })) || [];
  // } catch {
  //   //
  // }
  // if (result && result.length > 0) {
  //   return [result[0]];
  // }
  return result;
};
