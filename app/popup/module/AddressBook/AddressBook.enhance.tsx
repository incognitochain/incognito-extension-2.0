import { IAddressBook } from "./AddressBook.interface";
import React from "react";
import ErrorBoundary from "@components/ErrorBoundary";

export interface TInner {
  addressBook: IPropsAddrBook[];
  onSelectedItem: (item: IAddressBook) => any;
  onRemoveItem: (item: IAddressBook) => any;
  showRemoveItem: boolean;
}

export interface IPropsAddrBook {
  data: IAddressBook[];
  title: string;
}

export interface IProps {
  onGoBack?: () => any;
  onSelectedAddrBook?: any;
  filterBySelectedPrivacy?: boolean;
}

export interface IMergeProps extends TInner, IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
  // const dispatch = useDispatch();
  // const { filterBySelectedPrivacy, onSelectedAddrBook } = props;
  // const translate: IAddressBookLanguage = useSelector(translateByFieldSelector)("addressBook");
  // const history = useHistory();
  // const keySearch = useSelector(keySearchSelector);
  // const selectedPrivacy = useSelector(selectedPrivacySelector);
  // const incognitoAddr: IAddressBook[] = useSelector(incognitoAddrSelector);
  // const externalAddr: IAddressBook[] = useSelector(externalAddrSelector);
  // const { removed }: IGeneralLanguage = useSelector(translateByFieldSelector)("general");
  // const { state }: { state: any } = useLocation();
  // const { showRemoveItem = false }: { showRemoveItem?: boolean } = state || {};
  // const extAddrFilBySelPrivacy = [
  //   ...externalAddr.filter((item) =>
  //     filterBySelectedPrivacy ? item?.rootNetworkName === selectedPrivacy?.rootNetworkName : true,
  //   ),
  // ];
  // const { result: incognitoAddrFil } = useSearchBox({
  //   data: incognitoAddr,
  //   handleFilter: () => filterKeychainByKeySearch(incognitoAddr, keySearch),
  // });
  // const { result: externalAddrFil } = useSearchBox({
  //   data: extAddrFilBySelPrivacy,
  //   handleFilter: () => filterKeychainByKeySearch(extAddrFilBySelPrivacy, keySearch),
  // });
  // let addressBook: { title: string; data: any[] }[] = [];
  // const [listMasterKeyWithKeychains] = useMasterKeyWithKeychains();
  // addressBook = [
  //   ...listMasterKeyWithKeychains.map((item) => ({
  //     data: [...item.listAccount],
  //     title: item.walletName,
  //   })),
  // ];
  // if (incognitoAddrFil.length !== 0) {
  //   addressBook.push({
  //     data: incognitoAddrFil,
  //     title: translate.incognito,
  //   });
  // }
  // if (externalAddrFil.length !== 0) {
  //   addressBook.push({
  //     data: externalAddrFil,
  //     title: translate.external,
  //   });
  // }
  // const onSelectedItem = async (addressBook: IAddressBook) => {
  //   if (typeof onSelectedAddrBook === "function") {
  //     return onSelectedAddrBook(addressBook);
  //   }
  //   if (!addressBook.isKeychain && addressBook?.canBeEdit) {
  //     await dispatch(actionSelectedAddrBook({ addressBook }));
  //     return history.push(routeAction, {});
  //   }
  //   return null;
  // };
  // const onRemoveItem = async (addressBook: IAddressBook) => {
  //   try {
  //     if (!addressBook) {
  //       return;
  //     }
  //     dispatch(actionDelete({ addressBook }));
  //     dispatch(
  //       actionToggleToast({
  //         toggle: true,
  //         value: removed,
  //         type: TOAST_CONFIGS.success,
  //       }),
  //     );
  //   } catch (error) {
  //     dispatch(
  //       actionToggleToast({
  //         toggle: true,
  //         value: error,
  //         type: TOAST_CONFIGS.error,
  //       }),
  //     );
  //   }
  // };
  // React.useEffect(() => {
  //   dispatch(actionRemoveSelectedAddrBook());
  // }, []);

  return (
    <ErrorBoundary>
      {/*<WrappedComponent {...{ ...props, addressBook, onSelectedItem, onRemoveItem, showRemoveItem }} />*/}
      <WrappedComponent {...{ ...props }} />
    </ErrorBoundary>
  );
};

export default enhance;
