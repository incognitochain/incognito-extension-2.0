import React from "react";
import { Container, Description, LeftView, MiddleView, RightView, Title } from "./SettingItem.styled";

interface SettingItemProps {
  title?: string;
  description?: string;
  leftView?: React.ReactNode;
  rightView?: React.ReactNode;
  onClick?: any;
}

const SettingItem: React.FC<SettingItemProps> = (props: SettingItemProps) => {
  const { title, description, leftView = null, rightView = null, onClick } = props;
  return (
    <Container className="hover-with-cursor" onClick={onClick}>
      <LeftView>{leftView}</LeftView>
      <MiddleView>
        <Title className="fs-regular fw-medium">{title}</Title>
        <Description className="fs-small fw-medium">{description}</Description>
      </MiddleView>
      <RightView>{rightView}</RightView>
    </Container>
  );
};
export default SettingItem;
