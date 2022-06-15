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
  //   console.log("SANG TEST::: ", result[0]);
  //   return [result[0]];
  // }
  return result;
};

export const updateWalletAccounts = (masterAccountPublicKey: any, accounts: any) => {
  // const accountInfos = accounts.map((item: any) => ({
  //   Name: item.name,
  //   AccountID: item.id,
  // }));
  // return http
  //   .put("hd-wallet/recovery", {
  //     Key: masterAccountPublicKey,
  //     Accounts: accountInfos,
  //   })
  //   .catch((e: any) => {
  //     console.log("updateWalletAccounts ERROR ", e);
  //   });
};
