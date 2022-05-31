// import { AccountInstance } from 'incognito-js/build/web/browser';
// import { useSelector } from 'react-redux';
// import { keySearchSelector, useSearchBoxVer2 } from 'src/components/Header';
// import { listMasterKeyWithKeychainsSelector } from 'src/module/HDWallet';
// import { filterKeychainByKeySearch } from 'src/utils/keychain';
//
// interface IHooks {
//     walletName: string;
//     listAccount: AccountInstance[];
//     walletId: number;
// }
//
// export const useMasterKeyWithKeychains: () => [IHooks[]] = () => {
//     const keySearch = useSelector(keySearchSelector);
//     let result: any[] = [];
//     const [filter] = useSearchBoxVer2();
//     const listMasterKeyWithKeychains = useSelector(listMasterKeyWithKeychainsSelector);
//     listMasterKeyWithKeychains
//         .map((masterKey) => ({
//             data: masterKey.listAccount.map((account: AccountInstance) => ({
//                 ...account,
//                 name: account.name,
//                 address: account.key.keySet.paymentAddressKeySerialized,
//             })),
//             walletName: masterKey.wallet.name,
//             walletId: masterKey.walletId,
//         }))
//         .forEach((masterKey: { walletId: number; data: { name: string; address: string }[]; walletName: string }) => {
//             const { data, walletName, walletId } = masterKey;
//             const keychainAddrFil = filter(data, () => filterKeychainByKeySearch(data, keySearch));
//             if (keychainAddrFil.length !== 0) {
//                 const payload = {
//                     listAccount: [...keychainAddrFil],
//                     walletName,
//                     walletId,
//                 };
//                 result.push(payload);
//             }
//         });
//     return [result];
// };

export default {};
