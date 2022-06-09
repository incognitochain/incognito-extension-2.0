import { RadioButton } from "@/popup/components/RadioButton/RadioButton";
import RightArrowIcon from "@popup/components/Icons/RightArrowIcon";
import React from "react";
import { Container, Description, LeftView, MiddleView, RightView, Title } from "./AccountItem.styled";

interface AccountItemProps {
  title?: string;
  description?: string;
  onClick?: any;
  isSelected?: boolean;
}

const AccountItem: React.FC<AccountItemProps> = (props: AccountItemProps) => {
  const { title = "", description = "", onClick = () => {}, isSelected = false } = props;
  return (
    <Container onClick={onClick} className={"hover-with-cursor"}>
      <LeftView>
        <RadioButton isChecked={isSelected} />
      </LeftView>
      <MiddleView>
        <Title className="fs-regular fw-medium">{title}</Title>
        <Description className="fs-small fw-medium">{description}</Description>
      </MiddleView>
      <RightView>
        <RightArrowIcon />
      </RightView>
    </Container>
  );
};
export default AccountItem;
