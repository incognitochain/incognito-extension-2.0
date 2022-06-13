import { IAddressBook } from "./AddressBook.interface";
import React from "react";
import ErrorBoundary from "@components/ErrorBoundary";
import { useMasterKeyWithKeychains } from "@popup/hooks/useMasterKeyWithKeychains";
import { FORM_CONFIGS } from "@module/Send";
import { change, focus } from "redux-form";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "@redux/store";

export interface TInner {
  addressBook: IPropsAddrBook[];
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
  let addressBook: { title: string; data: any[] }[] = [];
  const dispatch: AppThunkDispatch = useDispatch();
  const [listMasterKeyWithKeychains] = useMasterKeyWithKeychains();
  addressBook = [
    ...listMasterKeyWithKeychains.map((item) => ({
      data: [...item.listAccount],
      title: item.walletName,
    })),
  ];

  const onChangeField = async (value: string, field: string) => {
    let val: any = value;
    dispatch(change(FORM_CONFIGS.formName, field, val));
    dispatch(focus(FORM_CONFIGS.formName, field));
  };

  const onSelectedItem = async ({ address }: { address: string }) => {
    await onChangeField(address, FORM_CONFIGS.toAddress);
    history.back();
  };

  return (
    <ErrorBoundary>
      <WrappedComponent {...{ ...props, addressBook, onSelectedItem }} />
    </ErrorBoundary>
  );
};

export default enhance;
