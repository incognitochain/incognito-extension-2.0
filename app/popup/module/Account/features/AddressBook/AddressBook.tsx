import React from "react";
import withAddressBook, { IMergeProps } from "./AddressBook.enhance";
import MasterKeyItem from "@module/Account/features/MasterKeyItem";
import Header from "@components/Header";
import WrapContent from "@components/Content/Content";

const AddressBook = React.memo((props: IMergeProps & any) => {
  const { addressBook, onSelectedItem } = props;
  const factories = addressBook.map((item: { title: string; data: any[] }) => ({
    masterKeyName: item.title,
    listAccount: item.data,
  }));
  return (
    <>
      <Header title="Address Book" />
      <WrapContent className="default-padding-horizontal default-padding0-top">
        {factories.map((account: any) => (
          <MasterKeyItem onSelectedItem={onSelectedItem} {...account} key={account.masterKeyName} />
        ))}
      </WrapContent>
    </>
  );
});

export default withAddressBook(AddressBook);
