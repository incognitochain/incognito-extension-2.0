import React from "react";
import { Container, Description, LeftView, RightView, Title, CircleView } from "./NetworkItem.styled";

interface NetworkItemProps {
  title?: string;
  description?: string;
  onClick?: any;
  disabled?: boolean;
}

const NetworkItem: React.FC<NetworkItemProps> = (props: NetworkItemProps) => {
  const { title, description, onClick, disabled = false } = props;
  const className = `${disabled ? "none-select" : "selected"} hover-with-cursor `;
  return (
    <Container className={className} onClick={onClick}>
      <LeftView>
        <CircleView />
      </LeftView>
      <RightView>
        <Title className="fs-regular fw-medium">{title}</Title>
        <Description className="fs-small fw-medium">{description}</Description>
      </RightView>
    </Container>
  );
};
export default NetworkItem;
