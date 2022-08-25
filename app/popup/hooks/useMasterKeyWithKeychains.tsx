import { useSelector } from "react-redux";
import { getAccountListSelector, getPaymentAddressSelector } from "@redux-sync-storage/account";

interface IHooks {
  walletName: string;
  listAccount: any[];
  walletId: string;
}

export const useMasterKeyWithKeychains: () => [IHooks[]] = () => {
  const _listAccount: any[] = (useSelector(getAccountListSelector) || []).map((account: any) => ({
    name: account.name,
    address: account.paymentAddress,
  }));
  const _selectedPaymentAddress: any = useSelector(getPaymentAddressSelector);
  const result = [
    {
      listAccount: _listAccount.filter((account: any) => account.address !== _selectedPaymentAddress),
      walletName: "masterkey",
      walletId: "masterkey",
    },
  ];
  return [result];
};
