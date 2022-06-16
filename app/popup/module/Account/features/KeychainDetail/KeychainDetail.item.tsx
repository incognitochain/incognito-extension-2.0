import { route } from "@module/QRCode/QRCode.route";
import { CopyIcon, QrCodeIcon } from "@components/Icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { KeyChainDetailItemStyled } from "./KeychainDetail.styled";
import { Row } from "@popup/theme";

interface IProps {
  title?: string;
  description?: string;
}

const KeychainDetailItem: React.FC<IProps> = (props: IProps) => {
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
    <KeyChainDetailItemStyled className="hover-with-cursor">
      <div className="top-view">
        <div className="top-left-view">
          <p className="title fs-medium fw-suppermedium">{title}</p>
        </div>
        <Row>
          <QrCodeIcon onClick={qrCodeIconOnClick} />
          <CopyIcon text={description} />
        </Row>
      </div>
      <div className="bottom-view">
        <p className="desc fs-regular fw-regular">{description}</p>
      </div>
    </KeyChainDetailItemStyled>
  );
};
export default KeychainDetailItem;
