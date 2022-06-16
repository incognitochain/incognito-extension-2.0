import RightArrowIcon from "@popup/components/Icons/RightArrowIcon";
import React from "react";
import { IAddressBookItem } from "@module/Account/features/AddressBook/AddressBook.interface";
import { ellipsisCenter } from "@popup/utils";
import { AddressBookItemStyled } from "./AddressBook.styled";

const AddressBookItem: React.FC<IAddressBookItem> = (props: IAddressBookItem) => {
  const { name, address, onSelectedItem } = props;
  console.log(props);
  const addressEllipsis = ellipsisCenter({
    str: address || "",
    limit: 13,
  });
  return (
    <AddressBookItemStyled className="hover-with-cursor" hover-with-cursor>
      <div className="left-view" onClick={() => onSelectedItem({ address })}>
        <p className="title fs-regular fw-medium noselect">{name}</p>
        <p className="desc fs-small fw-medium noselect">{addressEllipsis}</p>
      </div>
      <div className="right-view">
        <RightArrowIcon />
      </div>
    </AddressBookItemStyled>
  );
};
export default AddressBookItem;
