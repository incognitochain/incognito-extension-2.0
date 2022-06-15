import { route } from "@popup/module/QRCode/QRCode.route";
import { CopyIcon, QrCodeIcon } from "@components/Icons";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  BottomView,
  Container,
  CopyIconContainer,
  Description,
  QrCodeIconContainer,
  Title,
  TopLeftView,
  TopRightView,
  TopView,
} from "./AccountDetailItem.styled";

interface AccountDetailItemProps {
  title?: string;
  description?: string;
  // qrCodeIconOnClick: () => void;
}

const AccountDetailItem: React.FC<AccountDetailItemProps> = (props: AccountDetailItemProps) => {
  const history = useHistory();
  const { title = "", description = "" } = props;

  const qrCodeIconOnClick = () => {
    history.push(route, {
      title: title,
      label: "",
      value: description,
    });
  };
  return (
    <Container className={"hover-with-cursor"}>
      <TopView>
        <TopLeftView>
          <Title className="fs-medium fw-suppermedium">{title}</Title>
        </TopLeftView>
        <TopRightView>
          <QrCodeIconContainer>
            <QrCodeIcon onClick={qrCodeIconOnClick} />
          </QrCodeIconContainer>
          <CopyIconContainer>
            <CopyIcon text={description} />
          </CopyIconContainer>
        </TopRightView>
      </TopView>
      <BottomView>
        <Description className="fs-regular fw-regular">{description}</Description>
      </BottomView>
    </Container>
  );
};
export default AccountDetailItem;
