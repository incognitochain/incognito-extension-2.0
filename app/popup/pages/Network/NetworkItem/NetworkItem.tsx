import React from "react";
import { Container, Description, LeftView, RightView, Title, CircleView } from "./NetworkItem.styled";
import { RadioButton } from "@components/RadioButton/RadioButton";

interface NetworkItemProps {
  title?: string;
  description?: string;
  onClick?: any;
  isSelected?: boolean;
}

const NetworkItem: React.FC<NetworkItemProps> = (props: NetworkItemProps) => {
  const { title, description, onClick, isSelected = false } = props;
  // const className = `${disabled ? "transparent" : "selected"} hover-with-cursor `;
  return (
    <Container className={"hover-with-cursor"} onClick={onClick}>
      <LeftView>
        {/* <CircleView disabled={disabled} /> */}
        <RadioButton isChecked={isSelected} />
      </LeftView>
      <RightView>
        <Title className="fs-regular fw-medium">{title}</Title>
        <Description className="fs-small fw-medium">{description}</Description>
      </RightView>
    </Container>
  );
};
export default NetworkItem;
