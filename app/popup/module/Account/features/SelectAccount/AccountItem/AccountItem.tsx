import { RadioButton } from "@/popup/components/RadioButton/RadioButton";
import RightArrowIcon from "@popup/components/Icons/RightArrowIcon";
import React from "react";
import { Container, Description, LeftView, MiddleView, RightView, Title } from "./AccountItem.styled";

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
    <Container className={"hover-with-cursor"}>
      <LeftView>
        <RadioButton isChecked={isSelected} onClick={radioBtnOnClick} />
      </LeftView>
      <MiddleView onClick={onClick}>
        <Title className="fs-regular fw-medium">{title}</Title>
        <Description className="fs-small fw-medium">{description}</Description>
        <RightView>
          <RightArrowIcon />
        </RightView>
      </MiddleView>
    </Container>
  );
};
export default AccountItem;
