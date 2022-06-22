import { useSelector } from "react-redux";
import { groupMasterKeys } from "@redux/masterKey";
import { defaultAccountSelector } from "@redux/account/account.selectors";

interface IHooks {
  walletName: string;
  listAccount: any[];
  walletId: string;
}

export const useMasterKeyWithKeychains: () => [IHooks[]] = () => {
  const _groupedMasterKeys = useSelector(groupMasterKeys);
  const _defaultAccount: any = useSelector(defaultAccountSelector);
  const result = _groupedMasterKeys.map((masterKey) => ({
    listAccount: (masterKey.child || [])
      .map((account) => ({
        name: account.AccountName,
        address: account.PaymentAddress,
      }))
      .filter((account) => account.address !== _defaultAccount.PaymentAddress),
    walletName: masterKey.name,
    walletId: masterKey.name,
  }));
  return [result];
};
