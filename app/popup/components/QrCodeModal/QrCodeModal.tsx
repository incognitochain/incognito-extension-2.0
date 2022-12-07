import React from "react";
import QrCode from "../QrCode";

interface IProps {
  value: string;
  label?: string;
  showCopyAddressBar?: boolean;
}

const QrCodeModal = (props: IProps) => {
  const { value, label, showCopyAddressBar = true } = props;
  return (
    <QrCode
      showCopyAddressBar={showCopyAddressBar}
      label={label}
      qrCodeProps={{
        value,
        size: 184,
      }}
    />
  );
};

export default QrCodeModal;
