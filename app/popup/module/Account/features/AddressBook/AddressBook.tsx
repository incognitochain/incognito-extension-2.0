import React from "react";
import withAddressBook, { IMergeProps } from "./AddressBook.enhance";
import Header from "@components/Header";
import WrapContent from "@components/Content/Content";
import { IAddressBookItem } from "@module/Account/features/AddressBook/AddressBook.interface";
import AddressBookItem from "@module/Account/features/AddressBook/AddressBook.item";

const AddressBook = React.memo((props: IMergeProps & any) => {
  const { addressBook, onSelectedItem } = props;
  const factories = addressBook.map((item: { title: string; data: any[] }) => ({
    masterKeyName: item.title,
    listAccount: item.data,
  }));
  console.log(factories);

  const renderKeyChain = (item: IAddressBookItem) => (
    <AddressBookItem address={item.address} name={item.name} onSelectedItem={onSelectedItem} key={item.address} />
  );
  return (
    <>
      <Header title="Address Book" />
      <WrapContent className="default-padding-horizontal default-padding-top">
        {factories.map((account: any) => (
          <div key={account.masterKeyName}>{account.listAccount.map(renderKeyChain)}</div>
        ))}
      </WrapContent>
    </>
  );
});

export default withAddressBook(AddressBook);
