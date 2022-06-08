// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory, useLocation } from "react-router-dom";
// import { compose } from "recompose";
// import { change, formValueSelector, isValid, reduxForm } from "redux-form";
// import ErrorBoundary from "@components/ErrorBoundary";
// import { withLayout } from "src/components/Layout";
// import { ERROR_MESSAGE } from "src/constants/error";
// import { route as routeWallet } from "src/module/Wallet";
// import { actionCreate, IAddressBook, IAddressBookReducer, actionUpdate, ADDRESS_BOOK_TYPE } from "@module/AddressBook";
// import { addressBookSelector, selectedAddressBookSelector } from "@module/AddressBook/AddressBook.selector";
// import { isMainnetSelector } from "@module/Preload/Preload.selector";
// import { selectedPrivacySelector } from "@module/Token/Token.selector";
// import { ISelectedPrivacy } from "src/module/Token";
// import isEqual from "lodash/isEqual";
// import trim from "lodash/trim";
// import toLower from "lodash/toLower";
// import { IGeneralLanguage } from "src/i18n";
// import { translateByFieldSelector } from "src/module/Configs";
// import { isKeyChainExist, isKeychainExistByName } from "src/utils/keychain";
//
// interface IProps {}
//
// interface TInner {
//   handleCreate: any;
//   isCreate: boolean;
//   handleAction: () => any;
//   disabledForm: boolean;
// }
//
// export interface IMergeProps extends IProps, TInner {}
//
// export const FORM_CONFIGS = {
//   formName: "form-address-book",
//   name: "name",
//   address: "address",
// };
//
// const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
//   const dispatch = useDispatch();
//   const mainnet = "";
//   const history = useHistory();
//   const { success }: IGeneralLanguage = useSelector(translateByFieldSelector)("general");
//   const { tokenId, networkName, rootNetworkName }: ISelectedPrivacy = useSelector(selectedPrivacySelector);
//   const { state: locationState }: { state: any } = useLocation();
//   const { type = 1, address = "" }: { type?: number; address?: string } = locationState;
//   const selectedAddrBook: IAddressBook = useSelector(selectedAddressBookSelector);
//   const state = useSelector((state) => state);
//   const valid = isValid(FORM_CONFIGS.formName)(state);
//   const addressBookState: IAddressBookReducer = useSelector(addressBookSelector);
//   const isCreate = !!address;
//   const isEdit = !isCreate && !!selectedAddrBook;
//   const selector = formValueSelector(FORM_CONFIGS.formName);
//   const nameInput = useSelector((state) => trim(selector(state, FORM_CONFIGS.name) || ""));
//   const addressInput = useSelector((state) => trim(selector(state, FORM_CONFIGS.address || "")));
//   const shouldEdit = selectedAddrBook && !isEqual(toLower(selectedAddrBook?.name), toLower(nameInput));
//   const disabledForm = !valid || (isEdit && !shouldEdit) || !nameInput;
//   const handleCreate = () => {
//     const field = ADDRESS_BOOK_TYPE[type];
//     const oldAddressedBook: IAddressBook[] = addressBookState[field];
//     const name = trim(nameInput);
//     const address = trim(addressInput);
//     const addressBook = { name, address, type, mainnet, networkName, rootNetworkName, tokenId };
//     const isExist = isKeyChainExist(oldAddressedBook, addressBook);
//     if (isExist) {
//       throw new Error(ERROR_MESSAGE.ADDRESS_BOOK_IS_EXIST);
//     }
//     dispatch(
//       actionCreate({
//         addressBook,
//       }),
//     );
//     history.push(routeWallet);
//   };
//   const handleEdit = () => {
//     const field = ADDRESS_BOOK_TYPE[selectedAddrBook.type];
//     const oldAddressedBook: IAddressBook[] = addressBookState[field];
//     const name = trim(nameInput);
//     const addressBook = { ...selectedAddrBook, name };
//     const isExist = isKeychainExistByName(oldAddressedBook, name);
//     if (isExist) {
//       throw new Error(ERROR_MESSAGE.ADDRESS_BOOK_IS_EXIST);
//     }
//     dispatch(
//       actionUpdate({
//         addressBook,
//       }),
//     );
//     history.goBack();
//   };
//   const handleAction = () => {
//     try {
//       if (disabledForm) {
//         return;
//       }
//       if (isCreate) {
//         handleCreate();
//       } else {
//         handleEdit();
//       }
//     } catch (error) {
//
//     }
//   };
//   React.useEffect(() => {
//     if (isCreate) {
//       dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.address, address));
//     } else {
//       // edit
//       dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.address, selectedAddrBook?.address));
//       dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.name, selectedAddrBook?.name));
//     }
//   }, [selectedAddrBook, address]);
//   return (
//     <ErrorBoundary>
//       <WrappedComponent {...{ ...props, handleAction, isCreate, disabledForm }} />
//     </ErrorBoundary>
//   );
// };
//
// export default compose<IMergeProps, any>(
//   withLayout,
//   reduxForm<any, any>({
//     form: FORM_CONFIGS.formName,
//   }),
//   enhance,
// );

export default {};
