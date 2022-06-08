import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  isIncognitoAddressExistSelector,
  isExternalAddressExistSelector,
} from "@module/AddressBook/AddressBook.selector";
import { useHistory } from "react-router-dom";
// import { ConfirmTxItem } from "@module/Send/features/ConfirmTx/ConfirmTx.interface";
import { route as routeAction } from "./Action.route";
import { Button } from "@components/Core";

const Styled = styled.div``;

interface IProps {
  // data: ConfirmTxItem;
  data: any;
}

const BtnAction = (props: IProps) => {
  const history = useHistory();
  const { data } = props;
  const { paymentAddress: address, isExternalAddress, isIncognitoAddress, addressBookType: type, tokenId } = data;
  const isIncognitoAddressExist = useSelector(isIncognitoAddressExistSelector);
  const isExternalAddressExist = useSelector(isExternalAddressExistSelector);
  const renderBtnAction = () => {
    if (
      !address ||
      (isIncognitoAddress && isIncognitoAddressExist(address)) ||
      (isExternalAddress && isExternalAddressExist(address))
    ) {
      return null;
    }
    return (
      <Styled>
        <Button
          title="Save this address book"
          onClick={() => {
            history.push(routeAction, {
              type,
              address,
              tokenId,
            });
          }}
        />
      </Styled>
    );
  };
  return renderBtnAction();
};

export default React.memo(BtnAction);
