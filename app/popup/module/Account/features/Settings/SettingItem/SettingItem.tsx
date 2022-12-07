import { RightArrowIcon } from "@popup/components/Icons";
import React from "react";
import { Container } from "./SettingItem.styled";
import { SettingItemType } from "./SettingItem.type";

const SettingItem = React.memo((props: SettingItemType) => {
  const { icon, name = "", onClick } = props;
  return (
    <Container className="default-padding-horizontal" onClick={() => onClick(props)}>
      {icon}
      <div className="horizonSpace" />
      <div className="nameView">
        <p className="fs-medium fw-medium">{name}</p>
      </div>
      <RightArrowIcon />
    </Container>
  );
});

export default SettingItem;
