// import { IAddressBook } from 'src/module/AddressBook';
// import { AccountInstance } from 'incognito-js/build/web/browser';
// import { createSelector } from 'reselect';
// import { IRootState } from 'src/redux/interface';
// import { isMainnetSelector } from 'src/module/Preload/Preload.selector';
// import { fullListAccountSelector } from 'src/module/HDWallet/HDWallet.selector';
//
// export const addressBookSelector = createSelector(
//     (state: IRootState) => state.addressBook,
//     isMainnetSelector,
//     (addressBook, mainnet) => ({
//         ...addressBook,
//         incognitoAddress: addressBook.incognitoAddress.filter((item: IAddressBook) => item.mainnet === mainnet) || [],
//         externalAddress: addressBook.externalAddress.filter((item: IAddressBook) => item.mainnet === mainnet) || [],
//     }),
// );
//
// export const incognitoAddrSelector = createSelector(addressBookSelector, (addressBook) =>
//     addressBook.incognitoAddress.map((item) => ({ ...item, canBeRemoved: true, canBeEdit: true })),
// );
//
// export const externalAddrSelector = createSelector(addressBookSelector, (addressBook) =>
//     addressBook.externalAddress.map((item) => ({ ...item, canBeRemoved: true, canBeEdit: true })),
// );
//
// export const keychainAddrSelector = createSelector(fullListAccountSelector, (accounts) =>
//     accounts.map((account: AccountInstance) => ({
//         name: account.name,
//         address: account.key.keySet.paymentAddressKeySerialized,
//     })),
// );
//
// export const selectedAddressBookSelector = createSelector(
//     addressBookSelector,
//     (addressBookState) => addressBookState.selected,
// );
//
// export const isIncognitoAddressExistSelector = createSelector(
//     incognitoAddrSelector,
//     keychainAddrSelector,
//     (incognitoAddr: IAddressBook[], keychainAddr: { address: string; name: string }[]) => (address: string) =>
//         incognitoAddr.findIndex((item) => item.address === address) > -1 ||
//         keychainAddr.findIndex((item) => item.address === address) > -1,
// );
//
// export const isExternalAddressExistSelector = createSelector(
//     externalAddrSelector,
//     (externalAddr: IAddressBook[]) => (address: string) => externalAddr.find((item) => item.address === address),
// );
export default {};
