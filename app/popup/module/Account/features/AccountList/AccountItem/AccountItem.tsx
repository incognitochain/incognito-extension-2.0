// import { RadioButton } from "@popup/components/RadioButton/RadioButton";
import RightArrowIcon from "@popup/components/Icons/RightArrowIcon";
import React from "react";
import { Container } from "./AccountItem.style";
import { CheckBoxButton } from "@popup/components/CheckBoxButton/CheckBoxButton";

interface AccountItemProps {
  accountName?: string;
  paymentAddress?: string;
  onClick?: any;
  isSelected?: boolean;
  checkBoxOnClick?: () => void;
}

const AccountItem: React.FC<AccountItemProps> = (props: AccountItemProps) => {
  const {
    accountName = "",
    paymentAddress = "",
    onClick = () => {},
    checkBoxOnClick = () => {},
    isSelected = false,
  } = props;
  return (
    <Container className="hover-with-cursor">
      <div className="left-view">
        <CheckBoxButton isChecked={isSelected} onClick={checkBoxOnClick} />
      </div>
      <button className="middle-view" onClick={onClick}>
        <p className="title fs-regular fw-medium">{accountName}</p>
        <p className="desc fs-small fw-medium">{paymentAddress}</p>
        <div className="right-view">
          <RightArrowIcon />
        </div>
      </button>
    </Container>
  );
};
export default AccountItem;
