import React from "react";
import { ItemStyled } from "@module/Settings";

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
    <ItemStyled className="hover-with-cursor" onClick={onClick}>
      <div className="left-view">{leftView}</div>
      <div className="middle-view">
        <p className="title fs-regular fw-medium">{title}</p>
        <p className="desc fs-small fw-medium">{description}</p>
      </div>
      <div className="right-view">{rightView}</div>
    </ItemStyled>
  );
};
export default SettingItem;
