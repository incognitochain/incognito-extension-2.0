// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Header } from 'src/components';
// import { IAddressBookLanguage } from 'src/i18n/interface';
// import styled from 'styled-components';
// import { translateByFieldSelector } from 'src/module/Configs';
// import { themeSelector } from 'src/module/Setting';
// import { ITheme } from 'src/styles';
// import withAddressBook, { IMergeProps } from './AddressBook.enhance';
// import { IAddressBook } from './AddressBook.interface';
// import MasterKeyItem from '../HDWallet/features/MasterKeyItem';
//
// const Styled = styled.div`
//     .item {
//         margin-bottom: 30px;
//         cursor: pointer;
//     }
//     .item .hook {
//         margin-top: 30px;
//         padding-left: 15px;
//     }
//     .item .hook .name {
//         margin-bottom: 15px;
//     }
//     .item .hook .address {
//     }
//     .item .sub {
//         justify-content: space-between;
//     }
// `;
// const AddressBook = React.memo((props: IMergeProps & any) => {
//     const { addressBook, onGoBack, onSelectedItem, onRemoveItem, showRemoveItem } = props;
//     const translate: IAddressBookLanguage = useSelector(translateByFieldSelector)('addressBook');
//     const theme: ITheme = useSelector(themeSelector);
//     const factories = addressBook.map((item: { title: string; data: any[] }) => ({
//         masterKeyName: item.title,
//         listAccount: item.data,
//     }));
//     return (
//         <Styled theme={theme}>
//             <Header onGoBack={onGoBack} title={translate.headerTitle} canSearch />
//             <div className="scroll-view">
//                 {factories.map((item: { listAccount: IAddressBook[]; masterKeyName: string }) => (
//                     <MasterKeyItem
//                         key={item.masterKeyName}
//                         data={{ masterKeyName: item.masterKeyName, listAccount: item.listAccount }}
//                         onSelectedItem={onSelectedItem}
//                         onRemoveItem={onRemoveItem}
//                         showRemoveItem={showRemoveItem}
//                     />
//                 ))}
//             </div>
//         </Styled>
//     );
// });
//
// export default withAddressBook(AddressBook);
export default {};
