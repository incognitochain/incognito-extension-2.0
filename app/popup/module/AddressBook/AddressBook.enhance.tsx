import { IAddressBook } from "./AddressBook.interface";
import React from "react";
import ErrorBoundary from "@components/ErrorBoundary";
import { useMasterKeyWithKeychains } from "@popup/hooks/useMasterKeyWithKeychains";

export interface TInner {
  addressBook: IPropsAddrBook[];
  onSelectedItem: (item: IAddressBook) => any;
}

export interface IPropsAddrBook {
  data: IAddressBook[];
  title: string;
}

export interface IProps {
  onSelectedAddrBook?: any;
}

export interface IMergeProps extends TInner, IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
  const { onSelectedAddrBook } = props;
  let addressBook: { title: string; data: any[] }[] = [];
  const [listMasterKeyWithKeychains] = useMasterKeyWithKeychains();
  addressBook = [
    ...listMasterKeyWithKeychains.map((item) => ({
      data: [...item.listAccount],
      title: item.walletName,
    })),
  ];

  const onSelectedItem = async ({ address }: { address: string }) => {
    if (typeof onSelectedAddrBook === "function") {
      return onSelectedAddrBook({ address });
    }
  };

  return (
    <ErrorBoundary>
      <WrappedComponent {...{ ...props, addressBook, onSelectedItem }} />
    </ErrorBoundary>
  );
};

export default enhance;
