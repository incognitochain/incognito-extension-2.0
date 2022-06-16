import { RadioButton } from "@/popup/components/RadioButton/RadioButton";
import RightArrowIcon from "@popup/components/Icons/RightArrowIcon";
import React from "react";
import { AccountItemStyled } from "@module/Account/features/SelectAccount/SelectAccount.styled";

interface AccountItemProps {
  title?: string;
  description?: string;
  onClick?: any;
  isSelected?: boolean;
  radioBtnOnClick?: () => void;
}

const AccountItem: React.FC<AccountItemProps> = (props: AccountItemProps) => {
  const { title = "", description = "", onClick = () => {}, radioBtnOnClick = () => {}, isSelected = false } = props;
  return (
    <AccountItemStyled className="" hover-with-cursor>
      <div className="left-view">
        <RadioButton isChecked={isSelected} onClick={radioBtnOnClick} />
      </div>
      <button className="middle-view" onClick={onClick}>
        <p className="title fs-regular fw-medium">{title}</p>
        <p className="desc fs-small fw-medium">{description}</p>
        <div className="right-view">
          <RightArrowIcon />
        </div>
      </button>
    </AccountItemStyled>
  );
};
export default AccountItem;
