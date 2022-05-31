import React from "react";
import styled from "styled-components";
import QRCodeReact from "qrcode.react";
import { useSelector } from "react-redux";
// import { COLORS, ITheme } from "src/styles";
import Copy from "@components/Copy";

interface IProps {
  hook?: any;
  qrCodeProps: any;
  label?: string;
  copyProps?: any;
}

const Styled = styled.div`
  .qrcode-react {
    justify-content: center;
    display: flex;
  }
  .copy-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    border-radius: 50px;
    padding: 0 15px;
    justify-content: space-between;
    margin-top: 30px;
  }
  .copy-block .btn-copy {
    height: 40px;
    border-radius: 40px;
    padding: 0 10px;
  }
  .copy-block p {
    max-width: 100%;
  }
  .label {
    text-align: center;
  }
`;

const QrCode = (props: IProps) => {
  const { hook, qrCodeProps, label, copyProps } = props;
  const { value } = qrCodeProps;
  return (
    <Styled className="qrcode-container">
      <div className="label fs-medium fw-bold ellipsis">{label}</div>
      <div className="qrcode-react">
        <QRCodeReact {...{ ...qrCodeProps, size: qrCodeProps?.size || 175 }} />
      </div>
      {hook}
      <Copy text={value} {...copyProps} />
    </Styled>
  );
};

export default QrCode;
