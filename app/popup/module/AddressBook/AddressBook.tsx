import React from "react";
import { useSelector } from "react-redux";
import Header from "@components/Header";
import styled from "styled-components";
import withAddressBook, { IMergeProps } from "./AddressBook.enhance";
import { IAddressBook } from "@module/AddressBook/AddressBook.interface";
// import MasterKeyItem from '../HDWallet/features/MasterKeyItem';

const Styled = styled.div`
  .item {
    margin-bottom: 30px;
    cursor: pointer;
  }
  .item .hook {
    margin-top: 30px;
    padding-left: 15px;
  }
  .item .hook .name {
    margin-bottom: 15px;
  }
  .item .hook .address {
  }
  .item .sub {
    justify-content: space-between;
  }
`;
const AddressBook = React.memo((props: IMergeProps & any) => {
  const { addressBook, onGoBack, onSelectedItem, onRemoveItem, showRemoveItem } = props;
  console.log("SANG TEST: ", addressBook);
  const factories = addressBook.map((item: { title: string; data: any[] }) => ({
    masterKeyName: item.title,
    listAccount: item.data,
  }));
  return (
    <Styled>
      <Header onGoBack={onGoBack} title="Address book" canSearch />
      <div className="scroll-view">
        {factories.map((item: { listAccount: IAddressBook[]; masterKeyName: string }) => (
          // <MasterKeyItem
          //   key={item.masterKeyName}
          //   data={{ masterKeyName: item.masterKeyName, listAccount: item.listAccount }}
          //   onSelectedItem={onSelectedItem}
          //   onRemoveItem={onRemoveItem}
          //   showRemoveItem={showRemoveItem}
          // />
          <div />
        ))}
      </div>
    </Styled>
  );
});

export default withAddressBook(AddressBook);
