import React from "react";
import styled from "styled-components";
import withAddressBook, { IMergeProps } from "./AddressBook.enhance";
import MasterKeyItem from "@module/Account/features/MasterKeyItem";

const Styled = styled.div``;

const AddressBook = React.memo((props: IMergeProps & any) => {
  const { addressBook, onSelectedItem } = props;
  const factories = addressBook.map((item: { title: string; data: any[] }) => ({
    masterKeyName: item.title,
    listAccount: item.data,
  }));
  return (
    <Styled className="default-padding-horizontal">
      {factories.map((account: any) => (
        <MasterKeyItem onSelectedItem={onSelectedItem} {...account} key={account.masterKeyName} />
      ))}
    </Styled>
  );
});

export default withAddressBook(AddressBook);
