import React from "react";
import QrCode from "../QrCode";

interface IProps {
  value: string;
  label?: string;
}

const QrCodeModal = (props: IProps) => {
  const { value, label } = props;
  return (
    <QrCode
      label={label}
      qrCodeProps={{
        value,
        size: 175,
      }}
    />
  );
};

export default QrCodeModal;
